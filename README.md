# Personal Portfolio

React + TypeScript portfolio with an AI-inspired design system, responsive
navigation, personal Hero/About Me content, and Phase 4 technical skills and a
filterable eight-project showcase, an internship timeline with education, and
Phase 6 contact/footer polish with active navigation and progressive scroll reveals.
Technologies are presented as exposure through AI-assisted project development,
not independent proficiency. No new runtime dependencies are needed.

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
| `npm test` | Run all Vitest rendering and navigation tests once. |
| `npm run test:watch` | Re-run tests while editing. |
| `npm run lint` | Run ESLint; warnings also fail the check. |
| `npm run build` | Type-check the app and tooling, then build into `dist/`. |
| `npm run preview` | Serve the production build locally after building. |

Commit `package-lock.json` with dependency changes so `npm ci` reproduces the
dependency versions. The production output and installed dependencies are ignored.

## Structure

```text
src/
  App.tsx            Complete single-page portfolio section composition
  App.test.tsx       Rendering, anchor navigation, and mobile disclosure tests
  main.tsx           React browser entry point
  components/
    Button.tsx       Native Button and anchor ButtonLink with shared styles
    Container.tsx    Consistent responsive content width
    Header.tsx       Desktop navigation and mobile disclosure
    SectionHeading.tsx  Reusable numbered section headings
    ProfilePortrait.tsx  Profile photo with accessible initials fallback
    Projects.tsx     Category filtering, project cards, screenshot fallbacks
    Projects.test.tsx  Showcase counts, filtering, privacy, and skills tests
    Skills.tsx       Six groups of accurately qualified technology exposure
    Experience.tsx   Accessible internship timeline and education card
    Experience.test.tsx  Factual duties/dates, ongoing education, resume availability
    Resume.tsx       Resume summary and optional approved PDF download
    Resume.test.tsx  Download omission and local link semantics
    Contact.tsx      Entry-level career interest and approved GitHub channel
    Footer.tsx       Personal branding, section navigation, AI acknowledgment
  content/
    profile.ts       Personal copy, photo path, GitHub URL, and metadata source
    projects.ts      Typed project details, categories, optional links/images
    skills.ts        Typed skill groups and learning interests
    career.ts        Typed internships, education, and approved-resume setting
    navigation.ts    Shared Header/Footer section names and fragment targets
  hooks/
    useActiveSection.ts  Frame-throttled visible-section navigation state
    useScrollReveal.ts   Optional one-time section animation enhancement
  styles/
    index.css        Tailwind, theme tokens, responsive layout, and CSS effects
  test/
    setup.ts         DOM matchers and cleanup between tests
index.html           HTML shell, metadata, and dark browser color scheme
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

The dark palette applies before React renders and follows the same navy, cyan and violet tokens at every viewport. The browser uses dark native controls.

The navy grid hero pairs staggered text with a circular portrait and a one-time orbital entrance. Numbered headings and project cards organize the sections. The mobile menu slides briefly into place, and live-demo arrows shift on hover or keyboard focus. Reduced motion disables these effects.

## Editing personal content

Edit `src/content/profile.ts` for the name, title, introduction, education,
internship organizations, career interests, GitHub link, initials, and description.
The Vite HTML hook generates the page title and description from this same source
in both development and production; restart Vite after changing metadata.
The expected graduation is recorded as March 2027, not a completed qualification.

The approved PNG stays in the ignored private directory. The hero and its responsive preload select between 480px and 800px JPEGs in public/images. Both preserve the original aspect ratio and omit source metadata. The browser switches to accessible PJS
initials if the image is absent or fails to load. Width/height and CSS aspect ratio
reserve space so this fallback does not shift the layout. The original supplied
image is preserved. View Projects and Contact Me lead to their existing section
and Contact sections respectively; GitHub opens the supplied public profile in the current tab. No
contact details, additional social profiles, or internship responsibilities have
been inferred.

### Phase 3 acceptance checks

1. Check the Hero/About copy against the supplied facts, including fourth-year
   BSIT status, Cainta Campus, March 2027 expected graduation, and both internships.
2. Check the portrait crop and text wrapping at 320/375px, 768px, and desktop
   widths, including 200% zoom. Confirm no horizontal overflow.
3. Use the keyboard to activate View Projects, Contact Me, and GitHub. Confirm
   both anchors reach their existing sections and GitHub reaches the supplied
   profile. Recheck navigation, focus rings, and dark browser controls.
4. Block the image request or temporarily rename the photo, then reload. Confirm
   PJS initials appear without a broken image or layout shift; restore the photo.
5. Reload with normal motion: the hero text enters briefly while the portrait stays still. With reduced motion enabled, content and
   the portrait should appear immediately and remain still.
6. Run tests, lint, and build, then use `npm run preview`. Confirm the browser tab
   title includes Paul John A. Suela and inspect the personalized meta description.
   Repeat mobile, keyboard, reduced-motion, and image fallback checks in preview.

## Experience, education, and resume

Edit `src/content/career.ts` for internship organizations, roles, timing, duties,
education, and public-resume approval. About Me derives its internship list and
education summary from that source. BHLI is listed as IT Intern, completed October
2026, with CCTV replacement assistance on company trucks and assigned departmental
tasks. PESO is labeled the first internship with data encoding and administrative
tasks; no dates were supplied, so none are invented. Education remains fourth-year
BSIT at ICCT Colleges Foundation Inc., Cainta Campus, with expected graduation in
March 2027. It is not presented as a completed qualification or an IT Support
proficiency claim.

The responsive timeline is an ordered list; dates use semantic `time` elements,
and decoration is CSS-only. Education and Resume have labeled sections. Existing
anchor IDs, palette tokens, keyboard behavior, and reduced-motion
support are preserved. No new dependencies or animations are required.

### Resume privacy and availability

The supplied PDF was reviewed with local text extraction. It contained contact
information not approved for public disclosure in this request, so it was not
approved for inclusion. The exact values are not recorded here. The original was
preserved byte-for-byte at `.private/resume.pdf`, outside `public` and ignored by
Git. Vite's development server denies `.private` paths, and production builds do
not copy this directory. Do not move unreviewed personal files into `public`:
those files would be downloadable even without a visible link.

`publicResume` is currently `null`. The Resume card reports that a downloadable
resume is unavailable, and neither the Hero nor the card renders a download link.
To enable it later, first obtain approval for a sanitized PDF, review its visible
text, annotations, embedded metadata, and intended contact information, then place
it at `public/documents/resume.pdf`. Set `publicResume` to
`{ path: 'documents/resume.pdf', downloadName: 'Paul-John-Suela-Resume.pdf' }`.
The shared ResumeDownload component then renders both links with native download
semantics and a Vite base-aware URL. File existence and approval are manual gates;
the app does not infer permission from a filename. Verify the PDF in development
and production preview before publishing it. No replacement PDF was generated.

### Phase 5 acceptance checks

1. Confirm PR #4 is merged and Phase 5 starts from current main. Confirm both
   internships, BHLI's October 2026 completion, and only the supplied duties.
2. Verify PESO is identified as the first internship without invented dates.
   Confirm ongoing fourth-year BSIT status and March 2027 expected graduation.
3. Check the timeline and education/resume cards at 320/375px, tablet, desktop,
   and 200% zoom. Text should wrap without horizontal overflow.
4. Use desktop/mobile Experience navigation and keyboard controls. Check focus,
   anchor offsets, heading hierarchy, and screen-reader reading order.
5. Confirm the Resume card has an honest unavailable message and there is no
   Hero/card download link. Confirm the private PDF is ignored, absent from public
   assets and `dist`, and blocked by the dev server. Do not publish the local copy.
6. Recheck the unchanged professional title, project filtering, private project
   protections, dark palette, and reduced-motion behavior. The later Phase 6
   Contact section uses only the approved GitHub profile.
7. Run tests, lint, and build, then repeat layout/navigation/privacy checks using
   `npm run preview`. Automated DOM tests do not replace visual/screen-reader QA.

## Skills and project showcase

Edit `src/content/skills.ts` for Programming, Databases, Frameworks, Development
Tools, AI-Assisted Development, and Currently Learning. Lists describe technology
use in inspected projects, not professional mastery or numerical skill ratings.
AI automation and cloud computing remain learning interests. The hero, About Me,
and generated metadata use the aspiring software developer positioning while
preserving the supplied education and factual internship organizations.

Edit `src/content/projects.ts` for all eight project cards. The typed data separates
public and private repositories: private entries cannot define source/demo URLs.
Do not add a public link without checking repository visibility and the actual
destination. The two included demos (BiteMenu and Fortress Defense) returned HTTP
200 when checked on November 19, 2026. IT Asset Management's documented hosted
demo was unavailable and is omitted; other demo URLs were not guessed.

Category filters are native toggle buttons (`aria-pressed`) in a labeled group,
with per-category counts and a polite live result count. Focus stays on the
selected button. All is the default and restores the full eight-card grid. No
router, filtering library, modal, or new state dependency is needed. Categories
use **IT Management**, not IT Support. Screenshots are lazy-loaded, retain their
aspect ratio, and include descriptive alternatives and context captions. Missing
or failed images show a labeled visual fallback rather than a broken image or
invented preview. Links navigate in the same tab.

Five existing screenshots are included, totaling approximately 575 KiB. Help Desk
screenshots with unverified named records are omitted; BiteMenu and Monster
Hatchery have no suitable available capture. PolPol AI remains private, with no
source link; its image uses documented fictional demo content. Fortress Defense
uses a genuine current-game browser-check capture instead of its unrelated root
screenshot. See [project evidence](docs/project-evidence.md) for source paths,
link checks, screenshot provenance, and project-specific limitations. No project
is claimed to be a production deployment or independently implemented without AI.

### Phase 4 acceptance checks

1. Confirm the updated hero title, About Me positioning, metadata, preserved
   internships, and all six skill groups. AI automation/cloud computing should
   appear as learning interests, with no proficiency scores or IT Support group.
2. Check all eight project names, descriptions, technologies, features, and
   limitations against `docs/project-evidence.md` and the project repositories.
3. Use Tab and Enter/Space on each category. Check pressed state, visible focus,
   card membership, category counts, and announced result count. All should reset
   to eight projects, with no focus jumps when filtering.
4. Check GitHub links go to the seven public repositories. PolPol AI should have
   no source/demo link. Check the two verified demos; no login or form submission
   is necessary. Availability can change after verification.
5. Check the five screenshots and captions. BiteMenu, Help Desk, and Monster
   Hatchery should show Preview unavailable. Block an image request and confirm
   it also falls back cleanly, without changing card identity.
6. Check 320/375px, 768px, and desktop widths plus 200% zoom. Filter
   buttons/tags should wrap and cards should stack without horizontal overflow.
   Recheck navigation, dark palette, skip link, and reduced-motion behavior.
7. Run `npm test`, `npm run lint`, `npm run build`, then `npm run preview`. Inspect
   the new metadata and repeat keyboard, image, privacy, and layout checks.

## Contact and visual polish

Contact expresses interest in entry-level software development opportunities and
links only to the verified public GitHub profile. No email, phone number, location,
additional social profile, contact form, or backend has been added. Edit the
approved contact message and AI-assisted development acknowledgment in
`src/content/profile.ts`. The footer reuses shared section destinations, personal
branding, the existing professional title, and a Back to top link.

Header links use `aria-current="location"` for the visible section in both desktop
and mobile navigation. An underline and stronger text provide a cue beyond color.
Active state updates on scroll, resize, and hash navigation, with geometry work
limited to six sections and at most one update per animation frame. The sticky
header height and computed anchor padding are included in the detection offset;
anchor spacing is applied once through root scroll padding. The bottom of the page selects
Contact. Native anchors still work independently of the highlighting.

Scroll reveals are progressive enhancement. Sections start fully visible; a
successful IntersectionObserver callback adds a short, one-time CSS animation
from 88% to full opacity with an 8px movement. There is no hidden waiting class,
no scroll-jacking, and no reveal replay when project filters change. If the API
is absent or initialization throws, content stays visible. Observers disconnect
on cleanup and stop observing each revealed section. Reduced-motion users skip
initialization, and CSS suppresses animations/transitions if the setting changes
later. Focus within a section suppresses its reveal animation.

Portrait framing, fluid spacing, project-card padding, contact layout, and footer
wrapping reuse the existing palettes. Fine-pointer hover effects are small and
limited to no-preference motion settings; card focus remains explicitly visible.
No animation package, external font, new asset, or runtime dependency was added.
The private resume remains ignored/untracked and blocked by Vite, is excluded
from production, and download controls remain disabled.

### Phase 6 acceptance checks

1. Confirm Contact expresses the intended entry-level interest and exposes only
   the approved GitHub profile. There should be no contact form or invented details.
2. Confirm footer name/title, AI-assisted acknowledgment, all six section links,
   and Back to top. Check keyboard focus and native fragment navigation.
3. Scroll through all sections in both directions, use direct hashes, resize,
   and reach the page bottom. Check one desktop/mobile link has the current-location
   state, a visible underline, and no focus jump. Footer links should reach the
   same targets without resetting project filters.
4. Check 320/375px, 768px, and desktop widths, plus 200% zoom.
   Inspect portrait cropping, card images/tags, filters, contact/footer wrapping,
   readable contrast, and absence of horizontal overflow.
5. Check subtle hover/reveal behavior, then enable reduced motion. Content should
   stay readable and still. With IntersectionObserver disabled or throwing before
   page initialization, all sections must remain visible and usable.
6. Recheck mobile menu Escape/dismissal/resize focus, project filters and counts,
   photo/screenshot fallbacks, and dark palette. No obsolete placeholder
   message should remain; unavailable screenshots/resume retain honest fallbacks.
7. Run tests, lint, build, and `npm run preview`. Recheck private PDF exclusion,
   disabled downloads, and development HTTP denial of private paths. Repeat visual,
   keyboard, screen-reader, and reduced-motion checks on the production preview.

Automated regressions cover approved-only contact, footer destinations, current
navigation state, reveal fallback/cleanup, and existing portfolio behavior.
jsdom does not verify rendered spacing/crop, actual scrolling, CSS animation, or
screen-reader announcements. Native scroll detection uses section geometry; very
short viewports can change the highlighted section near boundaries without moving
keyboard focus.

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

1. Reload with a light OS preference. Confirm the page and native controls are dark before interaction.
2. Use the skip link, desktop anchors and mobile Menu with the keyboard. Escape returns focus to Menu.
3. Verify the title and actions settle once, the portrait stays still and project cards respond to focus or hover.
4. Enable reduced motion and reload. Content should remain visible with immediate anchor navigation.
5. Check filters, public links, portrait fallback and text wrapping at 320px and 200% zoom.

## Phase 7 verification and deployment

Use Node 24 and run the same checks as GitHub Actions from the repository root.

```sh
npm ci
npm test
npm run lint
npm run build
npm run check:privacy
npx playwright install chromium
npm run test:e2e
```

On Linux CI, install Chromium with `--with-deps`. The push and pull request workflow has read-only repository access. It runs the browser suite against its own loopback production preview on port 4177. It uploads no artifacts. Playwright covers keyboard navigation, dark rendering before React under CSP, project counts, mobile layout, privacy boundaries and axe checks at desktop and mobile widths. Screen readers and other browser engines still need manual testing.

For a mobile Lighthouse benchmark, start `npm run preview` and run `npx lighthouse http://localhost:4173 --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --view` with Chrome installed. Results depend on the browser and host load. Regenerate both responsive JPEGs when replacing the portrait.

