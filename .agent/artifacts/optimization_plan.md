# 🔬 New Nanthu's Kitchen — Full Optimization Audit & Plan

## Executive Summary
After a deep analysis of every file in your repository, I've identified **25+ optimization opportunities** across 6 categories: **Performance**, **Bundle Size**, **Code Quality**, **SEO/Accessibility**, **Image Assets**, and **Build/DX**. The site has a strong design foundation but ships ~55MB of unoptimized images, multiple redundant 3D canvases, TypeScript errors blocking production builds, and missing font preloads causing layout shifts.

---

## 🚨 P0 — Critical Issues (Must Fix)

### 1. TypeScript Build Errors — `MenuSpiral.tsx`
- **Issue**: 3 TS errors (`easeOutCubic` / `easeInOutCubic` declared but never read) block `npm run build`
- **Root Cause**: Variables declared inside `useEffect` closure at lines 411-412 but TS `noUnusedLocals` flags them because they're referenced indirectly via `updateCards`
- **Impact**: Cannot ship to production

### 2. Massive Unoptimized Images — 55+ MB Total
| File | Size | Problem |
|------|------|---------|
| `orange-blue-powder-table.jpg` | **31.8 MB** | Absurdly large for a web asset |
| `brushstroke-texture-modern-design.jpg` | **9.8 MB** | Should be < 200KB |
| `background.jpg` | **4.3 MB** | Should be < 300KB |
| `bg2.jpg` | **3.9 MB** | Should be < 300KB |
| `blue-paint-brush-stroke-effect.jpg` | **3.2 MB** | Should be < 200KB |
| `bg4.jpg` | **838 KB** | Acceptable but could be smaller |
| `favicon.png` (public) | **538 KB** | Should be < 10KB |
| `logo.png` (public) | **293 KB** | Acceptable |
| `new_nanthus_kitchen_logo.png` | **538 KB** | Should be < 50KB |

- **Impact**: Initial page load downloads 30-50MB of images. Mobile users on 4G will wait 30+ seconds.
- **Fix**: Compress all images to WebP, resize to max 1920px wide, use quality 80. Favicon should be a proper .ico or 32px PNG.

### 3. No Font Preloading — Causes FOUT/FOIT
- **Issue**: `LandingPage.css` loads 7 font families via a single `@import` URL at render time
- **Fonts loaded**: Outfit, Pinyon Script, Inter, Playfair Display, Rock Salt, Raleway, Libre Caslon Display
- **Impact**: Massive layout shift (CLS) as fonts load. Google Fonts waterfall blocks rendering.
- **Fix**: Add `<link rel="preload">` tags in `index.html`, or use `@fontsource` packages.

---

## ⚡ P1 — Performance Issues

### 4. Multiple WebGL Canvas Instances
- **Issue**: `LandingPage` renders a full Three.js Canvas with `ScrollControls`, `EffectComposer` (Bloom + Noise + Vignette), sparkles, clouds, floating particles, and steam wisps. Then `MenuPage` and `SpecialsPage` each spawn **another** full `Reusable3DBackground` Canvas.
- **Impact**: Each Canvas creates a separate WebGL context. Mobile devices are limited to ~8 contexts. Switching pages can cause context loss. GPU memory is wasted.
- **Fix**: Share a single background Canvas across routes, or conditionally unmount heavy 3D elements.

### 5. Noise Overlay on `body::after` — Renders on Every Frame
- **Issue**: `index.css` line 62-74 creates a `position: fixed` SVG noise overlay covering the entire viewport with `z-index: 9999`
- **Impact**: Forces GPU compositing on every scroll frame. On mobile, this is a significant performance drain.
- **Fix**: Use `will-change: transform` or remove the noise overlay on mobile.

### 6. SplineImageCard GSAP Animations Not Throttled
- **Issue**: `HeroImageGrid` attaches `mousemove` and `touchmove` listeners to `window` (global!) and fires `gsap.to()` on every RAF for 6 cards
- **Impact**: Every mouse pixel triggers 6 GSAP tweens even when the hero is not visible
- **Fix**: Use `IntersectionObserver` to disable tracking when hero is out of viewport. Detach listeners on unmount (currently done, but window-level scope is wasteful).

