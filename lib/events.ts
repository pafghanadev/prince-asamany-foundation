/**
 * Events Data Service & Google Sheets Integration
 *
 * Fetches events directly from a published Google Sheet.
 * If the sheet is unavailable, show no unconfirmed schedules.
 */

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO format YYYY-MM-DD or readable string
  time?: string; // e.g. "9:00 AM – 3:00 PM GMT"
  location: string;
  category: string;
  description: string;
  imageUrl?: string;
  registrationUrl?: string;
  featured?: boolean;
  status: 'Published' | 'Draft' | 'Cancelled';
  isPast: boolean;
}

export interface EventsResponse {
  upcoming: EventItem[];
  past: EventItem[];
  all: EventItem[];
  source: 'google_sheets' | 'fallback'; // fallback means schedules could not be verified
}

function unavailableEvents(): EventsResponse {
  return { upcoming: [], past: [], all: [], source: 'fallback' };
}

/**
 * Normalizes an image link. If the user pasted a Google Drive share link,
 * converts it to a direct, high-res embeddable link.
 */
export function normalizeImageUrl(url?: string): string | undefined {
  if (!url || !url.trim()) return undefined;
  // If multiple files were uploaded, pick the first one
  const firstItem = url.split(',')[0].trim();
  if (firstItem.startsWith('/') && !firstItem.startsWith('//') && !firstItem.includes('\\')) return firstItem;
  try {
    const parsed = new URL(firstItem);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password) return undefined;

    if (parsed.hostname === 'drive.google.com') {
      const fileMatch = parsed.pathname.match(/^\/file\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]+)(?:\/|$)/);
      const queryId = ['/open', '/uc'].includes(parsed.pathname) ? parsed.searchParams.get('id') : null;
      const fileId = fileMatch?.[1] || (queryId && /^[a-zA-Z0-9_-]+$/.test(queryId) ? queryId : null);
      if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    if (['lh3.googleusercontent.com', 'drive.google.com', 'images.unsplash.com'].includes(parsed.hostname)) return parsed.toString();
  } catch {
    // Invalid or unsupported image URL: use the local category image instead.
  }
  return undefined;
}

/** Accept only explicit links or contact methods from the public event sheet. */
export function normalizeRegistrationUrl(value?: string): { href: string; kind: 'web' | 'internal' | 'email' | 'phone' } | null {
  const raw = value?.trim();
  if (!raw || /[\r\n\\]/.test(raw)) return null;

  if (raw.startsWith('/') && !raw.startsWith('//')) return { href: raw, kind: 'internal' };

  const email = raw.replace(/^mailto:/i, '');
  if (/^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(email) && !email.includes('?')) {
    return { href: `mailto:${email}`, kind: 'email' };
  }

  const phone = raw.replace(/^tel:/i, '');
  if (/^\+?[\d\s().-]{7,20}$/.test(phone)) {
    const digits = phone.replace(/[\s().-]/g, '');
    // Spreadsheet entries often use Ghana's domestic 0-prefix. Make links dialable abroad.
    const international = /^0\d{9}$/.test(digits) ? `+233${digits.slice(1)}` : digits;
    return { href: `tel:${international}`, kind: 'phone' };
  }

  try {
    const parsed = new URL(raw);
    if (['https:', 'http:'].includes(parsed.protocol) && parsed.hostname && !parsed.username && !parsed.password) {
      return { href: parsed.toString(), kind: 'web' };
    }
  } catch {
    // Invalid URL: use the foundation contact page instead.
  }
  return null;
}

/**
 * Robust CSV parser that handles quoted cells, commas within quotes,
 * and multi-line strings.
 */
function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // Skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Default branded images based on category so that non-technical staff
 * never have to worry about broken images or finding a flyer link.
 */
export function getCategoryFallbackImage(category: string): string {
  const lower = category.toLowerCase();
  if (lower.includes('health') || lower.includes('screen') || lower.includes('deworm')) {
    return '/media/opt/WhatsApp Image 2026-08-26 at 00.41.26.webp';
  }
  if (lower.includes('welfare') || lower.includes('relief') || lower.includes('joy') || lower.includes('street')) {
    return '/media/opt/IMG_4403_2.webp';
  }
  if (lower.includes('farm') || lower.includes('empower') || lower.includes('economic') || lower.includes('work')) {
    return '/media/opt/IMG-20260713-WA0030.webp';
  }
  return '/media/opt/IMG-20260727-WA0008.webp';
}

/**
 * Super forgiving human date parser.
 * Handles:
 * - "2026-10-24" (ISO)
 * - "24/10/2026" or "24-10-2026" (DD/MM/YYYY - Ghana standard)
 * - "10/24/2026" (MM/DD/YYYY)
 * - "24th October 2026" or "October 24, 2026"
 * - "Oct 24 2026"
 */
