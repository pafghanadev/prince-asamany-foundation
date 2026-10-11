# Public Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic public site styling with the documentary editorial direction across all public routes, keeping every route, data source, and payment flow intact.

**Architecture:** Add a small set of shared editorial primitives (section band, headline, photo caption, CTA row) and new surface tokens in `app/globals.css`. Restyle shared chrome (Navbar, Footer) first, then the homepage, then the inner pages, reusing the primitives. No data-layer or API changes.

**Tech Stack:** Next.js 16.3.0 (App Router), React, Tailwind CSS v4 (`@theme` tokens), `next/image`, framer-motion (already installed), Playfair Display and Plus Jakarta Sans via `next/font`.

**Spec:** `docs/superpowers/specs/2026-10-11-public-site-redesign-design.md`

## Global Constraints

- Preserve all existing route URLs: `/`, `/about`, `/programs`, `/get-involved`, `/stories`, `/stories/[slug]`, `/events`, `/donate`, `/contact`.
- Preserve `getEvents()` and `revalidate = 60` on `/`.
- Do not modify `app/api/contact/route.ts`, `app/api/paystack/verify/route.ts`, or `lib/` data code.
- Keep existing brand token names (`brand-red`, `brand-navy`, `brand-gold`, `brand-cream`, etc.) so current references still resolve.
- No new photography, stock images, or impact statistics. Use only files already in `public/` and copy already in the codebase.
- Gold CTA fill uses navy text (6.4:1). Never white text on gold. Never gold text on light surfaces.
- Next.js 16 APIs: read the relevant guide in `node_modules/next/dist/docs/01-app/` before using any App Router API not already used in the repo.
- Animations respect `prefers-reduced-motion`.

## Review Focus

1. Empty or missing event list: `/` and `/events` render a non-broken empty state. Test in Task 6 and Task 9.
2. Image files missing or renamed: every `next/image` src referenced exists in `public/`. Test in Task 7 (asset check script).
3. Long headline or name wrapping on 320px wide viewports: no horizontal scroll. Verify in Task 10.
4. Mobile menu open with keyboard: Escape closes it and returns focus. Existing behavior preserved, tested in Task 3.
5. Donate flow with an empty amount or failed Paystack verify: existing error handling still reached. Test in Task 11.

---

## File Structure