### 7. `backdrop-filter: blur()` Used Extensively
- **Issue**: Multiple components use `backdrop-filter: blur(20px)` or higher — `AboutPreview` cards, `CustomScrollbar`, `SpiralCard`, `Footer` newsletter, `ContactSection` CTA
- **Impact**: `backdrop-filter` is one of the most expensive CSS properties. Each blur creates a separate compositing layer.
- **Fix**: Reduce blur radius on mobile, or use solid semi-transparent backgrounds as fallback.

### 8. `ScrollControls` Page Count Hardcoded
- **Issue**: `pages={isMobile ? 12 : 11}` in `LandingPage.tsx` line 204 — this is fragile and will break when content height changes
- **Fix**: Compute dynamically based on content, or use a ref measurement.

### 9. DPR Capped but Not Optimally
- **Issue**: `dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}` — evaluates `window.devicePixelRatio` on every render
- **Fix**: Memoize the DPR value.

---

## 📦 P2 — Bundle Size Issues

### 10. Unused Dependencies
- `@splinetool/react-spline` + `@splinetool/runtime` — **NOT imported anywhere** in `src/`. These add ~2MB to `node_modules`.
- `@mui/lab` — Not imported anywhere
- `@types/leaflet`, `leaflet`, `react-leaflet` — Not imported anywhere (map feature removed?)
- `@mui/x-date-pickers`, `dayjs` — Not imported in main app code
- `lottie-react` — Not imported anywhere
- `maath` — Not imported anywhere
- `postprocessing` — Imported indirectly via `@react-three/postprocessing`

### 11. Heavy Three.js Bundle
- `three` + `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing` — these alone add ~1.5MB gzipped
- Many drei features imported but unused: `Cloud`, `Sparkles`, `Float`, `Environment`, `useTexture` all import large sub-modules
- **Fix**: Consider if the 3D background justifies the payload. A CSS particle animation could achieve 90% of the visual effect at 1% of the bundle cost.

### 12. Vite Manual Chunks Could Be Better
- Current chunking separates `vendor-react`, `vendor-mui`, `vendor-three`, `vendor-motion`
- Missing: `gsap` should be its own chunk (used only in menu + hero)
- Missing: `framer-motion` and `gsap` loaded on landing page even though only partially needed

### 13. `App.css` — Nearly Empty (24 bytes)
- Contains almost nothing. Should be removed and any remaining styles moved to `index.css`.

---

## 🧹 P3 — Code Quality Issues

### 14. `LandingPage.tsx` is 662 Lines — Monolithic
- Contains the entire landing page layout including Hero, Menu Preview inline JSX, all section wrappers, Canvas setup, scroll management, and 2 modal states
- **Fix**: Extract Menu Preview section into its own component (like the other sections already are).

### 15. `MenuSpiral.tsx` is 1376 Lines — Technical Debt
- Single file contains: keyframe CSS strings, particle components, interactive card component, full spiral/cylinder layout logic, scroll physics, side panel with full menu details, GSAP ticker
- **Fix**: Split into `SpiralCard.tsx`, `SpiralLayout.tsx`, `MenuDetailPanel.tsx`, `spiralKeyframes.ts`

### 16. Hardcoded Colors Throughout
- Despite having `theme/index.ts` with a proper color system, most components hardcode `"#F5A623"`, `"#0A1628"`, `"rgba(59, 130, 246, ..."` inline
- The theme is defined but barely consumed. Components should use `theme.palette.primary.main` etc.
- **Fix**: Audit all components and replace hardcoded colors with theme references. CSS variables in `index.css` are defined but barely used.

### 17. Inconsistent Font References
- `LandingPage.css` imports fonts via Google Fonts
- Theme defines `fontFamily` with Inter, Outfit, Playfair Display
- Components individually specify `fontFamily: "'Raleway', sans-serif"`, `"'Libre Caslon Display', serif"`, etc.
- Some fonts in theme aren't loaded (Playfair Display is loaded but defined differently in theme vs CSS)
- **Fix**: Centralize font loading. Use theme typography variants consistently.