For an approved Vercel deployment, use the Vite preset, Node 24, install command `npm ci`, build command `npm run build && npm run check:privacy`, and output directory `dist`. No environment secrets are required. Use a clean Git checkout. Only the build output belongs on a static host. Once the production origin is known, absolute canonical and social-sharing URLs can be added.

Vercel and Vite preview read the headers in `vercel.json`. The CSP permits same-origin scripts and blocks inline scripts and framing. Development mode needs Vite hot reload and uses its development policy.

The production scan rejects unexpected file types, hidden files, PDF data and common contact, credential and private repository patterns. Pattern checks cannot establish the safety of arbitrary image metadata or detect every secret. Review new content and screenshots before publication. Keep the private resume outside public and Git. No private comparison values are required in CI.

## Known tooling advisory

The previously reported picomatch ReDoS advisory [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) was withdrawn November 18, 2026. The installed and registry-latest version was 4.0.7 at verification. Full and runtime-only npm audits reported zero vulnerabilities. No forced upgrade, override or suppression was used. Rerun `npm audit` and `npm audit --omit=dev` when updating dependencies.

## Phase 7B mobile performance investigation

On November 20, 2026, three sequential Lighthouse 13.6.0 CLI launches measured the same production preview on loopback with fresh headless Chromium 159 profiles. All four categories ran each time. The mobile defaults matched Phase 7: 412 × 823 CSS pixels, simulated 150 ms RTT, 1,638.4 Kbps throughput and 4× CPU slowdown. Reports, DevTools logs and raw traces were saved locally under ignored `node_modules/.tmp/perf7b-*`. No tests or builds ran alongside the benchmark series.

