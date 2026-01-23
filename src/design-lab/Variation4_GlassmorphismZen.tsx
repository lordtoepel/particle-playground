import { useState } from 'react';
import { Variation1_Canvas } from './Variation1_Canvas';
import type { ExtendedMode, ParticleSettings } from './Variation1_CyberpunkTerminal';

const modes: Array<{ id: ExtendedMode; name: string; description: string }> = [
  { id: 'gravity', name: 'Orbit', description: 'Gentle attraction' },
  { id: 'fireworks', name: 'Burst', description: 'Celebrate life' },
  { id: 'paint', name: 'Flow', description: 'Liquid motion' },
  { id: 'repulsion', name: 'Push', description: 'Soft resistance' },
  { id: 'matrix', name: 'Rain', description: 'Digital zen' },
  { id: 'glitch', name: 'Shift', description: 'Embrace chaos' },
];

function Variation4_GlassmorphismZen() {
  const [mode, setMode] = useState<ExtendedMode>('gravity');
  const [settings, setSettings] = useState<ParticleSettings>({
    count: 200,
    speed: 1,
    size: 2.5,
    glowIntensity: 12,
    trailLength: 0.15,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [fps, setFps] = useState(60);
  const [zenMode, setZenMode] = useState(false);

  const updateSetting = (key: keyof ParticleSettings, value: number) => {
    setSettings({ ...settings, [key]: value });
  };

  const currentModeData = modes.find((m) => m.id === mode);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Subtle gradient orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      <Variation1_Canvas mode={mode} settings={settings} onFpsUpdate={setFps} />

      {/* Header - minimal and centered */}
      {!zenMode && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-10 text-center">
          <h1 className="text-2xl font-light text-white/90 tracking-wider mb-1">
            Particle Zen
          </h1>
          <p className="text-sm text-white/50">Find peace in motion</p>
        </div>
      )}

      {/* Mode selector - floating glass tabs */}
      {!zenMode && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-white/10 backdrop-blur-xl rounded-full p-2 border border-white/20 shadow-2xl">
            <div className="flex gap-2">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  title={m.description}
                  className={`
                    px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                    ${
                      mode === m.id
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                    }
                  `}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mode description */}
          <div className="text-center mt-3">
            <p className="text-sm text-white/40 font-light italic">
              {currentModeData?.description}
            </p>
          </div>
        </div>
      )}

      {/* Settings panel - minimal glass */}
      {showSettings && !zenMode && (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 w-72 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 overflow-hidden z-10 shadow-2xl">
          <div className="p-6">
            <h2 className="text-lg font-light text-white/90 mb-6">Parameters</h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-white/70 mb-3">
                  <span>Count</span>
                  <span className="font-medium text-white/90">{settings.count}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={settings.count}
                  onChange={(e) => updateSetting('count', Number(e.target.value))}
                  className="w-full h-0.5 bg-white/20 rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-3
                           [&::-webkit-slider-thumb]:h-3
                           [&::-webkit-slider-thumb]:bg-white
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:shadow-lg
                           [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-white/70 mb-3">
                  <span>Velocity</span>
                  <span className="font-medium text-white/90">{settings.speed.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={settings.speed}
                  onChange={(e) => updateSetting('speed', Number(e.target.value))}
                  className="w-full h-0.5 bg-white/20 rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-3
                           [&::-webkit-slider-thumb]:h-3
                           [&::-webkit-slider-thumb]:bg-white
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:shadow-lg
                           [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-white/70 mb-3">
                  <span>Luminance</span>
                  <span className="font-medium text-white/90">{settings.glowIntensity}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={settings.glowIntensity}
                  onChange={(e) => updateSetting('glowIntensity', Number(e.target.value))}
                  className="w-full h-0.5 bg-white/20 rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-3
                           [&::-webkit-slider-thumb]:h-3
                           [&::-webkit-slider-thumb]:bg-white
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:shadow-lg
                           [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-white/70 mb-3">
                  <span>Trail</span>
                  <span className="font-medium text-white/90">
                    {(settings.trailLength * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={settings.trailLength}
                  onChange={(e) => updateSetting('trailLength', Number(e.target.value))}
                  className="w-full h-0.5 bg-white/20 rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-3
                           [&::-webkit-slider-thumb]:h-3
                           [&::-webkit-slider-thumb]:bg-white
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:shadow-lg
                           [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Zen mode toggle */}
          <div className="border-t border-white/10 p-4">
            <button
              onClick={() => setZenMode(true)}
              className="w-full py-2 text-sm text-white/70 hover:text-white/90 transition-colors"
            >
              Enter zen mode
            </button>
          </div>
        </div>
      )}

      {/* Bottom controls */}
      {!zenMode && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-sm text-white/70 hover:text-white/90 transition-colors"
            >
              {showSettings ? 'Hide' : 'Settings'}
            </button>
            <div className="w-px h-4 bg-white/20" />
            <div className="text-xs text-white/50">
              {currentModeData?.name} • {fps} fps • {settings.count} particles
            </div>
          </div>
        </div>
      )}

      {/* Zen mode - minimal overlay */}
      {zenMode && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <button
            onClick={() => setZenMode(false)}
            className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/50 hover:text-white/90 transition-colors text-xs"
          >
            ✕
          </button>
          <div className="text-center text-white/30 font-light">
            <div className="text-6xl mb-4">∞</div>
            <p className="text-sm">Breathe. Observe. Be present.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Variation4_GlassmorphismZen;
