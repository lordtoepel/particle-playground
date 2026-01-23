# 🎨 Design Lab - Particle Playground Variations

This directory contains 5 distinct design variations for the Particle Playground enhancement.

## How to Preview

Each variation is a complete implementation. To preview:

1. Import the variation in `src/App.tsx`
2. Replace the current `<App>` with the variation component
3. Start dev server: `npm run dev`

## The Variations

### 1. Cyberpunk Terminal 🖥️
**Style:** Dark matrix green, scan lines, terminal fonts, glowing borders
- Mode selector: Horizontal terminal-style tabs with scan line effects
- Settings: Collapsible side panel with monospace labels and glowing sliders
- New modes: Matrix Rain + Glitch/Corruption with green/cyan themes
- Interactive: FPS counter, particle count readout, system stats

### 2. Neon City ⚡
**Style:** Vibrant neon (purple/pink/cyan), hexagonal buttons, electric glow
- Mode selector: Hexagonal grid buttons with electric glow on hover
- Settings: Floating glass panel with neon-trimmed sliders
- New modes: Matrix Rain + Glitch with multi-color neon effects
- Interactive: Glow intensity toggle, trail effects, color cycle

### 3. Playful Arcade 🎮
**Style:** Bright colors, rounded pills, bouncy animations, game UI
- Mode selector: Colorful rounded pills with bounce on click
- Settings: Side drawer with chunky sliders and fun icons
- New modes: Rainbow matrix rain + sparkly glitch effects
- Interactive: Score counter, combo effects, achievement badges

### 4. Glassmorphism Zen 🌊
**Style:** Frosted glass, soft shadows, minimal, elegant
- Mode selector: Floating frosted glass tabs with smooth transitions
- Settings: Minimal glass panel with refined controls
- New modes: Subtle matrix rain + smooth glitch transitions
- Interactive: Minimalist stats, zen mode toggle

### 5. Retro Synthwave 🌆
**Style:** Purple/pink gradients, 80s aesthetic, grid backgrounds
- Mode selector: Gradient buttons with chrome effects
- Settings: Synthwave-themed panel with retro sliders
- New modes: Purple matrix rain + vaporwave glitch
- Interactive: Retro grid overlay, VHS effects toggle

## Files

Each variation includes:
- `VariationN.tsx` - Complete app component
- `VariationN_ModeSelector.tsx` - Custom mode selector
- `VariationN_SettingsPanel.tsx` - Settings panel component
- `VariationN_Canvas.tsx` - Enhanced canvas with new modes
- `VariationN_styles.css` - Custom styles (if needed)

## Cleanup

When design is finalized, delete this entire `design-lab` directory.
