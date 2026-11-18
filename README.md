# Personal Portfolio

Phase 1 foundation for an AI and technology-inspired professional portfolio.
This phase contains a minimal placeholder, without personal information, projects,
animations, or the final visual design.

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
| `npm test` | Run all Vitest smoke tests once. |
| `npm run test:watch` | Re-run tests while editing. |
| `npm run lint` | Run ESLint; warnings also fail the check. |
| `npm run build` | Type-check the app and tooling, then build into `dist/`. |
| `npm run preview` | Serve the production build locally after building. |

Commit `package-lock.json` with dependency changes so `npm ci` reproduces the
dependency versions. The production output and installed dependencies are ignored.

## Structure

```text
src/
  App.tsx            Portfolio placeholder and its semantic page structure
  App.test.tsx       User-visible rendering smoke tests
  main.tsx           React browser entry point
  styles/
    index.css        Tailwind import, shared colors, and global defaults
  test/
    setup.ts         DOM matchers and cleanup between tests
index.html           HTML shell and page metadata
vite.config.ts       React, Tailwind, and Vitest integration
eslint.config.js     JavaScript, TypeScript, and React lint rules
tsconfig*.json       Strict app and build-tool TypeScript settings
```

Keep tests beside the code they exercise. Add component or feature folders when
there is code to put in them; no router, state library, or UI kit is needed yet.

## Styling and future themes

Tailwind CSS uses the official `@tailwindcss/vite` plugin and a CSS import; no
separate PostCSS or Tailwind JavaScript configuration is needed. Semantic CSS
variables define the background, foreground, muted text, and accent colors in
one place. Tailwind utilities reference those variables rather than repeating
colors in components. The placeholder starts with a dark palette. A future light
palette can override the same variables; theme controls and persistence are
intentionally deferred.

## Manual checks

1. Run `npm run dev` and open the printed URL. Confirm the portfolio heading and
   under-development message appear without starter logos or a counter.
2. Check a narrow mobile viewport and a desktop viewport. Text should remain
   readable, with no horizontal scrolling. Try 200% browser zoom.
3. Check the browser console for errors. Edit the placeholder text and confirm
   Vite updates it without restarting the server, then restore the text.
4. Run `npm test`, `npm run lint`, and `npm run build`.
5. Run `npm run preview` and check the same page using its printed URL.

Vitest runs the actual component in jsdom and verifies the main landmark, heading,
and development message. It does not replace visual checks in a real browser.

## Known tooling advisory

At setup on November 18, 2026, `npm audit` reported a high-severity ReDoS advisory
for `picomatch`, inherited through development tools. The registry's latest
release (4.0.7) is affected. Recheck with `npm audit` when updating dependencies;
avoid forced audit downgrades of Vite or Vitest. The app does not accept glob
patterns from users. Run `npm audit --omit=dev` to check runtime dependencies alone.
