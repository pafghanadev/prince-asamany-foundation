# Nonprofit reference review — 11 October 2026

Reviewed the public homepage content of all ten supplied organisations and inspected their rendered layouts in the browser. Also revisited City Year, GiveDirectly, The Humane League, and DesignMD. Some pages needed a second capture after their images loaded. These are design observations, not endorsements or claims about this foundation.

| Reference | Useful pattern for this site |
| --- | --- |
| [Charity: water](https://www.charitywater.org/) | Prominent giving route; project locations and evidence close to impact claims. |
| [Feeding America](https://www.feedingamerica.org/) | Explicit routes to give, volunteer, and participate; human stories alongside practical activities. |
| [WWF](https://www.worldwildlife.org/) | Organise discovery around work, places, and involvement. |
| [Girls Who Code](https://girlswhocode.com/) | Clear programme discovery and participant-focused storytelling. |
| [Doctors Without Borders](https://www.doctorswithoutborders.org/) | Concise mission, current field stories, and reporting connected to figures. |
| [The Nature Conservancy](https://www.nature.org/en-us/) | Link local work to an understandable wider mission and multiple participation routes. |
| [Oxfam](https://www.oxfam.org/en) | Human-centred campaign stories and straightforward ways to take action. |
| [Habitat for Humanity](https://www.habitat.org/) | Direct giving and volunteering prompts connected to community work. |
| [Charity Navigator](https://www.charitynavigator.org/) | Make evidence and accountability easy for donors to assess. |
| [The Exodus Road](https://theexodusroad.com/) | Strong mission hierarchy and clear ways to support the work. |

## Applied changes

- Added an early participation section with existing donation, volunteering, and contact routes.
- Replaced abstract homepage impact copy with specific outreach activities and a link to actual stories.
- Finished mobile centring for programme rows, story bodies, photo captions, and map details.
- Clarified location selection and increased map selector touch targets to 44px minimum height.
- Removed the unconfirmed 800+ claim from the map statistics and location description.
- Simplified the final appeal and aligned its content consistently at desktop sizes.

No donation-to-outcome prices, financial percentages, ratings, or new beneficiary claims were introduced. Donation links use the existing donation page.

## Verification

- Production build and ESLint on the changed implementation files passed.
- Rendered homepage checked at 320, 390, 768, and 1440px: one H1, no horizontal overflow, and no failed loaded images.
- At 390px, participation, programme, and map headings compute to centred alignment.
- Selecting Kumasi Metro updates the map detail panel correctly.
- Local production preview restarted at http://localhost:3300/.

## Further mobile and SVG refinement

- Added original SVG illustrations for healthcare, relief, growth, giving, volunteering, and partnerships, with a consistent 64-unit grid and ink/gold palette.
- Made centred text the shared mobile default and corrected explicit alignment overrides, action rows, and list layouts across public pages.
- Centred event links, contact details, donation copy rows, programme actions, story pagination, press cards, and About-page content below 768px.
- Browser audit at 390px across the homepage, About, Programs, Stories, one story detail, Events, Get Involved, Contact, and Donate found no visible headings, paragraphs, or page links with non-centred computed text alignment; no horizontal overflow on those routes.
- Homepage also checked at 320, 700, and 1440px with no horizontal overflow.
- Production build, TypeScript, and ESLint passed. No forms or payments were submitted during review.
- Review capture: [mobile actions](screenshots/mobile-centered-actions.jpg).

## Public page heroes, navigation, and stories

- Reviewed reference mobile menus and inner pages, including WWF, Girls Who Code, and GiveDirectly.
- Rebuilt shared page heroes with full-color community photography, serif headings, concise introductions, and clear page actions. Mobile content remains centered.
- Applied the hero system to About, Programs, Stories, all five story details, Events, Get Involved, Contact, and Donate.
- Reworked the story archive into an editorial journal with dates, locations, article excerpts, and a featured story.
- Refined mobile navigation with persistent Donate access, centered destinations, active-page cues, and a cream full-screen drawer. Desktop navigation begins at 1024px.
- Removed the award video play overlay and native controls. Video is silent, does not loop, and uses a static poster for reduced-motion preferences.
- Added program anchor navigation and opportunity links that preselect the volunteer form.

### Review evidence

- Production build, TypeScript, ESLint, and git diff whitespace checks passed.
- All 13 public routes checked at 390px and 1440px: one H1, no horizontal overflow, no failed completed images. Mobile headings, paragraphs, and page links were centered.
- Navigation additionally checked at 320px, 768px, and 1024px; desktop resizing closes the drawer and restores scrolling.
- Keyboard focus wrapping, Escape closure, and menu route navigation checked.
- Award video confirmed controls=false, muted=true, loop=false.
- Express interest selected Community Outreach Volunteer and navigated to the form without submission.
- Captures: [mobile menu](screenshots/mobile-menu-refined.jpg), [About hero](screenshots/about-hero-refined.jpg), [story archive](screenshots/stories-refined.jpg).
