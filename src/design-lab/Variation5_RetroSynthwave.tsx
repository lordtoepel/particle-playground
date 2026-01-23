import { useState } from 'react';
import { Variation1_Canvas } from './Variation1_Canvas';
import type { ExtendedMode, ParticleSettings } from './Variation1_CyberpunkTerminal';

const modes: Array<{ id: ExtendedMode; name: string; icon: string }> = [
  { id: 'gravity', name: 'GRAVITY', icon: '▶' },
  { id: 'fireworks', name: 'BURST', icon: '◆' },
  { id: 'paint', name: 'FLOW', icon: '▼' },
  { id: 'repulsion', name: 'PUSH', icon: '◀' },
  { id: 'matrix', name: 'RAIN', icon: '▲' },
  { id: 'glitch', name: 'GLITCH', icon: '◈' },
];

function Variation5_RetroSynthwave() {
  const [mode, setMode] = useState<ExtendedMode>('gravity');
  const [settings, setSettings] = useState<ParticleSettings>({
    count: 200,
    speed: 1,
    size: 3,
    glowIntensity: 25,
    trailLength: 0.3,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [fps, setFps] = useState(60);
  const [vhsEffect, setVhsEffect] = useState(true);

  const updateSetting = (key: keyof ParticleSettings, value: number) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      {/* Retro grid background */}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(0deg, transparent 24%, rgba(255, 0, 255, 0.3) 25%, rgba(255, 0, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.3) 75%, rgba(0, 255, 255, 0.3) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255, 0, 255, 0.3) 25%, rgba(255, 0, 255, 0.3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.3) 75%, rgba(0, 255, 255, 0.3) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient sunset */}
      <div
        className="fixed inset-0 opacity-40"
        style={{
          background: 'linear-gradient(180deg, #000 0%, #2d1b4e 40%, #ff006e 70%, #ffd60a 100%)',
        }}
      />

      {/* VHS scanlines */}
      {vhsEffect && (
        <div className="fixed inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)] z-50" />
      )}

      <Variation1_Canvas mode={mode} settings={settings} onFpsUpdate={setFps} />

      {/* Retro header */}
      <div className="fixed top-0 left-0 right-0 z-10 py-6">
        <div className="text-center">
          <h1
            className="text-6xl font-black mb-2"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              background: 'linear-gradient(180deg, #ff00ff 0%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255,0,255,0.5), 0 0 40px rgba(0,255,255,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            PARTICLE WAVE
          </h1>
          <div className="text-purple-300 font-mono text-sm tracking-widest">
            ═══════ A E S T H E T I C ═══════
          </div>
        </div>
      </div>

      {/* Chrome-style mode selector */}
      <div className="fixed top-32 left-1/2 -translate-x-1/2 z-10">
        <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 border-4 border-purple-500 shadow-[0_0_30px_rgba(255,0,255,0.5)] p-1">
          <div className="grid grid-cols-3 gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`
                  relative px-8 py-4 font-mono font-bold text-sm tracking-wider
                  transition-all duration-200
                  ${
                    mode === m.id
                      ? 'bg-gradient-to-b from-purple-500 to-pink-500 text-white shadow-[inset_0_2px_10px_rgba(255,255,255,0.3)]'
                      : 'bg-gradient-to-b from-gray-700 to-gray-800 text-purple-300 hover:from-gray-600 hover:to-gray-700'
                  }
                `}
                style={{
                  boxShadow:
                    mode === m.id
                      ? 'inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(255,0,255,0.6)'
                      : 'inset 0 2px 0 rgba(255,255,255,0.1), inset 0 -2px 5px rgba(0,0,0,0.5)',
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{m.icon}</span>
                  <span>{m.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Chrome border effects */}
          <div className="absolute -top-1 -left-1 -right-1 h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="absolute -bottom-1 -left-1 -right-1 h-2 bg-gradient-to-r from-transparent via-black/50 to-transparent" />
        </div>
      </div>

      {/* Settings panel - retro computer style */}
      {showSettings && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 w-80 bg-gradient-to-b from-gray-900 to-black border-4 border-cyan-500 shadow-[0_0_40px_rgba(0,255,255,0.5)] z-10">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 border-b-2 border-black">
            <div className="font-mono font-bold text-white tracking-wider flex items-center justify-between">
              <span>⚙ SYSTEM CONFIG</span>
              <button
                onClick={() => setShowSettings(false)}
                className="text-white hover:text-black transition-colors"
              >
                [X]
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Particle Count */}
            <div>
              <div className="flex justify-between font-mono text-purple-300 text-sm mb-2">
                <span>&gt; PARTICLE.COUNT</span>
                <span className="text-cyan-300">{settings.count}</span>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30" />
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={settings.count}
                  onChange={(e) => updateSetting('count', Number(e.target.value))}
                  className="relative w-full h-4 bg-black border-2 border-purple-500 appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-6
                           [&::-webkit-slider-thumb]:h-6
                           [&::-webkit-slider-thumb]:bg-gradient-to-b
                           [&::-webkit-slider-thumb]:from-cyan-400
                           [&::-webkit-slider-thumb]:to-blue-500
                           [&::-webkit-slider-thumb]:border-2
                           [&::-webkit-slider-thumb]:border-white
                           [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(0,255,255,0.8)]
                           [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            </div>

            {/* Speed */}
            <div>
              <div className="flex justify-between font-mono text-purple-300 text-sm mb-2">
                <span>&gt; VELOCITY.MULT</span>
                <span className="text-cyan-300">{settings.speed.toFixed(2)}</span>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-30" />
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={settings.speed}
                  onChange={(e) => updateSetting('speed', Number(e.target.value))}
                  className="relative w-full h-4 bg-black border-2 border-pink-500 appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-6
                           [&::-webkit-slider-thumb]:h-6
                           [&::-webkit-slider-thumb]:bg-gradient-to-b
                           [&::-webkit-slider-thumb]:from-pink-400
                           [&::-webkit-slider-thumb]:to-purple-500
                           [&::-webkit-slider-thumb]:border-2
                           [&::-webkit-slider-thumb]:border-white
                           [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(255,0,255,0.8)]
                           [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            </div>

            {/* Glow */}
            <div>
              <div className="flex justify-between font-mono text-purple-300 text-sm mb-2">
                <span>&gt; GLOW.INTENSITY</span>
                <span className="text-cyan-300">{settings.glowIntensity}</span>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-30" />
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={settings.glowIntensity}
                  onChange={(e) => updateSetting('glowIntensity', Number(e.target.value))}
                  className="relative w-full h-4 bg-black border-2 border-cyan-500 appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-6
                           [&::-webkit-slider-thumb]:h-6
                           [&::-webkit-slider-thumb]:bg-gradient-to-b
                           [&::-webkit-slider-thumb]:from-yellow-400
                           [&::-webkit-slider-thumb]:to-orange-500
                           [&::-webkit-slider-thumb]:border-2
                           [&::-webkit-slider-thumb]:border-white
                           [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(255,255,0,0.8)]
                           [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            </div>

            {/* VHS Effect Toggle */}
            <div className="border-t-2 border-purple-500/30 pt-4">
              <button
                onClick={() => setVhsEffect(!vhsEffect)}
                className={`w-full py-3 font-mono font-bold tracking-wider transition-all
                         ${
                           vhsEffect
                             ? 'bg-gradient-to-b from-purple-500 to-pink-500 text-white'
                             : 'bg-gray-800 text-purple-300'
                         }`}
                style={{
                  boxShadow: vhsEffect
                    ? 'inset 0 2px 10px rgba(255,255,255,0.2), 0 0 20px rgba(255,0,255,0.5)'
                    : 'inset 0 2px 5px rgba(0,0,0,0.5)',
                }}
              >
                VHS EFFECT: {vhsEffect ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats display - retro computer readout */}
      <div className="fixed bottom-6 left-6 bg-black border-4 border-green-500 shadow-[0_0_30px_rgba(0,255,0,0.3)] font-mono text-green-400 p-4 z-10">
        <div className="text-xs space-y-1">
          <div>&gt; MODE: {mode.toUpperCase()}</div>
          <div>&gt; FPS: {fps}</div>
          <div>&gt; PARTICLES: {settings.count}</div>
          <div>&gt; STATUS: ACTIVE</div>
        </div>
      </div>

      {/* Settings toggle */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed bottom-6 right-6 px-8 py-4 font-mono font-bold text-lg bg-gradient-to-b from-cyan-500 to-blue-600 text-white border-4 border-white shadow-[0_0_30px_rgba(0,255,255,0.5)] hover:scale-105 transition-transform z-10"
        style={{
          boxShadow:
            'inset 0 2px 10px rgba(255,255,255,0.3), inset 0 -5px 10px rgba(0,0,0,0.5), 0 0 30px rgba(0,255,255,0.5)',
        }}
      >
        {showSettings ? '◀ HIDE' : 'CONFIG ▶'}
      </button>
    </div>
  );
}

export default Variation5_RetroSynthwave;
