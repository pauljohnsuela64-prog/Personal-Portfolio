# Personal Portfolio

React + TypeScript portfolio with an AI-inspired design system, responsive
navigation, and Phase 3 personal Hero/About Me content. Skills, Projects,
Experience, and Contact remain placeholders. No external fonts, icon libraries,
or animation dependencies are needed.

## Requirements and setup

- Node.js 22.12+ on the 22.x line, or Node.js 24+ (24 LTS recommended).
- npm, included with Node.js.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).
On Windows, if PowerShell blocks `npm.ps1`, use `npm.cmd` in these commands.
No environment variables or credentials are needed.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with hot updates. |
| `npm test` | Run all Vitest rendering, theme, and navigation tests once. |
| `npm run test:watch` | Re-run tests while editing. |
| `npm run lint` | Run ESLint; warnings also fail the check. |
| `npm run build` | Type-check the app and tooling, then build into `dist/`. |
| `npm run preview` | Serve the production build locally after building. |

Commit `package-lock.json` with dependency changes so `npm ci` reproduces the
dependency versions. The production output and installed dependencies are ignored.

## Structure

```text
src/
  App.tsx            Personal Hero/About Me and four future section placeholders
  App.test.tsx       Rendering, anchor navigation, and mobile disclosure tests
  theme.test.tsx     Persistence, system preference, and pre-paint script tests
  main.tsx           React browser entry point
  components/
    Button.tsx       Native Button and anchor ButtonLink with shared styles
    Container.tsx    Consistent responsive content width
    Header.tsx       Desktop navigation, mobile disclosure, and theme selector
    SectionHeading.tsx  Reusable numbered section headings
    ProfilePortrait.tsx  Profile photo with accessible initials fallback
  content/
    profile.ts       Personal copy, photo path, GitHub URL, and metadata source
  hooks/
    useTheme.ts      Theme selection, storage fallback, system change listener
  styles/
    index.css        Tailwind, theme tokens, responsive layout, and CSS effects
  test/
    setup.ts         DOM matchers and cleanup between tests
index.html           HTML shell, metadata, and synchronous pre-paint theme script
vite.config.ts       React, Tailwind, Vitest, and HTML metadata from profile.ts
eslint.config.js     JavaScript, TypeScript, and React lint rules
tsconfig*.json       Strict app and build-tool TypeScript settings
```

Keep tests beside the code they exercise. Add component or feature folders when
there is code to put in them; no router, state library, or UI kit is needed yet.

## Design system and themes

Tailwind CSS uses the official `@tailwindcss/vite` plugin and a CSS import; no
separate PostCSS or Tailwind JavaScript configuration is needed. Semantic CSS
variables define navy surfaces, readable foreground/muted text, cyan actions,
violet accents, borders, and decorative grid/glow colors. Tailwind's semantic
color utilities map to the same variables. Reuse these tokens and the existing
Button, ButtonLink, Container, and SectionHeading components before adding new
variants. Buttons retain native behavior; navigation uses real anchors.

The native **Color theme** selector offers System, Light, and Dark. System is the
default and follows live OS preference changes. An explicit choice is saved as
`portfolio-theme` in localStorage. Selecting System removes the saved override.
Invalid values fall back to System. If storage is blocked, theme changes still
work for the current visit, but cannot survive reloads.

A small synchronous script in the HTML head sets `data-theme` before the page is
painted, so the correct palette does not wait for React. Keep that script aligned
with `useTheme.ts`; tests exercise both paths. A deployment with a restrictive CSP
will need a hash/nonce for this inline script (no CSP is configured locally).
Theme changes are local to the tab; cross-tab synchronization is deferred.

Typography uses system sans-serif and monospace stacks. Spacing and type scale
with the viewport. CSS gradients and a portrait orbital accent provide the
technology-inspired background. The hero has a 650ms entrance and the orbital
accent settles in four seconds; neither loops. The photo stays still. Animation
is enabled only when reduced motion is not requested. Reduced-motion preference
also disables smooth scrolling and transitions; all content stays visible.

## Editing personal content

Edit `src/content/profile.ts` for the name, title, introduction, education,
internship organizations, career interests, GitHub link, initials, and description.
The Vite HTML hook generates the page title and description from this same source
in both development and production; restart Vite after changing metadata.
The expected graduation is recorded as March 2027, not a completed qualification.

