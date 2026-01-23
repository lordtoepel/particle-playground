/**
 * Design Lab - Variation Switcher
 *
 * Import this in src/App.tsx to preview variations:
 *
 * import DesignLab from './design-lab';
 *
 * function App() {
 *   return <DesignLab />;
 * }
 */

import { useState } from 'react';
import Variation1_CyberpunkTerminal from './Variation1_CyberpunkTerminal';
import Variation2_NeonCity from './Variation2_NeonCity';
import Variation3_PlayfulArcade from './Variation3_PlayfulArcade';
import Variation4_GlassmorphismZen from './Variation4_GlassmorphismZen';
import Variation5_RetroSynthwave from './Variation5_RetroSynthwave';

const variations = [
  { id: 1, name: 'Cyberpunk Terminal', component: Variation1_CyberpunkTerminal, color: 'from-green-500 to-emerald-500' },
  { id: 2, name: 'Neon City', component: Variation2_NeonCity, color: 'from-purple-500 to-pink-500' },
  { id: 3, name: 'Playful Arcade', component: Variation3_PlayfulArcade, color: 'from-yellow-500 to-orange-500' },
  { id: 4, name: 'Glassmorphism Zen', component: Variation4_GlassmorphismZen, color: 'from-blue-500 to-cyan-500' },
  { id: 5, name: 'Retro Synthwave', component: Variation5_RetroSynthwave, color: 'from-pink-500 to-purple-500' },
];

function DesignLab() {
  const [currentVariation, setCurrentVariation] = useState(1);
  const [showMenu, setShowMenu] = useState(true);

  const CurrentComponent = variations.find((v) => v.id === currentVariation)?.component || Variation1_CyberpunkTerminal;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Current variation */}
      <CurrentComponent />

      {/* Variation switcher overlay */}
      {showMenu && (
        <div className="fixed top-4 left-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-4 z-[100] shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">Design Lab</h3>
            <button
              onClick={() => setShowMenu(false)}
              className="text-white/50 hover:text-white text-xs"
            >
              Hide
            </button>
          </div>

          <div className="space-y-2">
            {variations.map((variation) => (
              <button
                key={variation.id}
                onClick={() => setCurrentVariation(variation.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium
                  ${
                    currentVariation === variation.id
                      ? `bg-gradient-to-r ${variation.color} text-white shadow-lg`
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="text-xs opacity-50">#{variation.id}</div>
                  <div>{variation.name}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white/50 text-xs">
              Press any button to switch variations
            </p>
          </div>
        </div>
      )}

      {/* Show menu button when hidden */}
      {!showMenu && (
        <button
          onClick={() => setShowMenu(true)}
          className="fixed top-4 left-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-2 text-white/70 hover:text-white text-sm z-[100]"
        >
          Design Lab Menu
        </button>
      )}

      {/* Keyboard shortcuts hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 text-white/50 text-xs z-[100]">
        Use number keys 1-5 to switch variations
      </div>
    </div>
  );
}

export default DesignLab;
