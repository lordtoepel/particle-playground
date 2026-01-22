import type { ParticleMode } from '../types/particles';

interface ModeSelectorProps {
  currentMode: ParticleMode;
  onModeChange: (mode: ParticleMode) => void;
}

const modes: Array<{ id: ParticleMode; name: string; description: string; icon: string }> = [
  {
    id: 'gravity',
    name: 'Gravity Well',
    description: 'Particles orbit your cursor',
    icon: '🌌',
  },
  {
    id: 'fireworks',
    name: 'Fireworks',
    description: 'Click to launch fireworks',
    icon: '🎆',
  },
  {
    id: 'paint',
    name: 'Paint Flow',
    description: 'Flowing liquid paint effect',
    icon: '🎨',
  },
  {
    id: 'repulsion',
    name: 'Repulsion Field',
    description: 'Push particles away',
    icon: '⚡',
  },
];

export const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-10">
      <div className="bg-black/40 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
        <div className="flex gap-3">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`
                px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                ${
                  currentMode === mode.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
              title={mode.description}
            >
              <span className="mr-2">{mode.icon}</span>
              {mode.name}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mt-4 text-white/50 text-sm">
        {modes.find((m) => m.id === currentMode)?.description}
      </div>
    </div>
  );
};
