# Site-wide reading and UX refinement

## Visual system
- Keep the existing ivory, burgundy, warm ink, grain, serif typography, and category emblems.
- Use burgundy for every link, active state, focus ring, and reading-progress line; reserve saffron for deliberately marked verses and the splash Enter action.
- Improve reading sizes and line spacing, reduce oversized reader titles, enforce a 12px minimum label size, and add locally hosted Playfair Display, Lora, and a matching Devanagari serif.
- Keep each existing image or emblem in its assigned role and adjust the smaller inner-page masthead and fixed watermark position together.

## Navigation and reading pages
- Make Meet the Author available everywhere; on reading pages, hide the masthead while scrolling down and reveal it while scrolling up.
- Add a fixed burgundy reading-progress line, estimated reading time, author byline, calmer closing ornament, and content-specific back links.
- End each article, insight, or series part with exactly one forward path; retain a quieter previous link for series.
- Add a mobile, collapsible “In this series” index and place “Part N of N” directly below series titles.

## Home, collections, and progress
- Add “Begin with the latest” beneath the home introduction and make empty content groups degrade gracefully.
- Store series reading progress only in the visitor’s browser, mark finished parts, and show “Continue with Part N” on Home and the Series page.
- Preserve the wide numbered collection rows and the existing Home cards without introducing new card styles.

## Insights
- Give each insight a shareable URL, remove the ten-item cap, replace repeated “Read more…” labels with one clear selection cue, and add an in-panel count plus previous/next controls.
- Support left/right arrow keys and scroll the selected text into view on phones.

## Accessibility, motion, and page details
- Add touch pressed states and visible burgundy keyboard focus outlines throughout.
- Shorten reading-page entrance motion, add a gentle route transition, and disable hover movement as well as fades when reduced motion is preferred.
- Give every browser view a specific tab title and description; redesign the missing-page view using the normal masthead, footer, typography, and a calm Home link.
- Browser metadata will update per page. Fully crawler-readable per-piece social cards require static prerendering or hosting support beyond this client-only site, so that portion will be documented rather than simulated unreliably.

## Validation
- Verify Home, Articles, Insights, Series, an Article reader, a Series reader, and the missing-page view on desktop and mobile.
- Confirm keyboard, touch, scrolling, local progress, shareable insight links, browser titles, and reduced-motion behavior.
