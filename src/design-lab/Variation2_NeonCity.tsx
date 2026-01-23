import { useState } from 'react';
import { Variation1_Canvas } from './Variation1_Canvas';
import type { ExtendedMode, ParticleSettings } from './Variation1_CyberpunkTerminal';

const modes: Array<{ id: ExtendedMode; name: string; icon: string; color: string }> = [
  { id: 'gravity', name: 'Gravity', icon: '⬡', color: 'from-purple-500 to-pink-500' },
  { id: 'fireworks', name: 'Fireworks', icon: '⬢', color: 'from-cyan-500 to-blue-500' },
  { id: 'paint', name: 'Paint', icon: '⬣', color: 'from-pink-500 to-orange-500' },
  { id: 'repulsion', name: 'Repulsion', icon: '⬢', color: 'from-green-500 to-cyan-500' },
  { id: 'matrix', name: 'Matrix', icon: '⬡', color: 'from-green-400 to-emerald-500' },
  { id: 'glitch', name: 'Glitch', icon: '⬣', color: 'from-red-500 to-purple-500' },
];

function Variation2_NeonCity() {
  const [mode, setMode] = useState<ExtendedMode>('gravity');
  const [settings, setSettings] = useState<ParticleSettings>({
    count: 200,
    speed: 1,
    size: 3,
    glowIntensity: 20,
    trailLength: 0.2,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [fps, setFps] = useState(60);

  const updateSetting = (key: keyof ParticleSettings, value: number) => {
    setSettings({ ...settings, [key]: value });
  };

  const currentModeData = modes.find((m) => m.id === mode);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-black to-cyan-900 relative">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_50px,rgba(168,85,247,0.4)_50px,rgba(168,85,247,0.4)_51px),repeating-linear-gradient(90deg,transparent,transparent_50px,rgba(6,182,212,0.4)_50px,rgba(6,182,212,0.4)_51px)]" />

      <Variation1_Canvas mode={mode} settings={settings} onFpsUpdate={setFps} />

      {/* Hexagonal mode selector */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-10">
        <div className="relative">
          {/* Title */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              NEON PARTICLE LAB
            </h1>
          </div>

          {/* Hexagonal grid */}
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`
                  relative w-32 h-32 flex flex-col items-center justify-center
                  transition-all duration-300 group
                  ${mode === m.id ? 'scale-110' : 'scale-100 hover:scale-105'}
                `}
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${m.color} ${
                    mode === m.id ? 'opacity-100' : 'opacity-50 group-hover:opacity-70'
                  }`}
                  style={{
                    boxShadow: mode === m.id ? '0 0 40px rgba(168, 85, 247, 0.6)' : 'none',
                  }}
                />
                <div className="relative z-10 text-white text-center">
                  <div className="text-4xl mb-1">{m.icon}</div>
                  <div className="text-xs font-bold uppercase">{m.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating settings panel */}
      {showSettings && (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 w-80 bg-black/40 backdrop-blur-xl border border-purple-500/50 rounded-2xl overflow-hidden z-10 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Controls
            </h2>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-purple-200 mb-2">
                  <span>Particles</span>
                  <span>{settings.count}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={settings.count}
                  onChange={(e) => updateSetting('count', Number(e.target.value))}
                  className="w-full h-2 bg-purple-900/50 rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-4
                           [&::-webkit-slider-thumb]:h-4
                           [&::-webkit-slider-thumb]:bg-gradient-to-r
                           [&::-webkit-slider-thumb]:from-purple-500
                           [&::-webkit-slider-thumb]:to-pink-500
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(168,85,247,0.8)]
                           [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-cyan-200 mb-2">
                  <span>Speed</span>
                  <span>{settings.speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={settings.speed}
                  onChange={(e) => updateSetting('speed', Number(e.target.value))}
                  className="w-full h-2 bg-cyan-900/50 rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-4
                           [&::-webkit-slider-thumb]:h-4
                           [&::-webkit-slider-thumb]:bg-gradient-to-r
                           [&::-webkit-slider-thumb]:from-cyan-500
                           [&::-webkit-slider-thumb]:to-blue-500
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(6,182,212,0.8)]
                           [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-pink-200 mb-2">
                  <span>Glow</span>
                  <span>{settings.glowIntensity}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={settings.glowIntensity}
                  onChange={(e) => updateSetting('glowIntensity', Number(e.target.value))}
                  className="w-full h-2 bg-pink-900/50 rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-4
                           [&::-webkit-slider-thumb]:h-4
                           [&::-webkit-slider-thumb]:bg-gradient-to-r
                           [&::-webkit-slider-thumb]:from-pink-500
                           [&::-webkit-slider-thumb]:to-orange-500
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(236,72,153,0.8)]
                           [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats display - bottom right */}
      <div className="fixed bottom-6 right-6 bg-black/40 backdrop-blur-xl border border-cyan-500/50 rounded-xl px-6 py-4 z-10">
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span className="text-cyan-200">
              {mode.toUpperCase()} • {fps} FPS
            </span>
          </div>
          <div className="text-cyan-300/70 text-xs">{settings.count} particles</div>
        </div>
      </div>

      {/* Settings toggle */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`fixed bottom-6 left-6 px-6 py-3 rounded-full font-bold text-white
                   bg-gradient-to-r ${currentModeData?.color}
                   shadow-[0_0_30px_rgba(168,85,247,0.5)]
                   hover:scale-105 transition-transform z-10`}
      >
        {showSettings ? '✕ Close' : '⚙ Settings'}
      </button>
    </div>
  );
}

export default Variation2_NeonCity;
