# Animation & Polish Upgrade — Changelog

Working log for the phased upgrade in [upgrade-plan.md](./upgrade-plan.md).

## Phase 0 — Audit & Baseline (2026-07-05)

### Baseline checks
- `npm run lint` — clean
- `npx tsc --noEmit` — clean (no `typecheck` script exists; this is the equivalent)
- `npm run build` — clean (Next 16 / Turbopack)

### Lighthouse baseline (production build, `next start`, headless Chrome, Lighthouse 13.4)
| Page | Perf | A11y | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|
| `/` | 77 | 94 | 2.4 s | 3.6 s | 280 ms | 0.004 |
| `/projects/enterprise-ai-platform` | 90 | 95 | 0.8 s | 3.3 s | 180 ms | 0 |
| `/blog/designing-motion-for-dev-portfolios` | 89 | 100 | 1.3 s | 3.3 s | 110 ms | 0 |

Phase 10 must compare against these; flag any regression > 5 points.

### Bundle baseline
- `.next/static` total: **1764 KB** (largest JS chunks: 304 / 240 / 224 / 140 KB)

### Framer Motion inventory (pre-upgrade)
- `src/components/ui/AnimatedSection.tsx` — 7 whileInView-style variants, ease `[0.25, 0.4, 0.25, 1]`
- `src/components/ui/ParticleBackground.tsx` — cursor-parallax orbs (`useSpring` 40/20)
- `src/components/sections/HeroSection.tsx` — entrance stagger, scroll-linked fade (`useScroll`/`useTransform`)
- `src/components/Navbar.tsx` — `layoutId` active pill (spring 380/30), mobile overlay stagger
- `src/app/(site)/template.tsx` — per-navigation fade+slide enter

### Changes
- **New `src/lib/motion.ts`** — shared easing curves (`EASE_PREMIUM`, `EASE_STANDARD`, `EASE_IN_OUT`), duration tokens (fast/base/slow), spring presets (snappy/gentle/soft — values codify what components already used inline), and reduced-motion helpers (`usePrefersReducedMotion`, `useMotionSafeVariants`). No component consumes it yet — foundation only, zero visual change.
- Moved the plan file from repo root to `docs/upgrade-plan.md` (its intended location).

### Deviations from plan
- No `npm run typecheck` script exists → using `npx tsc --noEmit`.
- No blog posts existed in local Supabase → seeded one local test post so `/blog/[slug]` could be baselined (local DB only, not committed data).
- Docker Desktop was paused → resumed it and restarted the local Supabase stack.

## Phase 1 — Motion design tokens + MotionProvider (2026-07-05)
- `globals.css`: `--ease-premium/standard/in-out/spring`, `--duration-fast/base/slow`; `--transition-*` now derive from them (base 0.25→0.3s, slow 0.4→0.45s). Global `prefers-reduced-motion` CSS kill switch.
- New `MotionProvider` (`MotionConfig reducedMotion="user"`) wrapping the app in `layout.tsx`; removed the inline `scroll-behavior` style that would have blocked the reduced-motion override.

## Phase 2 — Hero (2026-07-05)
- Typewriter: variable keystroke timing, cursor solid while typing / blinking at rest, last word of the role in accent color, static first role under reduced motion.
- New `ui/Magnetic.tsx` on the primary CTA (spring pull, pointer-only, reduced-motion disabled).
- Hero scroll exit now scales to 0.96 in addition to fade/translate.
- ParticleBackground: parallax disabled under reduced motion; springs from `SPRING_OPTS.soft`.

## Phase 3 — Navigation (2026-07-06)
- Direction-aware compact navbar: padding compacts past 120px when scrolling down, restores on any scroll up (discrete state change on a fixed element — self-contained layout, transitioned via motion tokens).
- Mobile menu: parent-driven stagger variants; close reverses the item order (`staggerDirection: -1`).
- New `ui/RouteProgress.tsx`: 2px top progress bar, starts on internal link click (App Router has no nav-start event), completes on pathname change, 4s stuck-bar safety. Mounted in `(site)/layout.tsx`.
- Nav active pill spring now `SPRING.snappy` from lib/motion.
- Verification note: this preview harness suspends rendering (rAF + render-aligned scroll events) in its backgrounded tab, so scroll-driven behavior can't be observed here; verified mobile menu (8 items mount, variants wired) and progress bar (mounts on navigation) via direct DOM interaction.

## Phase 4 — Page transitions + skeletons (2026-07-06)
- `loading.tsx` skeletons (shimmering `Skeleton` blocks, transform-only) for `/projects/[slug]` and `/blog/[slug]`.
- `template.tsx` transition moved onto shared tokens; detail pages get a coordinated two-step entrance.
- **Deviation:** true cross-route `layoutId` shared elements / `AnimatePresence mode="wait"` exits need the unstable frozen-router hack — skipped per ground rule 1; coordinated entrance + route progress cover the intent.

## Phase 5 — Scroll storytelling (2026-07-06)
- `CountUp` on About stats (SSR renders real values for SEO/no-JS; animates 0→N in view; static under reduced motion).
- Experience timeline line draws in with scroll (`scaleY` + gentle spring).
- Skill tags stagger in per category.

## Phase 6 — Projects (2026-07-09)
- `TiltCard`: clamped 3D tilt toward cursor, spring release; mouse-only, disabled under reduced motion.
- **Deviations:** cards render no images → image-wipe N/A (kept scaleIn entry); no filter/sort UI → layout reflow N/A.

## Phase 7 — Micro-interactions (2026-07-09)
- `:active` press states for buttons; `link-underline` draw-in utility (contact links + all MDX links, hover and focus-visible).
- Contact form: focus-within label tint, animated validation errors, spring check success banner, calm amber "unavailable" fallback styling.
- **Deviation:** no global toast system — animated inline banners are the only feedback consumer.

## Phase 8 — Blog/MDX polish (2026-07-09)
- `ReadingProgress` bar on `/blog/[slug]` (1:1 scroll binding — state indicator, kept under reduced motion).
- `CodeBlock` MDX override: copy-to-clipboard with spring checkmark confirmation (button reveals on hover/focus).
- `MDXImage` override: native lazy loading + fade/slide reveal in view. Both wired into blog AND project MDX renders.
- **Deviation:** scrollspy TOC skipped — posts are short, no TOC exists; not worth the complexity yet.
