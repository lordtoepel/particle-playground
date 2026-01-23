import type { ParticleSettings } from './Variation1_CyberpunkTerminal';

interface SettingsPanelProps {
  settings: ParticleSettings;
  onSettingsChange: (settings: ParticleSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Variation1_SettingsPanel = ({
  settings,
  onSettingsChange,
  isOpen,
}: SettingsPanelProps) => {
  const updateSetting = (key: keyof ParticleSettings, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 w-80 bg-black/90 border-2 border-green-500/50 font-mono text-green-400 z-10">
      {/* Header */}
      <div className="border-b-2 border-green-500/50 px-4 py-3">
        <div className="text-xs text-green-500/50">&gt; PARTICLE_CONFIG</div>
        <div className="text-sm mt-1">SYSTEM PARAMETERS</div>
      </div>

      {/* Settings */}
      <div className="p-4 space-y-4">
        {/* Particle Count */}
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-green-500/50">COUNT:</span>
            <span className="text-green-300">{settings.count}</span>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={settings.count}
            onChange={(e) => updateSetting('count', Number(e.target.value))}
            className="w-full h-1 bg-green-900/30 appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-3
                     [&::-webkit-slider-thumb]:h-3
                     [&::-webkit-slider-thumb]:bg-green-400
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,197,94,0.8)]
                     [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        {/* Speed */}
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-green-500/50">SPEED:</span>
            <span className="text-green-300">{settings.speed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={settings.speed}
            onChange={(e) => updateSetting('speed', Number(e.target.value))}
            className="w-full h-1 bg-green-900/30 appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-3
                     [&::-webkit-slider-thumb]:h-3
                     [&::-webkit-slider-thumb]:bg-green-400
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,197,94,0.8)]
                     [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        {/* Particle Size */}
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-green-500/50">SIZE:</span>
            <span className="text-green-300">{settings.size.toFixed(1)}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            step="0.5"
            value={settings.size}
            onChange={(e) => updateSetting('size', Number(e.target.value))}
            className="w-full h-1 bg-green-900/30 appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-3
                     [&::-webkit-slider-thumb]:h-3
                     [&::-webkit-slider-thumb]:bg-green-400
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,197,94,0.8)]
                     [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        {/* Glow Intensity */}
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-green-500/50">GLOW:</span>
            <span className="text-green-300">{settings.glowIntensity}</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={settings.glowIntensity}
            onChange={(e) => updateSetting('glowIntensity', Number(e.target.value))}
            className="w-full h-1 bg-green-900/30 appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-3
                     [&::-webkit-slider-thumb]:h-3
                     [&::-webkit-slider-thumb]:bg-green-400
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,197,94,0.8)]
                     [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        {/* Trail Length */}
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-green-500/50">TRAIL:</span>
            <span className="text-green-300">{(settings.trailLength * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.trailLength}
            onChange={(e) => updateSetting('trailLength', Number(e.target.value))}
            className="w-full h-1 bg-green-900/30 appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-3
                     [&::-webkit-slider-thumb]:h-3
                     [&::-webkit-slider-thumb]:bg-green-400
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,197,94,0.8)]
                     [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-green-500/50 px-4 py-2 text-xs text-green-500/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 animate-pulse" />
          LIVE_UPDATE
        </div>
      </div>
    </div>
  );
};
