# Design Lab Quick Start

## How to Preview Variations

### Method 1: Use the Variation Switcher (Recommended)

1. Open `src/App.tsx`

2. Replace the entire file with:

```tsx
import DesignLab from './design-lab';

function App() {
  return <DesignLab />;
}

export default App;
```

3. Run `npm run dev`

4. You'll see a menu in the top-left to switch between all 5 variations!

---

### Method 2: Preview Individual Variations

1. Open `src/App.tsx`

2. Import the variation you want:

```tsx
import Variation1_CyberpunkTerminal from './design-lab/Variation1_CyberpunkTerminal';
// or
import Variation2_NeonCity from './design-lab/Variation2_NeonCity';
// or
import Variation3_PlayfulArcade from './design-lab/Variation3_PlayfulArcade';
// or
import Variation4_GlassmorphismZen from './design-lab/Variation4_GlassmorphismZen';
// or
import Variation5_RetroSynthwave from './design-lab/Variation5_RetroSynthwave';

function App() {
  return <Variation1_CyberpunkTerminal />;
}

export default App;
```

3. Run `npm run dev`

---

## What's Included in Every Variation

✅ **Original 4 Modes:**
- Gravity Well
- Fireworks
- Paint Flow
- Repulsion Field

✅ **2 NEW Modes:**
- Matrix Rain (digital cascade)
- Glitch Mode (chaotic corruption)

✅ **Settings Panel:**
- Particle count (50-500)
- Speed multiplier (0.1x-3x)
- Particle size (1-8px)
- Glow intensity (0-50)
- Trail length (0-100%)

✅ **Interactive Stats:**
- Live FPS counter
- Particle count
- Current mode display

---

## Try Each Variation

Each offers a completely different visual experience:

1. **Cyberpunk Terminal** - Matrix green, scan lines, terminal UI
2. **Neon City** - Vibrant hexagons, electric glows
3. **Playful Arcade** - Bouncy pills, emojis, score system
4. **Glassmorphism Zen** - Frosted glass, minimal, zen mode
5. **Retro Synthwave** - 80s vaporwave, VHS effects, chrome buttons

---

## After Choosing

Once you've picked your favorite:

1. Copy that variation's code into `src/App.tsx`
2. Delete the `src/design-lab/` folder
3. Clean up any unused imports
4. Deploy to Vercel!

Or keep the variation switcher for a multi-theme demo!

---

## Need Help?

See `VARIATIONS_GUIDE.md` for detailed comparison of each variation.
