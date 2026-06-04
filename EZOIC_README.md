# Next.js Todo App — Ezoic Ad Integration Guide

A dummy project to learn how to integrate **Ezoic ads** into a Next.js (App Router) application.

---

## Project Structure

```
app/
├── layout.tsx          ← Ezoic scripts go HERE (Step 1 & 2)
├── page.tsx            ← Main page with ad slots placed
├── globals.css
└── components/
    └── EzoicAd.tsx     ← Reusable ad component (Step 3)
```

---

## How Ezoic Integration Works — Step by Step

### Step 1: Get Your Site ID
1. Sign up at [ezoic.com](https://ezoic.com)
2. Add your website and complete domain verification
3. Go to **Settings → Integration → Site ID** — note this number (e.g. `12345`)

### Step 2: Add Ezoic Scripts to `layout.tsx`
Ezoic needs two scripts in your `<head>`:

```tsx
// The consent/CMP script (privacy compliance)
<Script src="https://the.gatekeeperconsent.com/cmp.min.js" strategy="beforeInteractive" />

// The main Ezoic standalone script — replace YOUR_SITE_ID!
<Script src="https://ezoic.net/cmp.js?siteId=YOUR_SITE_ID" strategy="afterInteractive" />

// Initialize the ezstandalone queue
<Script dangerouslySetInnerHTML={{ __html: `
  window.ezstandalone = window.ezstandalone || {};
  ezstandalone.cmd = ezstandalone.cmd || [];
`}} strategy="beforeInteractive" />
```

### Step 3: Create Ad Placeholders in Ezoic Dashboard
1. In Ezoic: **Ad Tester → Placeholders → Create New**
2. Create these placements:

| Placeholder ID | Position | Ad Size | Notes |
|---|---|---|---|
| 101 | Header | 728×90 Leaderboard | Above the fold — good for CPM |
| 102 | Sidebar | 300×600 Half Page | **Highest earner!** |
| 103 | In-Feed | 300×250 Rectangle | Between content sections |
| 104 | Bottom Content | 300×250 Rectangle | End of list |
| 105 | Sticky Footer | 320×50 Mobile Banner | Always visible |

### Step 4: Place the `<EzoicAd>` Component
```tsx
import EzoicAd from "./components/EzoicAd";

// In your JSX:
<EzoicAd placeholderId={101} label="Header Banner" />
```

Ezoic will inject the ad into the `<div id="ezoic-pub-ad-placeholder-101">` element automatically.

### Step 5: Refresh Ads on User Interaction (SPA Pattern)
Since Next.js is a Single Page App, Ezoic won't automatically detect navigation. Manually refresh ads:

```tsx
// After a meaningful user action (e.g., adding a todo):
if (typeof window !== "undefined" && window.ezstandalone) {
  window.ezstandalone.cmd.push(() => {
    window.ezstandalone.refresh([102]); // refresh sidebar slot
  });
}
```

> **Important:** Ezoic TOS requires minimum ~30 seconds between refreshes for the same slot.

---

## Running the Project

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

In **development**, you'll see labeled placeholder boxes where ads would appear in production (since Ezoic only serves real ads on live domains).

---

## Going Live Checklist

- [ ] Replace `YOUR_SITE_ID` in `layout.tsx` with your real Ezoic Site ID
- [ ] Deploy to your domain (e.g. Vercel)
- [ ] Verify domain in Ezoic dashboard
- [ ] Create placeholder IDs 101–105 in Ezoic Ad Tester
- [ ] Enable Leap (Ezoic's CDN/speed tool) for better ad performance
- [ ] Wait 24–48 hours for Ezoic's AI to optimize ad placements

---

## Key Ezoic Concepts

| Term | Meaning |
|---|---|
| **Placeholder** | A numbered slot you define — Ezoic's AI decides which ad goes in it |
| **ezstandalone** | Ezoic's JavaScript API for controlling ads in SPAs |
| **`ez.define()`** | Tells Ezoic which placeholder IDs exist on this page |
| **`ez.enable()`** | Activates the ad slots |
| **`ez.displayAds()`** | Renders ads into the placeholder divs |
| **`ez.refresh()`** | Refreshes specific slots (use sparingly, ~30s minimum) |
| **`ez.destroyAds()`** | Cleans up ads when component unmounts |
