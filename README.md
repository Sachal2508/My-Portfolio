# Muhammad Sachal — Premium Portfolio

A high-end, interactive developer portfolio built with **Next.js 14**, **Framer Motion**, **GSAP**, and **Lenis** smooth scrolling. Inspired by top-tier portfolios like zunedaalim.com with cinematic motion, a custom lagging cursor, and magnetic interactions.

---

## ✨ Features

- **Custom Lagging Cursor** — 22 trailing dots that follow your cursor with fluid easing (lerp)
- **Lenis Smooth Scroll** — Inertia-based scrolling with a heavy, cinematic feel
- **GSAP ScrollTrigger** — Synced with Lenis for advanced scroll animations
- **Framer Motion** — Scroll-reveal fade-ups, staggered lists, character-by-character name entrance
- **Magnetic Buttons** — Nav items and buttons elastically pull toward the cursor
- **Fullscreen Menu** — Clip-path slide-down overlay with staggered nav links
- **Typewriter Effect** — Roles rotate with a smooth type/delete animation
- **Parallax Hero** — Background name text moves slower than foreground content
- **3D Card Tilt** — Project cards tilt on mouse movement using CSS perspective
- **Dark / Light Mode** — Toggle with localStorage persistence
- **Grain Texture** — Subtle CSS-based grain overlay for depth
- **Responsive** — Mobile-first, works on all screen sizes

---

## 🗂️ Folder Structure

```
sachal-portfolio/
├── app/
│   ├── globals.css          # Global styles, grain, scrollbar, cursor hide
│   ├── layout.tsx           # Root layout with metadata & fonts
│   └── page.tsx             # Main page composer
│
├── components/
│   ├── CustomCursor.tsx     # ⭐ Lagging dot trail cursor
│   ├── SmoothScroll.tsx     # Lenis + GSAP ScrollTrigger setup
│   ├── MagneticElement.tsx  # Magnetic hover wrapper
│   ├── ScrollReveal.tsx     # Reusable fade-up reveal component
│   ├── Navbar.tsx           # Nav + fullscreen menu overlay
│   ├── Hero.tsx             # Name reveal, typewriter, parallax
│   ├── About.tsx            # Bio + education timeline
│   ├── Skills.tsx           # Animated skill bars + tools
│   ├── Projects.tsx         # Tilt cards for all 8 projects
│   ├── Contact.tsx          # Email + socials
│   └── Footer.tsx           # Copyright + status
│
├── public/
│   ├── images/
│   │   └── Sachal.jpg       # ← Add your photo here
│   └── Resume.pdf           # ← Add your resume here
│
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**

### 1. Clone / Download

```bash
# If using git
git clone https://github.com/Sachal2508/portfolio-nextjs.git
cd portfolio-nextjs

# Or unzip the downloaded folder and cd into it
cd sachal-portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Add Your Assets

Place these files in the `public/` folder:

```
public/
├── images/
│   └── Sachal.jpg    ← your profile photo
└── Resume.pdf        ← your resume PDF
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js.

### Option B — GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Leave all settings as default
5. Click **Deploy** ✅

Your site will be live at `https://your-project.vercel.app`

---

## 🎨 Customisation

### Change Accent Color

In `app/globals.css`, update:

```css
:root {
  --accent: #0BE7FF; /* ← change this */
}
```

And in `tailwind.config.ts`:

```ts
accent: "#0BE7FF", /* ← change this too */
```

### Update Personal Info

All content is co-located in each component. The main places to edit:

| What | Where |
|------|-------|
| Name, tagline, role list | `components/Hero.tsx` |
| Bio, education | `components/About.tsx` |
| Skill names and levels | `components/Skills.tsx` |
| Projects list | `components/Projects.tsx` |
| Email, social links | `components/Contact.tsx` |
| Site metadata | `app/layout.tsx` |

### Adjust Cursor Trail Length

In `components/CustomCursor.tsx`:

```ts
const TRAIL_COUNT = 22;  // number of trailing dots
const EASING = 0.18;      // lower = more lag, higher = snappier
const HOVER_EASING = 0.38; // tightens on hover
```

### Adjust Smooth Scroll Feel

In `components/SmoothScroll.tsx`:

```ts
const lenis = new Lenis({
  duration: 1.4,        // higher = more inertia
  wheelMultiplier: 0.9, // lower = scroll less per tick
});
```

---

## 📦 Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| Next.js | 14.2 | React framework (App Router) |
| React | 18 | UI library |
| Tailwind CSS | 3.4 | Utility CSS |
| Framer Motion | 11 | Animations & transitions |
| GSAP | 3.12 | Advanced animations, magnetic |
| Lenis | 1.1 | Smooth scroll with inertia |
| clsx | 2.1 | Class name utility |

---

## 🔧 Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📄 License

MIT — feel free to use as a base for your own portfolio.

---

Built with ♥ by Muhammad Sachal
