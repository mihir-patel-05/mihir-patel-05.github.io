# Portfolio Redesign: Nature Theme → Data Science Identity

## Context
The current portfolio uses a nature/mountains theme (teal/forest colors, mountain hero image, nature metaphors). The goal is to redesign the visual identity to reflect Mihir's brand as a data-driven person passionate about data science and ML — while keeping **all existing content unchanged**. We'll add animations and visual elements that reinforce this identity.

---

## Phase 1: Design Foundation

### 1. Color Scheme (`Code/src/index.css`)
Replace nature palette with a data science palette:
- **Primary**: Electric blue `hsl(230 75% 55%)` — evokes dashboards, Jupyter
- **Secondary**: Vivid purple `hsl(260 65% 55%)` — neural networks, ML
- **Accent**: Cyan `hsl(185 85% 50%)` — terminal output, code highlights
- **Background**: Light blue-gray `hsl(220 25% 97%)` (light) / Deep navy `hsl(225 30% 8%)` (dark)
- Update all gradient CSS variables and shadow tokens accordingly
- Add `.bg-grid-pattern` utility (subtle graph-paper CSS pattern using repeating linear gradients)

### 2. Typography (`Code/index.html`, `Code/tailwind.config.ts`)
- Replace **Merriweather** (literary serif) with **JetBrains Mono** (code-like) for headings
- Replace **Montserrat** with **Inter** (clean, dashboard-style) for body text
- The existing `font-serif` classes on headings will automatically pick up JetBrains Mono

### 3. New Animations (`Code/tailwind.config.ts`)
Add keyframes: `data-pulse`, `fill-bar` (skill bars), `node-glow` (hover glow), `count-up` (counter roll)

---

## Phase 2: New Components (3 files to create)

### 4. `Code/src/hooks/use-intersection-observer.ts`
Custom hook using native `IntersectionObserver` API. Elements animate when scrolled into view instead of all firing on page load. Disconnects after first trigger (one-shot).

### 5. `Code/src/components/NeuralNetworkBg.tsx`
Canvas-based animated neural network background for the hero:
- ~70 particles (nodes) drifting slowly, connected by lines when within proximity
- Cyan nodes, blue-purple connection lines
- Mouse interaction: nodes gently attracted toward cursor
- Reduces particle count on mobile for performance
- Pauses when tab not visible

### 6. `Code/src/components/AnimatedCounter.tsx`
Count-up animation component for statistics (e.g., "32%" animates from 0→32). Triggered by intersection observer. Uses `requestAnimationFrame` with easing.

---

## Phase 3: Section Updates

### 7. Hero (`Code/src/components/Hero.tsx`)
- Remove mountain background image import, replace with `<NeuralNetworkBg />` canvas
- Dark gradient overlay transitions to the new navy background color
- Add floating "data badges" — small pills (`Python`, `ML`, `SQL`, `TensorFlow`) with absolute positioning and `float` animation at low opacity
- Typing cursor color → cyan accent
- Add terminal prompt aesthetic to subtitle: `$ Data Scientist & Analytics Enthusiast`

### 8. About (`Code/src/components/About.tsx`)
- Replace `Mountain` icon → `BrainCircuit` (lucide-react), keep title "Explorer Mindset"
- Replace `Users` icon → `Workflow`, keep title "Problem Solver"
- Rewrite bio paragraph: replace nature metaphor with a data-focused intro (same spirit, no nature language)
- Add `bg-grid-pattern` to section background
- Wrap in `useIntersectionObserver` for scroll-triggered animations
- Replace `shadow-mountain` → `shadow-data`

### 9. Skills (`Code/src/components/Skills.tsx`)
- Add proficiency levels to skill data: `{ name: "Python", level: 95 }` etc.
- Replace bullet-point lists with **animated skill bars** that fill on scroll
- Each bar: gradient from primary→accent, fills to the skill's percentage
- Scroll-triggered via intersection observer
- Icons (Database, BarChart3, Brain, Code) already fit the theme — keep them

### 10. Experience (`Code/src/components/Experience.tsx`)
- Add **vertical timeline connector** — gradient line on the left with circle nodes at each entry (visible on md+ screens)
- Achievement stats ("32%", "30%") use `AnimatedCounter` component
- Tech tags get monospace font and subtle glow on hover
- Scroll-triggered staggered card animations
- Replace `shadow-mountain` → `shadow-data`

### 11. Education (`Code/src/components/Education.tsx`)
- Add `bg-grid-pattern` background
- Scroll-triggered animations
- Course codes in monospace cyan: `CSE331` prefix style
- Replace `shadow-mountain` → `shadow-data`

### 12. Projects (`Code/src/components/Projects.tsx`)
- Add gradient accent bar at top of each card (`h-1 bg-gradient-to-r from-primary via-accent to-secondary`)
- Tech tags use `font-mono text-xs` for terminal look
- Scroll-triggered staggered animations
- Replace `shadow-mountain` → `shadow-data`

### 13. Contact (`Code/src/components/Contact.tsx`)
- Footer text: "Built with passion for data and nature" → "Built with passion for data"
- Add `bg-grid-pattern` background
- Buttons get `node-glow` animation on hover
- Add decorative terminal element: `> ready_to_connect = True`

---

## Phase 4: Cleanup
- Delete `Code/src/assets/hero-mountains.jpg` (no longer used)

---

## Files Modified
| File | Change |
|------|--------|
| `Code/index.html` | Font imports (Inter + JetBrains Mono) |
| `Code/src/index.css` | Color variables, gradients, shadows, `.bg-grid-pattern` |
| `Code/tailwind.config.ts` | Font families, new keyframes/animations |
| `Code/src/components/Hero.tsx` | Neural network bg, floating badges, terminal style |
| `Code/src/components/About.tsx` | Icons, bio text, scroll animations, grid bg |
| `Code/src/components/Skills.tsx` | Animated skill bars with proficiency levels |
| `Code/src/components/Experience.tsx` | Timeline, animated counters, scroll animations |
| `Code/src/components/Education.tsx` | Scroll animations, mono course codes, grid bg |
| `Code/src/components/Projects.tsx` | Gradient bar, mono tags, scroll animations |
| `Code/src/components/Contact.tsx` | Footer text, terminal element, glow effects |

## Files Created
| File | Purpose |
|------|---------|
| `Code/src/hooks/use-intersection-observer.ts` | Scroll-triggered animation hook |
| `Code/src/components/NeuralNetworkBg.tsx` | Canvas neural network hero background |
| `Code/src/components/AnimatedCounter.tsx` | Count-up animation for stats |

## Files Deleted
| File | Reason |
|------|--------|
| `Code/src/assets/hero-mountains.jpg` | Replaced by canvas animation |

## No New Dependencies
Everything uses React + Canvas API + CSS + native IntersectionObserver. Zero new npm packages.

---

## Verification
1. Run `cd Code && npm run dev` — site should load on localhost:8080
2. Verify hero shows animated neural network with floating particles
3. Scroll through each section — elements should animate in as they enter viewport
4. Check skill bars fill with animation
5. Check experience achievement counters animate
6. Verify responsive behavior on mobile (reduce browser width)
7. Confirm all content (text, links, projects) is unchanged