export function parseHumanDate(dateStr?: string): Date | null {
  if (!dateStr || !dateStr.trim()) return null;
  const clean = dateStr.trim();

  const makeDate = (year: number, month: number, day: number): Date | null => {
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? date : null;
  };

  const isoParts = clean.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoParts) return makeDate(Number(isoParts[1]), Number(isoParts[2]), Number(isoParts[3]));

  // Explicit numeric parsing comes before Date.parse: 05/11 is 5 November in Ghana.
  const slashParts = clean.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
  if (slashParts) {
    const first = Number(slashParts[1]);
    const second = Number(slashParts[2]);
    const year = Number(slashParts[3]);
    return second > 12 ? makeDate(year, first, second) : makeDate(year, second, first);
  }

  // Human-readable dates such as "24th October 2026" or "October 24, 2026".
  const sanitized = clean.replace(/(\d+)(st|nd|rd|th)\b/gi, '$1');
  if (!/[a-z]/i.test(sanitized)) return null;
  const parsed = new Date(sanitized);
  return Number.isNaN(parsed.getTime()) ? null : makeDate(parsed.getFullYear(), parsed.getMonth() + 1, parsed.getDate());
}

/**
 * Checks whether a given date string is in the past compared to today (end of day).
 */
export function isDatePast(dateStr: string): boolean {
  const parsed = parseHumanDate(dateStr);
  if (!parsed) return false;

  const today = new Date().toISOString().slice(0, 10); // Ghana uses GMT year-round
  return parsed.toISOString().slice(0, 10) < today;
}

