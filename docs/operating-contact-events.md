# Contact and events production configuration

## Contact and volunteer forms

The forms send messages through Resend. Set `RESEND_API_KEY` and a verified `CONTACT_FROM_EMAIL` in the deployment environment; verify that the foundation destination address in `lib/site.ts` is correct.

For production rate limiting across multiple server instances, create an Upstash Redis database and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Both values must be server-only secrets. The rate limiter atomically restricts each email to 5 submissions per 15 minutes. Without Redis, the site uses a **per-instance memory fallback** that is less effective on serverless/multi-instance hosting.

Set `CONTACT_TRUSTED_IP_HEADER` to the header overwritten by your hosting platform's trusted ingress (see `.env.example`). This adds a limit of 10 submissions per IP per 15 minutes. Do not set this to `x-forwarded-for` or use an arbitrary client-supplied header. Make sure the chosen header is actually overwritten by your deployment infrastructure; otherwise leave it unset.

If the shared rate limiter is configured but unreachable, the form returns 503 and does not attempt to deliver mail. A 429 means the submission limit was reached; a `Retry-After` response header tells clients when to retry. Test a real delivery and repeated submissions in your deployed environment.

## Foundation events

Set `NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID` to the ID of a publicly viewable event sheet. Include `Title` and `Date` columns; a `Status` column can mark `Published`, `Draft`, or `Cancelled`. Use `YYYY-MM-DD` or Ghanaian `DD/MM/YYYY` dates for accuracy. The site checks the published sheet about once per minute.

If the sheet ID is missing, the sheet is unavailable, or required columns are absent, the site displays **no invented upcoming events** and asks visitors to contact the foundation. Populate and verify the sheet before advertising an event. Only published, future-dated events appear in the upcoming list; cancelled events remain available in the full list with a cancellation badge.

Event flyers should be public images stored locally or on the explicitly approved image hosts: Google Drive/Googleusercontent or Unsplash. Other image URLs use the local category illustration. Contact the development team to add a newly approved image host to both the image allowlist and `next.config.ts`.

## Foundation claims and donation receipts

Confirm any programme metrics (beneficiaries, monetary value, distribution costs) from foundation records before publishing figures. Manual transfers can be acknowledged by the foundation team on request using the donor's transfer reference. Automatic receipts, verified Paystack payments, and independent provider testing are outside these changes.