### 18. `console.error` / `console.warn` Override in `StableScroll.tsx`
- Global console methods are monkey-patched at module load time (even though guarded by `DEV`)
- This is fragile and hides real errors that happen to match the pattern
- **Fix**: Use a less aggressive approach, or scope the suppression more tightly.

### 19. Unused Utilities
- `utils/accessibility.ts` exports `createSkipLink`, `getContrastRatio`, `handleKeyboardNavigation`, `getAccessibleButtonAttributes`, `createFocusTrap` — **none are imported anywhere**
- `utils/validation.ts` — need to check usage
- `hooks/useCustomHooks.ts` exports 7 hooks — check if all are actually used

### 20. `any` Type Usage
- `HeroImageGrid.tsx` line 143: `let renderConfigs: any[] = []` — should be properly typed
- Multiple `useRef` types could be more specific

---

## 🔍 P4 — SEO & Accessibility Issues

### 21. Missing `<link rel="preconnect">` for Google Fonts
- Fonts loaded via CSS `@import` without preconnect hint
- **Fix**: Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` to `index.html`

### 22. No Structured Data (JSON-LD)
- A restaurant website should have `Restaurant` schema markup for Google rich results
- Missing: business hours, menu schema, local business schema
- **Fix**: Add JSON-LD script in `index.html`

### 23. 404 Route Falls Back to LandingPage
- `<Route path="*" element={<LandingPage />} />` — should show a proper 404 page
- Search engines will see duplicate content on invalid URLs

### 24. Missing `alt` Texts & ARIA Labels
- Some images use generic alts like "logo"
- No ARIA landmarks on main sections
- No skip navigation link (the util exists but isn't used!)

### 25. Hidden Scrollbar = Accessibility Issue
- `scrollbar-width: none` + `::-webkit-scrollbar { display: none }` removes all scrollbar indicators
- Custom scrollbar only shown on desktop — mobile users have NO scroll indicator

---

## 🛠️ P5 — Build & DX Issues

### 26. Both `pnpm-lock.yaml` AND `package-lock.json` Exist
- Having both lock files causes confusion. Pick one package manager.

### 27. `vite.svg` in Public — Leftover from Template
- `public/vite.svg` is the default Vite logo and should be removed.

### 28. `dist/` Directory Should Be in `.gitignore`
- If the `dist` folder is committed, it bloats the repo unnecessarily.

### 29. `assets/react.svg` — Unused Template File
- Default CRA/Vite template file still present.

---

## 📋 Prioritized Action Plan

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| 🔴 P0-1 | Fix TS build errors in MenuSpiral | Unblocks production | 5 min |
| 🔴 P0-2 | Compress all images to WebP (especially the 31MB one) | -50MB bandwidth | 30 min |
| 🔴 P0-3 | Add font preloading to index.html | Eliminates FOUT, improves LCP | 10 min |
| 🟠 P1-1 | Remove unused dependencies | -2MB+ node_modules | 10 min |
| 🟠 P1-2 | Optimize noise overlay for mobile | Better FPS | 5 min |
| 🟠 P1-3 | Throttle 3D card animations when off-screen | Better FPS | 15 min |
| 🟡 P2-1 | Add JSON-LD structured data | Better SEO | 15 min |
| 🟡 P2-2 | Add font preconnect hints | Faster font load | 5 min |
| 🟡 P2-3 | Replace hardcoded colors with theme tokens | Maintainability | 2 hrs |
| 🟢 P3-1 | Split MenuSpiral.tsx into smaller files | Code quality | 1 hr |
| 🟢 P3-2 | Remove unused utils/template files | Cleanliness | 10 min |
| 🟢 P3-3 | Create proper 404 page | SEO + UX | 30 min |

---

*Shall I start implementing these fixes? I recommend starting with P0 items (build errors, image compression, font preloading) as they have the highest impact-to-effort ratio.*
