import { useState } from 'react';
import { Variation1_Canvas } from './Variation1_Canvas';
import type { ExtendedMode, ParticleSettings } from './Variation1_CyberpunkTerminal';

const modes: Array<{ id: ExtendedMode; name: string; emoji: string; color: string }> = [
  { id: 'gravity', name: 'Gravity Orb', emoji: '🌟', color: 'bg-yellow-400' },
  { id: 'fireworks', name: 'Boom Boom', emoji: '🎆', color: 'bg-red-400' },
  { id: 'paint', name: 'Rainbow Paint', emoji: '🎨', color: 'bg-purple-400' },
  { id: 'repulsion', name: 'Force Field', emoji: '⚡', color: 'bg-blue-400' },
  { id: 'matrix', name: 'Code Rain', emoji: '💚', color: 'bg-green-400' },
  { id: 'glitch', name: 'Glitch Party', emoji: '✨', color: 'bg-pink-400' },
];

function Variation3_PlayfulArcade() {
  const [mode, setMode] = useState<ExtendedMode>('gravity');
  const [settings, setSettings] = useState<ParticleSettings>({
    count: 200,
    speed: 1,
    size: 3,
    glowIntensity: 15,
    trailLength: 0.2,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [fps, setFps] = useState(60);
  const [score, setScore] = useState(0);

  const updateSetting = (key: keyof ParticleSettings, value: number) => {
    setSettings({ ...settings, [key]: value });
  };

  const currentModeData = modes.find((m) => m.id === mode);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 relative">
      {/* Animated stars background */}
      <div className="fixed inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <Variation1_Canvas mode={mode} settings={settings} onFpsUpdate={setFps} />

      {/* Fun header */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10 text-center">
        <h1 className="text-5xl font-black text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-2">
          PARTICLE PARTY! 🎉
        </h1>
        <p className="text-white/90 text-lg font-bold drop-shadow-md">
          Choose your particle power!
        </p>
      </div>

      {/* Mode selector - pill buttons */}
      <div className="fixed top-36 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                setScore(score + 10);
              }}
              className={`
                px-6 py-4 rounded-full font-black text-white text-lg
                transition-all duration-200 shadow-xl
                ${m.color}
                ${
                  mode === m.id
                    ? 'scale-110 shadow-2xl'
                    : 'scale-100 hover:scale-105 opacity-80 hover:opacity-100'
                }
              `}
              style={{
                transform: mode === m.id ? 'translateY(-5px)' : 'translateY(0)',
              }}
            >
              <span className="text-2xl mr-2">{m.emoji}</span>
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Settings drawer - slides from right */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 z-20
                   ${showSettings ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-800">Controls 🎮</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="w-10 h-10 rounded-full bg-red-400 text-white font-bold hover:scale-110 transition-transform"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center justify-between text-gray-700 font-bold mb-2">
                <span>✨ How Many?</span>
                <span className="text-2xl">{settings.count}</span>
              </label>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={settings.count}
                onChange={(e) => updateSetting('count', Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-6
                         [&::-webkit-slider-thumb]:h-6
                         [&::-webkit-slider-thumb]:bg-white
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:shadow-lg
                         [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-webkit-slider-thumb]:border-4
                         [&::-webkit-slider-thumb]:border-purple-400"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-gray-700 font-bold mb-2">
                <span>⚡ Speed!</span>
                <span className="text-2xl">{settings.speed.toFixed(1)}x</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={settings.speed}
                onChange={(e) => updateSetting('speed', Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-6
                         [&::-webkit-slider-thumb]:h-6
                         [&::-webkit-slider-thumb]:bg-white
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:shadow-lg
                         [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-webkit-slider-thumb]:border-4
                         [&::-webkit-slider-thumb]:border-blue-400"
              />
            </div>

            <div>
              <label className="flex items-center justify-between text-gray-700 font-bold mb-2">
                <span>💫 Sparkle!</span>
                <span className="text-2xl">{settings.glowIntensity}</span>
              </label>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={settings.glowIntensity}
                onChange={(e) => updateSetting('glowIntensity', Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-6
                         [&::-webkit-slider-thumb]:h-6
                         [&::-webkit-slider-thumb]:bg-white
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:shadow-lg
                         [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-webkit-slider-thumb]:border-4
                         [&::-webkit-slider-thumb]:border-yellow-400"
              />
            </div>
          </div>

          {/* Fun stats */}
          <div className="mt-8 p-4 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl">
            <h3 className="font-black text-gray-800 mb-2">Your Stats! 📊</h3>
            <div className="space-y-1 text-sm font-bold text-gray-700">
              <div>Mode Switches: {score / 10}</div>
              <div>Particles: {settings.count}</div>
              <div>FPS: {fps}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Score counter - top right */}
      <div className="fixed top-6 right-6 bg-white rounded-2xl shadow-xl px-6 py-3 z-10">
        <div className="text-center">
          <div className="text-4xl font-black text-gray-800">{score}</div>
          <div className="text-xs font-bold text-gray-500">AWESOME POINTS!</div>
        </div>
      </div>

      {/* Settings toggle button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full font-black text-2xl
                   ${currentModeData?.color} text-white
                   shadow-2xl hover:scale-110 transition-all z-10 animate-bounce`}
      >
        ⚙️
      </button>

      {/* Fun bottom message */}
      <div className="fixed bottom-6 left-6 bg-white/90 backdrop-blur rounded-2xl px-6 py-3 shadow-xl z-10">
        <p className="font-black text-gray-800">
          {currentModeData?.emoji} {currentModeData?.name} Mode!
        </p>
        <p className="text-xs font-bold text-gray-500">Click around and have fun! 🎉</p>
      </div>
    </div>
  );
}

export default Variation3_PlayfulArcade;