| Measurement | Performance | Total blocking time | Largest contentful paint |
| --- | ---: | ---: | ---: |
| Phase 7 reference (displayed values) | 67 | 5,850 ms | 1.7 s |
| Phase 7B run 1 | 69 | 5,191 ms | 1.646 s |
| Phase 7B run 2 | 68 | 5,278 ms | 1.903 s |
| Phase 7B run 3 | 71 | 2,212 ms | 1.711 s |
| Phase 7B median | 69 | 5,191 ms | 1.711 s |

All three runs scored 100 for accessibility, best practices and SEO, with zero layout shift. The reference report labeled a 5,298 ms modeled task unattributable. Its original raw trace was unavailable. Each new trace showed the same type of unattributed task. Renderer elapsed times were 1,146, 937 and 530 ms, while the corresponding renderer CPU times were just 0.211, 0.348 and 0.214 ms. The simulated durations were approximately four times those elapsed times. No nested application script execution appeared in those tasks. Compositor tasks overlapped for 1,142, 932 and 526 ms respectively, with concurrent GPU activity. Separate initial layout work took approximately 134–270 ms.

The evidence points to waiting in the local browser rendering pipeline as the dominant measured stall. It does not isolate a driver, a particular visual effect or the cost on a physical phone. The production entry bundle was 243,111 bytes (about 75.5 kB gzip) and CSS was 21,446 bytes (about 5.5 kB gzip). The traces did not identify a JavaScript hot path or justify splitting the bundle. No runtime or benchmark setting was changed. The 90-point and 200 ms targets remain unmet; a hardware-backed mobile trace would be needed to assess real-device impact.

## Phase 7C dark-only preview before the minimal redesign

Three Lighthouse 13.6.0 mobile runs measured the final responsive portrait on production preview with the Phase 7B settings.

| Run | Performance | TBT | LCP |
| --- | ---: | ---: | ---: |
| 1 | 69 | 3,508 ms | 2.127 s |
| 2 | 69 | 2,984 ms | 2.112 s |
| 3 | 71 | 1,949 ms | 2.109 s |

Median performance was 69, TBT 2,984 ms and LCP 2.112 s. Phase 7B measured 69, 5,191 ms and 1.711 s respectively. Local headless results vary and physical-device performance remains unverified.