- Modify `app/globals.css`: add paper and ink surface tokens, editorial radius, and reduced-motion rules.
- Create `components/ui/editorial/SectionBand.tsx`: full-width band wrapper with `tone` (`paper` | `ink`) and width variants.
- Create `components/ui/editorial/EditorialHeadline.tsx`: display headline with optional eyebrow and sub-line.
- Create `components/ui/editorial/PhotoCaption.tsx`: `next/image` wrapper with caption and credit line.
- Create `components/ui/editorial/CtaRow.tsx`: primary and secondary action pair.
- Create `components/ui/editorial/index.ts`: barrel export.
- Create `components/ui/editorial/__tests__/` tests are not added; verification is build plus visual checks (see Task 12).
- Modify `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `components/layout/StickyDonate.tsx`: restyle only; keep logic.
- Modify each section in `components/sections/` used by `app/page.tsx`.
- Modify each page in `app/*/page.tsx` and matching section files.

---

### Task 1: Surface tokens and reduced-motion base

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing `@theme` block.
- Produces: Tailwind utilities `bg-paper`, `bg-ink`, `text-ink`, `text-paper`, `border-rule`, and `rounded-editorial` (value `0.25rem`).

- [ ] **Step 1: Add tokens to the `@theme` block**

Add inside `@theme { ... }` in `app/globals.css`:

```css
--color-paper: #FAF6EE;
--color-paper-deep: #F2EBDD;
--color-ink: #113647;
--color-ink-deep: #0B2530;
--color-rule: #D9CFBE;
--radius-editorial: 0.25rem;
```

- [ ] **Step 2: Add reduced-motion rule**

Append to `app/globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Verify build compiles**

Run: `npm run build`
Expected: build completes with no CSS errors.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "style: add editorial surface tokens and reduced-motion base"
```

### Task 2: Editorial primitives

**Files:**
- Create: `components/ui/editorial/SectionBand.tsx`
- Create: `components/ui/editorial/EditorialHeadline.tsx`
- Create: `components/ui/editorial/PhotoCaption.tsx`
- Create: `components/ui/editorial/CtaRow.tsx`
- Create: `components/ui/editorial/index.ts`

**Interfaces:**
- Produces:
  - `SectionBand({ tone: 'paper' | 'ink', width?: 'full' | 'content' | 'narrow', id?: string, children })`
  - `EditorialHeadline({ eyebrow?: string, title: string, level?: 1 | 2 | 3, lead?: string, align?: 'left' | 'right' })`
  - `PhotoCaption({ src: string, alt: string, caption: string, credit?: string, priority?: boolean, position?: string, aspect?: string })`
  - `CtaRow({ primary: { href: string, label: string }, secondary?: { href: string, label: string } })`

- [ ] **Step 1: Implement `SectionBand`**

Renders a `<section>` with `tone` mapped to `bg-paper text-ink` or `bg-ink text-paper`. `width` maps to `max-w-[1440px]` (`full`), `max-w-6xl` (`content`), or `max-w-3xl` (`narrow`), centered with horizontal padding `px-6 md:px-12`. Vertical padding `py-20 md:py-28`.

- [ ] **Step 2: Implement `EditorialHeadline`**

Renders an optional eyebrow in `text-xs font-semibold uppercase tracking-[0.18em]` with `text-brand-red-dark` on paper and `text-brand-gold` on ink. The title uses `font-display` with `level` mapping to `text-5xl md:text-7xl` (1), `text-3xl md:text-5xl` (2), `text-2xl md:text-3xl` (3), `leading-[1.02]`, `tracking-normal`. The lead paragraph uses `font-body text-lg max-w-xl` with 75% opacity of the current text color.

- [ ] **Step 3: Implement `PhotoCaption`**

Wraps `next/image` with `fill`, `sizes` set to `(min-width: 1024px) 50vw, 100vw`, `className` containing `object-cover` and `position` prop, inside a container with `aspect` (default `aspect-[4/5]`) and `rounded-editorial overflow-hidden`. Caption renders below in `text-sm` with optional `credit` in `text-xs opacity-70`. Pass `priority` through.

- [ ] **Step 4: Implement `CtaRow`**

Primary: `inline-flex items-center justify-center min-h-12 px-6 rounded-editorial bg-brand-gold text-brand-navy font-semibold`. Secondary: text link with underline, `underline underline-offset-4`. Use `next/link`.

- [ ] **Step 5: Add barrel file**

`index.ts` re-exports all four components.

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: build completes. Primitives are not yet used, so no route output changes.

- [ ] **Step 7: Commit**

```bash
git add components/ui/editorial
git commit -m "feat: add editorial layout primitives"
```

### Task 3: Shared chrome (Navbar, Footer, StickyDonate)

**Files:**
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/layout/Footer.tsx`
- Modify: `components/layout/StickyDonate.tsx`

**Interfaces:**
- Consumes: `CtaRow`, tokens from Task 1.
- Produces: no new exports. Props and logic unchanged.

- [ ] **Step 1: Restyle Navbar**

Keep all state, effects, and the Escape and body-scroll handling exactly as-is. Change only class names: paper background when scrolled, ink text, hairline `border-rule` bottom border, nav links in `text-sm` with underline on active, donate button uses gold fill with navy text and `rounded-editorial`. Remove any `rounded-full` pills on nav controls.

- [ ] **Step 2: Restyle Footer**

Ink background (`bg-ink text-paper`), three-column editorial layout on `md+` with the logo, navigation, and contact columns. Keep all existing links and contact details from `lib/site`.

- [ ] **Step 3: Restyle StickyDonate**

Keep visibility logic. Change only classes to match the donate button in Navbar.

- [ ] **Step 4: Verify manually**

Run: `npm run dev`, open `/` and `/about`. Check the mobile menu opens, Escape closes it, and body scroll locks.
Expected: menu behavior unchanged, nav and footer show new styling.

- [ ] **Step 5: Commit**

```bash
git add components/layout
git commit -m "style: restyle navbar, footer, and sticky donate"
```

### Task 4: Homepage hero

**Files:**
- Modify: `components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `EditorialHeadline`, `CtaRow`, `SectionBand`, `PhotoCaption`.
- Produces: `HeroSection` export unchanged.

- [ ] **Step 1: Keep the slide data array and rotation effect**

Keep `HERO_SLIDES`, the auto-rotate interval, and pause-on-hover/focus. Those are the real community photos and captions already in place.

- [ ] **Step 2: Replace the layout**

Full-bleed image area with the current slide on the right at `lg:w-[62%]`, full height up to `85vh`. Headline and lead on the left in an ink band, with `EditorialHeadline level={1}` and `CtaRow` for the donate and programs links. Slide caption overlaid on the bottom-left of the image in a `bg-ink/85 text-paper text-sm px-3 py-2` label. Keep the existing slide indicator buttons, now styled as small squares, with accessible labels.

- [ ] **Step 3: Verify**

Run: `npm run dev`, open `/`. Confirm the slideshow rotates, pauses on hover, and the indicators switch slides.
Expected: behavior matches prior hero; layout is asymmetric.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "style: rebuild homepage hero as documentary editorial band"
```

### Task 5: Homepage programs and founder

**Files:**
- Modify: `components/sections/ProgramIconRow.tsx`
- Modify: `components/sections/AsymmetricCards.tsx`
- Modify: `components/sections/FounderHighlight.tsx`

**Interfaces:**
- Consumes: `SectionBand`, `EditorialHeadline`, `PhotoCaption`, `CtaRow`.
- Produces: existing exports unchanged.

- [ ] **Step 1: Programs as a numbered list**

Replace the icon row in `ProgramIconRow.tsx` with a numbered list (`01`, `02`, ...) of program names and one-line descriptions drawn from the existing copy in that file. Each item has a hairline `border-rule` top border. Remove the icon components only if no other file imports them.

- [ ] **Step 2: Offset photo band**

In `AsymmetricCards.tsx`, render two `PhotoCaption` items offset vertically (`md:mt-24` on the second), using `/media/opt/` images already referenced there. Keep existing captions.

- [ ] **Step 3: Founder as a wide split**

In `FounderHighlight.tsx`, a `SectionBand tone="ink"` with the portrait `PhotoCaption` at `md:w-5/12` and the founder text at `md:w-7/12`. Keep the existing quote and copy.

- [ ] **Step 4: Verify**

Run: `npm run dev`, open `/`. Confirm sections render and images load.
Expected: no console image errors.

- [ ] **Step 5: Commit**

```bash
git add components/sections/ProgramIconRow.tsx components/sections/AsymmetricCards.tsx components/sections/FounderHighlight.tsx
git commit -m "style: editorial programs list, photo offset band, founder split"
```

### Task 6: Homepage stories, events, map, trust, CTA

**Files:**
- Modify: `components/sections/StoryGrid.tsx`
- Modify: `components/sections/EventsSection.tsx`
- Modify: `components/sections/MapImpact.tsx`
- Modify: `components/sections/TrustStrip.tsx`
- Modify: `components/sections/CTABanner.tsx`

**Interfaces:**
- Consumes: `SectionBand`, `EditorialHeadline`, `PhotoCaption`, `CtaRow`, `EventCard` from `components/ui/EventCard.tsx` (restyled, props unchanged).
- Produces: existing exports unchanged. `EventsSection` still accepts `events` prop.

- [ ] **Step 1: Stories as a staggered grid**

`StoryGrid.tsx` uses a two-column layout with the first story spanning larger and later stories offset. Keep the existing story data source. Cards are flat with `border-rule`.

- [ ] **Step 2: Events empty state**

In `EventsSection.tsx`, when `events.length === 0`, render a paper-toned band with the text "No upcoming events are scheduled yet. Follow our updates or get in touch." and a `CtaRow` to contact. Keep the list rendering for non-empty arrays.

- [ ] **Step 3: Map, trust, and closing CTA**

Restyle `MapImpact.tsx`, `TrustStrip.tsx`, and `CTABanner.tsx` with `SectionBand` (ink for CTA, paper for trust strip). Do not add numbers; keep existing copy and the existing `GhanaMapSilhouette` illustration.

- [ ] **Step 4: Verify empty and populated events**

Run: `npm run dev`, open `/`. Confirm the events list renders with data. Temporarily pass an empty array in `app/page.tsx` to see the empty state, then revert.
Expected: both states render without errors; the temporary change is reverted before commit.

- [ ] **Step 5: Commit**

```bash
git add components/sections/StoryGrid.tsx components/sections/EventsSection.tsx components/sections/MapImpact.tsx components/sections/TrustStrip.tsx components/sections/CTABanner.tsx components/ui/EventCard.tsx
git commit -m "style: editorial stories, events, map, trust, and CTA sections"
```

### Task 7: Asset reference check

**Files:**
- Create: `scripts/check-public-assets.mjs`

**Interfaces:**
- Produces: a Node script that scans `app/` and `components/` for `/media/...` and `/...webp|png|jpeg|jpg` string references and exits non-zero if any file under `public/` is missing.

- [ ] **Step 1: Write the script**

Use `fs` and a regex over source files. Print each missing path.

- [ ] **Step 2: Run it**

Run: `node scripts/check-public-assets.mjs`
Expected: exit code 0, no missing paths. Fix any referenced path that is missing before continuing.

- [ ] **Step 3: Commit**

```bash
git add scripts/check-public-assets.mjs
git commit -m "chore: add public asset reference check"
```

### Task 8: About page

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `components/sections/LeadershipRecognition.tsx` and `components/sections/AwardGallery.tsx` as used by About

**Interfaces:**
- Consumes: `EditorialHeadline`, `PhotoCaption`, `SectionBand`, `CtaRow`.

- [ ] **Step 1: Restructure About as an editorial reading page**

Header band with `EditorialHeadline level={1}`, then alternating text and `PhotoCaption` bands. Keep all existing copy and metadata in `app/about/page.tsx`. Keep the `PageHeader` props if needed for the heading text.

- [ ] **Step 2: Verify**

Run: `npm run dev`, open `/about`. Confirm layout and images.
Expected: page renders; no missing images.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx components/sections/LeadershipRecognition.tsx components/sections/AwardGallery.tsx
git commit -m "style: rebuild about page in editorial layout"
```

### Task 9: Programs, Get Involved, Events pages

**Files:**
- Modify: `app/programs/page.tsx`
- Modify: `app/get-involved/page.tsx`
- Modify: `app/events/page.tsx`
- Modify: `app/events/EventsClient.tsx`
- Modify: `components/sections/GetInvolvedContent.tsx`
- Modify: `components/ui/PageHeader.tsx`

**Interfaces:**
- Consumes: `EditorialHeadline`, `SectionBand`, `EventCard`, `CtaRow`.
- Produces: `PageHeader` keeps its props and is restyled to the editorial headline.

- [ ] **Step 1: Restyle PageHeader**

Render an `EditorialHeadline` with the same title and subtitle props. Existing callers keep working.

- [ ] **Step 2: Programs page**

Use alternating image and text bands for each program with `PhotoCaption`. Keep existing copy and images.

- [ ] **Step 3: Get Involved page**

Restyle `GetInvolvedContent.tsx` as numbered ways to help, each with a `CtaRow`. Keep existing links.

- [ ] **Step 4: Events page empty state**

In `EventsClient.tsx`, handle the empty list with the same message used in Task 6.

- [ ] **Step 5: Verify**

Run: `npm run dev`, open `/programs`, `/get-involved`, `/events`, and check each renders with and without events.
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add app/programs/page.tsx app/get-involved/page.tsx app/events components/sections/GetInvolvedContent.tsx components/ui/PageHeader.tsx
git commit -m "style: editorial programs, get involved, and events pages"
```

### Task 10: Stories listing and story detail

**Files:**
- Modify: `app/stories/page.tsx`
- Modify: `app/stories/[slug]/page.tsx`
- Modify: `components/ui/StoryGallery.tsx`
- Modify: `components/sections/PressSection.tsx` if used on story detail

**Interfaces:**
- Consumes: `EditorialHeadline`, `PhotoCaption`, `SectionBand`.
- Produces: route params unchanged (`slug`).

- [ ] **Step 1: Stories listing**

Staggered editorial grid using `StoryGallery` restyled. Keep the data source and links.

- [ ] **Step 2: Story detail**

Article layout: `EditorialHeadline level={1}` with eyebrow, then a `PhotoCaption` hero, then a narrow reading column (`SectionBand width="narrow"`). Keep `generateStaticParams` and metadata if present.

- [ ] **Step 3: Verify long names**

Run: `npm run dev`, open `/stories` and one `/stories/<slug>` route. Test at 320px viewport width for overflow.
Expected: no horizontal scroll; headlines wrap.

- [ ] **Step 4: Commit**

```bash
git add app/stories components/ui/StoryGallery.tsx components/sections/PressSection.tsx
git commit -m "style: editorial stories listing and story detail"
```

### Task 11: Donate and Contact pages

**Files:**
- Modify: `app/donate/page.tsx`
- Modify: `components/sections/DonatePageContent.tsx`
- Modify: `components/ui/PaystackDonateButton.tsx` (styles only)
- Modify: `app/contact/page.tsx`
- Modify: `components/sections/ContactForm.tsx`

**Interfaces:**
- Consumes: `EditorialHeadline`, `SectionBand`, `CtaRow`.
- Produces: `PaystackDonateButton` props unchanged. Form field names and submit handler unchanged.

- [ ] **Step 1: Restyle donate page**

Editorial header and two-column layout: amount selection and copy on the left, `PhotoCaption` on the right using the existing donate image. Keep the Paystack button, its props, and its error states.

- [ ] **Step 2: Restyle contact form**

Keep field names, validation, and the submit handler. Restyle inputs with `border-rule` bottom borders, `rounded-editorial`, and visible focus rings. Keep the error and success messages in the same DOM positions.

- [ ] **Step 3: Verify donate error handling**

Run: `npm run dev`, open `/donate`. Submit with an empty amount; confirm the existing error appears. Open `/contact`, submit empty; confirm validation still shows.
Expected: existing validation and error messages unchanged.

- [ ] **Step 4: Commit**

```bash
git add app/donate app/contact components/sections/DonatePageContent.tsx components/ui/PaystackDonateButton.tsx components/sections/ContactForm.tsx
git commit -m "style: editorial donate and contact pages"
```

### Task 12: Full verification pass

**Files:**
- None modified unless a defect is found.

- [ ] **Step 1: Asset check**

Run: `node scripts/check-public-assets.mjs`
Expected: exit 0.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build completes with all routes listed.

- [ ] **Step 3: Visual pass at two widths**

Run: `npm run start`. Capture screenshots of `/`, `/about`, `/programs`, `/get-involved`, `/stories`, `/events`, `/donate`, `/contact` at 1440px and 390px widths. Review each for overlap, horizontal scroll, and missing images.
Expected: no overlap or horizontal scroll at either width.

- [ ] **Step 4: Fix any defects found, then commit**

```bash
git add -A
git commit -m "fix: resolve issues from full verification pass"
```

Skip the commit if Step 4 has no changes.

---

## Self-Review Notes

- Spec coverage: tokens (Task 1), primitives (Task 2), chrome (Task 3), home (Tasks 4 to 6), inner pages (Tasks 8 to 11), preserved behavior (Global Constraints, Tasks 6, 9, 11), verification (Task 12).
- Type consistency: primitive names and props are defined once in Task 2 and reused by name in later tasks.
- Open decision carried into execution: whether the programs icon components are removed or kept. Task 5 says remove only when unused.
