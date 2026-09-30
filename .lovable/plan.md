# Himalayan Dawn Splash

## What will be built

- Add a full-screen opening before the Home page using the existing Himalayan dawn imagery and brand palette.
- Place the I Am The World logo centrally, followed by the tagline “What runs the world runs the me” and one clear “Enter” action.
- Use a restrained fade and slight rise so the opening feels contemplative, with motion removed when a visitor prefers reduced motion.
- Show the splash only once per browser session; selecting Enter reveals the Home page and it will not return during that session.
- Keep direct visits to Articles, Insights, Series, and individual readings unobstructed.
- Ensure the opening is composed well on desktop and mobile, with an accessible Enter control.

## Technical details

- Add a focused splash component and control it at the application entry using session-only browser storage.
- Reuse existing local imagery and semantic design tokens; no new data collection or backend is introduced.
- Verify the splash-to-Home transition, repeat visits in one session, direct inner-page access, mobile layout, and current build status.
