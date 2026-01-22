import { useState } from 'react';
import { Canvas } from './components/Canvas';
import { ModeSelector } from './components/ModeSelector';
import { ParticleMode } from './types/particles';

function App() {
  const [mode, setMode] = useState<ParticleMode>('gravity');

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Canvas mode={mode} />
      <ModeSelector currentMode={mode} onModeChange={setMode} />

      <div className="fixed bottom-6 right-6 text-white/30 text-xs">
        <p>Made with React + Canvas API</p>
      </div>
    </div>
  );
}

export default App;
