# Portfolio Animation & Polish Upgrade Plan

**Stack context (read this first):** Next.js 16 (App Router, Turbopack), React 19,
TypeScript, Framer Motion, Supabase (Postgres/Auth/Storage, RLS-gated), MDX via
next-mdx-remote, react-hook-form + zod, deployed on Vercel at hulage.in. Design
system lives in `globals.css` (amber/copper dark theme, glass-morphism). Admin
CMS at `/admin` is password-gated via Supabase Auth.

Goal: elevate this from "solid dev portfolio" to "this person clearly operates
at a senior level" — through motion design, not gimmicks. Every animation
should feel *intentional*, performant, and accessible. No animation for its
own sake; each one should reinforce hierarchy, feedback, or delight at a
moment that earns it.

---

## Ground rules (apply for the entire session, every phase)

1. **Never break what works.** Public site, CMS auth, RLS policies, and the
   contact-form fallback ("unavailable" when Supabase prod isn't configured)
   must keep working exactly as before unless a phase explicitly changes them.
2. **Respect `prefers-reduced-motion`** on every single animation added —
   no exceptions. Build this into a shared motion config once, not per-component.
3. **GPU-friendly transforms only.** Animate `transform` and `opacity`;
   avoid animating `width`, `height`, `top/left`, or `box-shadow` directly.
   Use `will-change` sparingly and remove it after animation completes.
4. **One motion config to rule them all.** Centralize easing curves,
   durations, and spring presets (e.g. `lib/motion.ts`) instead of inlining
   magic numbers across components. Reuse relentlessly.
5. **TypeScript strict, no `any` regressions.** Keep the existing type
   discipline of the codebase.
6. **Mobile-first.** Every animation must be checked on a narrow viewport —
   no hover-only interactions without a reasonable touch equivalent.
7. **Commit per phase**, with a clear conventional-commit message. Run
   `npm run build`, `npm run lint`, and `npm run typecheck` (or the
   project's actual equivalents — check `package.json` scripts in Phase 0)
   after every phase. Don't proceed if the build is red.
8. **Bundle size discipline.** Any new dependency (e.g. GSAP, Lenis) must be
   justified in the changelog with why Framer Motion alone wasn't enough,
   and must be dynamically imported if it's only used below the fold.
9. **Don't touch Supabase Auth logic, RLS policies, or the production
   Supabase setup** as a side effect of animation work. If a phase seems to
   require it, stop and flag it instead of proceeding.

After each phase: give a brief changelog (what changed, why, any new deps),
run the checks in rule 7, then move to the next phase automatically —
**except Phase 9 and Phase 11**, which explicitly require pausing for
confirmation first.

---

## Phase 0 — Audit & Baseline

- Read the full repo structure, `package.json`, `globals.css`, and every
  component currently using `framer-motion`.
- Run the existing build/lint/typecheck to confirm a clean baseline.
- Capture a Lighthouse (performance + accessibility) baseline for `/`,
  `/projects/[slug]`, and `/blog/[slug]` — record the numbers in the
  changelog so later phases can be compared against them.
- Create `lib/motion.ts`: shared easing curves (e.g. a custom
  `cubic-bezier` "premium" ease), duration tokens (fast/base/slow), and
  spring presets (snappy/gentle). Export a `useReducedMotion`-aware helper
  that any component can call to get a no-op variant automatically.
- No visual changes in this phase — foundation only.

## Phase 1 — Design tokens for motion

- Extend the existing design-token system in `globals.css` with motion-
  relevant CSS variables (e.g. `--ease-premium`, `--duration-base`) so both
  CSS-only and Framer Motion animations pull from the same source of truth.
- Add a small `<MotionProvider>` (if not already implicitly handled) that
  reads `prefers-reduced-motion` once and exposes it via context/hook.

## Phase 2 — Hero section

- Refine the terminal typewriter: add a realistic variable-speed cursor
  blink, and a subtle syntax-highlight color pass on the typed text.
- Mouse-tracking parallax on the background orbs — smooth, capped
  velocity, disabled entirely under reduced-motion.
- Magnetic hover effect on the primary CTA button (cursor-proximity pull,
  small scale/translate, spring-based release).
- Scroll-linked hero exit: use `useScroll` + `useTransform` to fade/scale
  the hero out as the user scrolls into the next section, rather than a
  hard cut.

## Phase 3 — Navigation

- Refine the active-route indicator using a shared `layoutId` so it glides
  between nav items instead of snapping.
- Scroll-aware navbar: shrink/compact on scroll down, restore on scroll up,
  with a soft blur/opacity transition.
- Mobile menu: staggered link reveal on open (children animate in
  sequence), reversed on close.
- Thin route-change progress bar at the top of the viewport during
  navigation.

## Phase 4 — Page transitions

- Wrap route transitions in `AnimatePresence mode="wait"` with a
  consistent fade+slight-slide pattern.
- Shared-element transition (`layoutId`) from a project card on the
  listing page to its hero image/title on the detail page.
- Add lightweight skeleton loaders for `/projects/[slug]` and
  `/blog/[slug]` while MDX/Supabase content resolves, so transitions never
  feel like a blank flash.

## Phase 5 — Scroll storytelling (About / Experience / Skills)

- Staggered reveal-on-scroll for section content (fade + slide-up,
  threshold-based, using `whileInView`).
- Animated count-up for the live-computed stats (years of experience,
  project count, tech count, certifications) when they scroll into view.
- Experience timeline: the connecting line draws in progressively as the
  user scrolls, with each entry fading in as the line reaches it.
- Skill tags: soft stagger-in by category, not all at once.

## Phase 6 — Projects section

- Subtle 3D tilt on project cards on hover (perspective + rotateX/rotateY
  tied to cursor position, clamped, spring-damped release) — desktop only,
  graceful static fallback on touch.
- Image reveal wipe/mask on card entry instead of a plain fade.
- Animated filter/sort transitions if tags or categories exist — items
  should reflow with `layout` animations, not jump-cut.

## Phase 7 — Micro-interactions

- Consistent button press/hover states (scale + shadow shift) across the
  whole site, driven by the shared motion tokens.
- Link underline "draw-in" on hover for inline text links.
- Contact form: field focus animations, inline validation feedback that
  animates in/out (not just appears), and a satisfying success-state
  animation on submit (including the graceful "unavailable" fallback state
  — that should feel intentional too, not broken).
- Toast/notification animation system if one doesn't already exist for
  form feedback.

## Phase 8 — Blog / MDX polish

- Reading-progress bar tied to scroll position on `/blog/[slug]`.
- Copy-to-clipboard button on code blocks with a satisfying
  checkmark-confirmation animation.
- Scrollspy-driven table of contents (if one exists or is worth adding)
  that highlights the active section as you scroll.
- Lazy-reveal images within MDX content as they enter the viewport.

## Phase 9 — Admin CMS polish (PAUSE HERE FIRST)

**Stop and confirm with me before starting this phase.** This touches
authenticated, data-mutating surfaces (CRUD for projects/posts, messages
inbox) and I want to review scope before any animation work happens near
Supabase Auth or RLS-gated writes.

Once confirmed, likely scope: animated dashboard count-ups, enter/exit
animations for list rows on create/publish/delete (optimistic UI feel),
subtle loading states for image uploads to Supabase Storage.

## Phase 10 — Performance & accessibility pass

- Re-run Lighthouse on the same three pages from Phase 0 and compare
  directly against the baseline — flag any regression over 5 points.
- Audit every new animation for `prefers-reduced-motion` compliance again,
  end to end.
- Confirm all interactive animated elements have visible focus states for
  keyboard users (motion should never replace a focus ring).
- Dynamic-import any animation-heavy code that isn't needed above the
  fold; verify bundle size delta since Phase 0.

## Phase 11 — Final review (PAUSE HERE FIRST)

**Stop and confirm with me before considering this done.** Present a full
before/after summary: Lighthouse deltas, bundle size deltas, a list of
every new animation added with a one-line rationale for each, and any
known trade-offs. Only close out the plan after I sign off.

---

## Definition of done (per phase)

- Build, lint, and typecheck pass.
- Reduced-motion verified for anything new.
- Tested at mobile width (375px) and desktop width (1440px) minimum.
- Changelog written before moving on.
