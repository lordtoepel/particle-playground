import type { ExtendedMode } from './Variation1_CyberpunkTerminal';

interface ModeSelectorProps {
  currentMode: ExtendedMode;
  onModeChange: (mode: ExtendedMode) => void;
}

const modes: Array<{ id: ExtendedMode; name: string; symbol: string }> = [
  { id: 'gravity', name: 'GRAVITY_WELL', symbol: '◉' },
  { id: 'fireworks', name: 'FIREWORKS', symbol: '✦' },
  { id: 'paint', name: 'PAINT_FLOW', symbol: '▓' },
  { id: 'repulsion', name: 'REPULSION', symbol: '◈' },
  { id: 'matrix', name: 'MATRIX_RAIN', symbol: '█' },
  { id: 'glitch', name: 'GLITCH_MODE', symbol: '▒' },
];

export const Variation1_ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10">
      <div className="bg-black/90 border-2 border-green-500/50 font-mono">
        {/* Header */}
        <div className="border-b-2 border-green-500/50 px-4 py-2 text-green-400 text-xs">
          <span className="text-green-500/50">&gt;</span> MODE_SELECT
        </div>

        {/* Mode buttons */}
        <div className="grid grid-cols-3 gap-px bg-green-500/20 p-px">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`
                px-4 py-3 text-xs font-mono transition-all relative
                ${
                  currentMode === mode.id
                    ? 'bg-green-500/20 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                    : 'bg-black text-green-500/70 hover:bg-green-500/10 hover:text-green-400'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{mode.symbol}</span>
                <span>{mode.name}</span>
              </div>

              {/* Active indicator */}
              {currentMode === mode.id && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Footer with mode description */}
        <div className="border-t-2 border-green-500/50 px-4 py-2 text-green-500/50 text-xs">
          {currentMode === 'gravity' && 'Orbital attraction field'}
          {currentMode === 'fireworks' && 'Click to deploy payload'}
          {currentMode === 'paint' && 'Liquid particle stream'}
          {currentMode === 'repulsion' && 'Electromagnetic field'}
          {currentMode === 'matrix' && 'Digital cascade protocol'}
          {currentMode === 'glitch' && 'Corruption simulation'}
        </div>
      </div>
    </div>
  );
};