The supplied photo is `public/images/profile.jpg`, served using Vite's base URL.
Replace that file to change the portrait. The browser switches to accessible PJS
initials if the image is absent or fails to load. Width/height and CSS aspect ratio
reserve space so this fallback does not shift the layout. The original supplied
image is preserved. View Projects and Contact Me lead to their existing section
placeholders; GitHub opens the supplied public profile in the current tab. No
contact details, additional social profiles, or internship responsibilities have
been inferred.

### Phase 3 acceptance checks

1. Check the Hero/About copy against the supplied facts, including fourth-year
   BSIT status, Cainta Campus, March 2027 expected graduation, and both internships.
2. Check the portrait crop and text wrapping at 320/375px, 768px, and desktop
   widths in both themes, including 200% zoom. Confirm no horizontal overflow.
3. Use the keyboard to activate View Projects, Contact Me, and GitHub. Confirm
   both anchors reach their existing placeholders and GitHub reaches the supplied
   profile. Recheck navigation, focus rings, and persisted theme selection.
4. Block the image request or temporarily rename the photo, then reload. Confirm
   PJS initials appear without a broken image or layout shift; restore the photo.
5. Reload with normal motion: only the hero entrance and portrait orbit animate,
   and both stop within four seconds. With reduced motion enabled, content and
   the portrait should appear immediately and remain still.
6. Run tests, lint, and build, then use `npm run preview`. Confirm the browser tab
   title includes Paul John A. Suela and inspect the personalized meta description.
   Repeat mobile, keyboard, reduced-motion, and image fallback checks in preview.

## Navigation and accessibility

Home, About, Skills, Projects, Experience, and Contact have stable fragment IDs.
The sticky header uses desktop links at 64rem and above; smaller viewports use a
native button with `aria-expanded` and `aria-controls` to disclose mobile links.
It is a navigation disclosure, not a dialog or ARIA application menu: Tab follows
normal document order without a focus trap. Escape returns focus to Menu; outside
pointer interaction, leaving the header with keyboard focus, section selection,
and switching to desktop close it. Focus moves from mobile controls to the matching
desktop link when resizing. Header section links focus their destination.
Anchor offsets keep content clear of the sticky header. A skip link, labeled
landmarks, visible focus rings, and 44px minimum control targets support keyboard
and touch use. Decorative geometry is hidden from assistive technologies.

## Manual checks

1. Run `npm run dev`. Check desktop (1024/1440px), tablet (768px), and mobile
   (320/375px) widths in both themes. Check readability, wrapping, no horizontal
   overflow, and 200% zoom. The header should switch navigation at 64rem.
2. With no saved theme, choose System and change the OS color preference. The
   page should follow. Choose the opposite explicit theme and reload: it should
   persist without briefly showing the system palette. Repeat with network/CPU
   throttling. Switch back to System and confirm the saved override is removed.
3. Tab from the address bar: Skip to content should appear first. Use only the
   keyboard for theme selection and all navigation; focus should remain visible.
4. At mobile width, open Menu with Enter/Space and Tab through all six links.
   Escape should close it and restore focus to Menu. Reopen and select a section:
   the menu should close, the URL hash should update, and the section should be
   visible and focused below the header. Check outside click and Tab dismissal.
5. Open the mobile menu, resize to desktop, then back to mobile: it should be
   closed. Verify desktop links, hero buttons, Back to top, browser back/forward,
   and direct URLs such as `/#projects`.
6. Enable reduced motion: anchor jumps should be immediate and control
   transitions disabled. Check a screen reader announces the selector, menu
   expansion state, navigation landmarks, and section headings.
7. With localStorage blocked, change themes and navigate: no crash should occur.
   Persistence is unavailable in this case. Check the browser console for errors.
8. Run `npm test`, `npm run lint`, `npm run build`, then `npm run preview` and
   repeat the theme reload and navigation checks against the production build.

Vitest exercises the real components in jsdom, including bootstrap script
execution, theme reload behavior, invalid/blocked storage, system changes,
anchor targets, menu focus/dismissal, supplied personal content, hero links, and
photo-error fallback. CSS breakpoints, visual contrast,
scroll positioning, initial paint, and real keyboard/screen-reader behavior still
need browser acceptance testing; jsdom does not perform layout or paint.

## Known tooling advisory

At setup on November 18, 2026, `npm audit` reported a high-severity ReDoS advisory
for `picomatch`, inherited through development tools. The registry's latest
release (4.0.7) is affected. Recheck with `npm audit` when updating dependencies;
avoid forced audit downgrades of Vite or Vitest. The app does not accept glob
patterns from users. Run `npm audit --omit=dev` to check runtime dependencies alone.
