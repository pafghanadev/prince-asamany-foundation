# Prince Asamany Foundation: Public Site Redesign

Date: 2026-10-11
Scope: whole public site (`/`, `/about`, `/programs`, `/get-involved`, `/stories`, `/stories/[slug]`, `/events`, `/donate`, `/contact`), plus shared Navbar and Footer.

## Problem

The current site reads as generic template output: centered hero, stacked card grids, soft rounded UI, and interchangeable sections. It does not show the foundation's real community work with enough weight.

## Direction: Documentary Editorial

The site should feel like a field report from Akyawkrom and nearby communities. Real photography carries the page. Layouts are asymmetric and text-led, with strong headlines and few decorative elements.

### Principles

1. Real community photography first. Use existing images in `public/media/opt/` and top-level `public/`. No new stock imagery.
2. Asymmetric layouts. Alternate image-left and image-right bands, offset captions, and wide/narrow column splits. No uniform three-card grids as the default.
3. Editorial type. Playfair Display for headlines, Plus Jakarta Sans for body. Headlines are larger and tighter, with fewer words.
4. Surfaces. Warm paper (`#FAF6EE` family) for reading areas, deep ink (`#113647` family) for emphasis bands. Red and gold accents are used sparingly for calls to action and section markers.
5. Honest content. No invented impact statistics. Only numbers already in the codebase or supplied by the foundation. Existing copy is kept unless a section is restructured.
6. No decorative motifs. No Ghanaian pattern overlays, blurred orbs, gradient decoration, or glassmorphism.
7. The City Year, GiveDirectly, and Humane League notes inform hierarchy and photo-led composition only. Their brand colors, fonts, and layouts are not copied.

## Preserved behavior

- Event data from Google Sheets via `getEvents()` with 60-second revalidation on `/`.
- Contact form and `api/contact` route.
- Paystack donation flow: `PaystackDonateButton`, `api/paystack/verify`, and the donate page.
- Story routes and `StoryGallery`.
- Navbar, Footer, `StickyDonate`, metadata, sitemap, and robots.
- All existing route URLs.

## Shared system

- Tokens: extend `app/globals.css` `@theme` with paper and ink surface tokens. Existing brand color names stay so current references still resolve.
- Shared primitives: section band, editorial headline, photo caption block, CTA row. Small components in `components/ui/` or `components/sections/`.
- Buttons: tighter radius than the current pill style. Primary CTA is gold fill with navy text (6.4:1, already verified).
- Cards: flat, with a 1px rule, no shadow. Used only for repeated items such as events and stories.
- Motion: restrained fade-up on section entry, disabled under `prefers-reduced-motion`.

## Page structure

- Home: full-bleed documentary hero with headline and one CTA, an offset photo band, programs as a numbered list with images, founder as a wide split, stories as a staggered grid, events list, map section, trust strip, closing CTA band.
- About, Programs, Get Involved, Stories, Events, Donate, Contact: restyled page header followed by the same band system. Per-page layout detail is set during planning.

## Accessibility and performance

- WCAG AA contrast for all text pairs.
- Images use `next/image` with explicit sizes and meaningful alt text.
- Visible keyboard focus on all links and buttons.

## Out of scope

- Changes to the Paystack integration, the Sheets event source, the contact API, or story content.
- New impact figures, new photography, or a CMS.

## Verification plan

- `npm run build` passes.
- Each route checked with screenshots at desktop and mobile widths.
- Donate, contact, and events flows smoke-tested.
