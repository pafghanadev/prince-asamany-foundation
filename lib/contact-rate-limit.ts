import { createHash } from 'node:crypto';

const WINDOW_SECONDS = 15 * 60;
const EMAIL_LIMIT = 5;
const IP_LIMIT = 10;

// Used only until a shared Redis store is configured. Each server instance has its own map.
const localCounts = new Map<string, { count: number; expiresAt: number }>();

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function trustedClientIp(request: Request): string | null {
  // Only use a header that the hosting provider overwrites at its trusted edge.
  // Never trust the first x-forwarded-for value supplied by an arbitrary client.
  const header = process.env.CONTACT_TRUSTED_IP_HEADER?.toLowerCase();
  if (!header || !['x-nf-client-connection-ip', 'x-vercel-forwarded-for', 'cf-connecting-ip'].includes(header)) {
    return null;
  }

  const value = request.headers.get(header)?.split(',')[0].trim();
  return value && /^[\da-f.:]+$/i.test(value) ? value : null;
}

function localCount(key: string): number {
  const now = Date.now();
  if (localCounts.size > 5000) {
    for (const [entryKey, entry] of localCounts) {
      if (entry.expiresAt <= now) localCounts.delete(entryKey);
    }
    if (localCounts.size > 5000) localCounts.clear();
  }
  const previous = localCounts.get(key);
  const count = previous && previous.expiresAt > now ? previous.count + 1 : 1;
  localCounts.set(key, { count, expiresAt: previous && previous.expiresAt > now ? previous.expiresAt : now + WINDOW_SECONDS * 1000 });
  return count;
}

async function sharedCount(key: string): Promise<number> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return localCount(key);

  // EVAL makes the counter increment and its expiry atomic across all server instances.
  const script = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return n";
  const response = await fetch(url.replace(/\/$/, ''), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['EVAL', script, '1', key, String(WINDOW_SECONDS)]),
    cache: 'no-store',
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Rate limit store returned ${response.status}`);
  const result: { result?: number; error?: string } = await response.json();
  if (result.error || typeof result.result !== 'number') throw new Error('Rate limit store rejected the request');
  return result.result;
}

export async function checkContactRateLimit(request: Request, email: string): Promise<boolean> {
  const checks: Array<{ key: string; limit: number }> = [
    { key: `contact:email:${hash(email.toLowerCase())}`, limit: EMAIL_LIMIT },
  ];
  const ip = trustedClientIp(request);
  if (ip) checks.push({ key: `contact:ip:${hash(ip)}`, limit: IP_LIMIT });
  const counts = await Promise.all(checks.map(({ key }) => sharedCount(key)));
  return counts.some((count, i) => count > checks[i].limit);
}
