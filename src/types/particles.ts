export type ParticleMode = 'gravity' | 'fireworks' | 'paint' | 'repulsion';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ModeConfig {
  name: string;
  description: string;
  color: string;
}
