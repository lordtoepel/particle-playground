import { useState } from 'react';
import { Variation1_Canvas } from './Variation1_Canvas';
import { Variation1_ModeSelector } from './Variation1_ModeSelector';
import { Variation1_SettingsPanel } from './Variation1_SettingsPanel';
import type { ParticleMode } from '../types/particles';

export type ExtendedMode = ParticleMode | 'matrix' | 'glitch';

export interface ParticleSettings {
  count: number;
  speed: number;
  size: number;
  glowIntensity: number;
  trailLength: number;
}

function Variation1_CyberpunkTerminal() {
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

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      {/* Scan lines overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.03)_2px,rgba(0,255,0,0.03)_4px)] z-50" />

      {/* Canvas */}
      <Variation1_Canvas
        mode={mode}
        settings={settings}
        onFpsUpdate={setFps}
      />

      {/* Mode Selector */}
      <Variation1_ModeSelector
        currentMode={mode}
        onModeChange={setMode}
      />

      {/* Settings Panel */}
      <Variation1_SettingsPanel
        settings={settings}
        onSettingsChange={setSettings}
        isOpen={showSettings}
        onToggle={() => setShowSettings(!showSettings)}
      />

      {/* System Stats - Bottom Left */}
      <div className="fixed bottom-4 left-4 font-mono text-xs z-10">
        <div className="bg-black/80 border border-green-500/30 p-3 space-y-1">
          <div className="text-green-400">
            <span className="text-green-500/50">SYSTEM/</span> ACTIVE
          </div>
          <div className="text-green-400">
            <span className="text-green-500/50">FPS:</span> {fps}
          </div>
          <div className="text-green-400">
            <span className="text-green-500/50">PARTICLES:</span> {settings.count}
          </div>
          <div className="text-green-400">
            <span className="text-green-500/50">MODE:</span> {mode.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Settings Toggle - Bottom Right */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed bottom-4 right-4 bg-black/80 border border-green-500/50 text-green-400 px-4 py-2 font-mono text-sm hover:bg-green-500/10 hover:border-green-400 transition-all z-10"
      >
        {showSettings ? '[HIDE]' : '[SETTINGS]'}
      </button>

      {/* Corner brackets decoration */}
      <div className="fixed top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-green-500/30 pointer-events-none" />
      <div className="fixed top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-green-500/30 pointer-events-none" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-green-500/30 pointer-events-none" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-green-500/30 pointer-events-none" />
    </div>
  );
}

export default Variation1_CyberpunkTerminal;