/** Present Google Sheets 24-hour times in a readable format, without altering existing AM/PM ranges. */
export function formatEventTime(value?: string): string | undefined {
  const time = value?.trim();
  if (!time) return undefined;
  return time.replace(/(^|[\s–—-])([01]?\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?(?=$|[\s–—-])(?!\s*(?:AM|PM)\b)/gi, (_match, prefix: string, hourText: string, minute: string) => {
    const hour = Number(hourText);
    return `${prefix}${hour % 12 || 12}:${minute} ${hour < 12 ? 'AM' : 'PM'}`;
  });
}

/** Display compact sheet category tags as readable labels. */
export function formatEventCategory(value: string): string {
  return value.trim().replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
}

/**
 * Builds a Google Calendar link for a given event.
 */
export function getGoogleCalendarUrl(event: EventItem): string {
  const title = encodeURIComponent(event.title);
  const formattedTime = formatEventTime(event.time);
  const times = Array.from(formattedTime?.matchAll(/\b(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\b/gi) ?? []);
  const inferredEndTime = times.length === 1;
  const details = encodeURIComponent(`${event.description}\n\nOrganized by Prince Asamany Foundation${inferredEndTime ? '\nEnd time unconfirmed; calendar entry uses a one-hour placeholder.' : ''}`);
  const location = encodeURIComponent(event.location);

  const parsed = parseHumanDate(event.date);
  let dates = '';
  if (parsed) {
    const day = parsed.toISOString().slice(0, 10).replace(/-/g, '');
    if (times.length >= 1) {
      const toMinutes = (match: RegExpMatchArray): number => {
        const hour = Number(match[1]) % 12 + (match[3].toUpperCase() === 'PM' ? 12 : 0);
        return hour * 60 + Number(match[2] ?? 0);
      };
      const start = toMinutes(times[0]);
      const end = times.length >= 2 ? toMinutes(times[1]) : start + 60;
      if (start < 1440 && end < (inferredEndTime ? 1500 : 1440)) {
        const formatTime = (minutes: number): string => `${String(Math.floor(minutes / 60)).padStart(2, '0')}${String(minutes % 60).padStart(2, '0')}00`;
        const endDay = new Date(parsed.getTime() + (end <= start || end >= 1440 ? 86400000 : 0)).toISOString().slice(0, 10).replace(/-/g, '');
        dates = `${day}T${formatTime(start)}/${endDay}T${formatTime(end % 1440)}`;
      }
    }
    if (!dates) {
      const nextDay = new Date(parsed.getTime() + 86400000).toISOString().slice(0, 10).replace(/-/g, '');
      dates = `${day}/${nextDay}`; // Google Calendar all-day end date is exclusive.
    }
  }

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}${dates ? `&dates=${dates}&ctz=Africa%2FAccra` : ''}`;
}

/**
 * Fetches confirmed schedules from Google Sheets. Never presents draft sample entries as live events.
 */
export async function getEvents(): Promise<EventsResponse> {
  const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID || process.env.GOOGLE_SHEETS_EVENTS_ID;

  if (!sheetId) {
    return unavailableEvents();
  }

  try {
    // Google Sheets public CSV export URL
    const csvUrl = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:csv`;

    const res = await fetch(csvUrl, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      console.warn(`[Events] Failed to fetch Google Sheet (${res.status}).`);
      return unavailableEvents();
    }

    const csvText = await res.text();
    const rows = parseCSV(csvText);

    if (rows.length === 0) return unavailableEvents();

    // Parse header to map columns dynamically - works with both manual sheets and Google Forms
    const header = rows[0].map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const colIndex = {
      title: header.findIndex((h) => !h.includes('timestamp') && (h.includes('title') || h.includes('name') || h.includes('event'))),
      date: header.findIndex((h) => !h.includes('timestamp') && (h.includes('date') || h.includes('when') || h.includes('day'))),
      time: header.findIndex((h) => !h.includes('timestamp') && (h.includes('time') || h.includes('hour') || h.includes('duration'))),
      location: header.findIndex((h) => h.includes('location') || h.includes('venue') || h.includes('where') || h.includes('place')),
      category: header.findIndex((h) => h.includes('category') || h.includes('type') || h.includes('tag') || h.includes('initiative')),
      description: header.findIndex((h) => h.includes('desc') || h.includes('detail') || h.includes('about') || h.includes('summary')),
      image: header.findIndex((h) => h.includes('image') || h.includes('flyer') || h.includes('photo') || h.includes('poster') || h.includes('picture') || h.includes('banner') || h.includes('upload')),
      registration: header.findIndex((h) => h.includes('reg') || h.includes('rsvp') || h.includes('link') || h.includes('url') || h.includes('form') || h.includes('contact')),
      featured: header.findIndex((h) => h.includes('feat')),
      status: header.findIndex((h) => h.includes('status')),
    };

    if (colIndex.title < 0 || colIndex.date < 0) {
      console.warn('[Events] Sheet must have title and date columns.');
      return unavailableEvents();
    }

    const parsedEvents: EventItem[] = [];

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const title = (colIndex.title !== -1 ? row[colIndex.title] : row[0]) || '';
      if (!title.trim()) continue; // Skip blank rows

      const rawDate = (colIndex.date !== -1 ? row[colIndex.date] : row[1]) || '';
      if (!parseHumanDate(rawDate)) continue;
      const time = colIndex.time !== -1 ? row[colIndex.time] : undefined;
      const location = (colIndex.location !== -1 ? row[colIndex.location] : row[3]) || 'Ejisu Municipal District, Ghana';
      const category = (colIndex.category !== -1 ? row[colIndex.category] : row[4]) || 'Community';
      const description = (colIndex.description !== -1 ? row[colIndex.description] : row[5]) || '';
      const rawImage = colIndex.image !== -1 ? row[colIndex.image] : undefined;
      const registrationUrl = colIndex.registration !== -1 ? row[colIndex.registration] : undefined;
      const featuredVal = colIndex.featured !== -1 ? row[colIndex.featured]?.toLowerCase() : '';
      const featured = featuredVal === 'true' || featuredVal === 'yes' || featuredVal === '1';
      const rawStatus = (colIndex.status !== -1 ? row[colIndex.status]?.trim() : 'Published') || 'Published';

      let status: EventItem['status'] = 'Published';
      if (rawStatus.toLowerCase().includes('draft')) status = 'Draft';
      if (rawStatus.toLowerCase().includes('cancel')) status = 'Cancelled';

      // Determine if past
      const isPast = isDatePast(rawDate);

      // If user uploaded or linked an image, normalize it; otherwise give them a stunning branded category visual
      const normalizedImage = normalizeImageUrl(rawImage);
      const finalImage = normalizedImage || getCategoryFallbackImage(category);

      parsedEvents.push({
        id: `event-${r}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`,
        title: title.trim(),
        date: rawDate.trim(),
        time: formatEventTime(time),
        location: location.trim(),
        category: formatEventCategory(category),
        description: description.trim(),
        imageUrl: finalImage,
        registrationUrl: registrationUrl?.trim() || undefined,
        featured,
        status,
        isPast,
      });
    }

    const visibleEvents = parsedEvents.filter((e) => e.status !== 'Draft');

    const upcoming = visibleEvents
      .filter((e) => !e.isPast && e.status === 'Published')
      .sort((a, b) => {
        const tA = parseHumanDate(a.date)?.getTime() ?? 0;
        const tB = parseHumanDate(b.date)?.getTime() ?? 0;
        if (isNaN(tA) || isNaN(tB)) return 0;
        return tA - tB;
      });

    const past = visibleEvents
      .filter((e) => e.isPast && e.status === 'Published')
      .sort((a, b) => {
        const tA = parseHumanDate(a.date)?.getTime() ?? 0;
        const tB = parseHumanDate(b.date)?.getTime() ?? 0;
        if (isNaN(tA) || isNaN(tB)) return 0;
        return tB - tA; // Most recent past first
      });

    return {
      upcoming,
      past,
      all: visibleEvents,
      source: 'google_sheets',
    };
  } catch (err) {
    console.error('[Events] Error loading Google Sheet events:', err);
    return unavailableEvents();
  }
}
