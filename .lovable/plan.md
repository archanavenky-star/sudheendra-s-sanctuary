# Meet the Author panel for Home II

## What will change
- Add a standalone **Meet the Author** control at the far right of the sticky navigation bar on Home II only.
- Open the author information in a right-side slide-in panel over the current page.
- Include a clear **X** close control and allow the Escape key or backdrop to close the panel.
- Remove the existing author section from the Home II page content.

## Experience details
- Keep the page visible beneath a quiet translucent backdrop.
- Preserve the existing parchment, burgundy, serif, and editorial visual language.
- Make the panel comfortable on wide screens and full-width on small mobile screens.
- Prevent background scrolling while the panel is open and return focus to the trigger after closing.

## Technical details
- Keep the panel in the shared masthead layout, but render its trigger only on `/home-alternative`.
- Use local interface state only; no storage, forms, or backend changes.
- Verify opening, closing, sticky navigation, desktop/mobile layout, and removal of the inline author block.
