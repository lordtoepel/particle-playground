import type { Particle, MousePosition } from '../types/particles';

export const createParticle = (
  x: number,
  y: number,
  vx: number,
  vy: number,
  color: string,
  size = 3,
  life = 100
): Particle => ({
  x,
  y,
  vx,
  vy,
  size,
  color,
  alpha: 1,
  life,
  maxLife: life,
});

export const updateGravityParticle = (
  particle: Particle,
  mouse: MousePosition
): void => {
  const dx = mouse.x - particle.x;
  const dy = mouse.y - particle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1) {
    const force = 0.5;
    const angle = Math.atan2(dy, dx);
    particle.vx += Math.cos(angle) * force;
    particle.vy += Math.sin(angle) * force;
  }

  particle.vx *= 0.95;
  particle.vy *= 0.95;
  particle.x += particle.vx;
  particle.y += particle.vy;
};

export const updateFireworkParticle = (particle: Particle): void => {
  particle.vy += 0.2; // gravity
  particle.x += particle.vx;
  particle.y += particle.vy;
  particle.vx *= 0.99;
  particle.vy *= 0.99;

  particle.life--;
  particle.alpha = particle.life / particle.maxLife;
};

export const updatePaintParticle = (
  particle: Particle,
  mouse: MousePosition
): void => {
  const dx = mouse.x - particle.x;
  const dy = mouse.y - particle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1) {
    const speed = 0.05;
    particle.vx += dx * speed;
    particle.vy += dy * speed;
  }

  particle.vx *= 0.9;
  particle.vy *= 0.9;
  particle.x += particle.vx;
  particle.y += particle.vy;

  particle.life--;
  particle.alpha = Math.min(particle.life / particle.maxLife, 0.8);
};

export const updateRepulsionParticle = (
  particle: Particle,
  mouse: MousePosition
): void => {
  const dx = mouse.x - particle.x;
  const dy = mouse.y - particle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 150 && distance > 0) {
    const force = (150 - distance) / 150;
    const angle = Math.atan2(dy, dx);
    particle.vx -= Math.cos(angle) * force * 2;
    particle.vy -= Math.sin(angle) * force * 2;
  }

  // Drift back slowly
  particle.vx *= 0.95;
  particle.vy *= 0.95;
  particle.x += particle.vx;
  particle.y += particle.vy;
};

export const createFireworkBurst = (
  x: number,
  y: number,
  count: number,
  colors: string[]
): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 2 + Math.random() * 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(
      createParticle(
        x,
        y,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed - 5, // Initial upward velocity
        color,
        2 + Math.random() * 2,
        60 + Math.random() * 40
      )
    );
  }
  return particles;
};

export const randomColor = (): string => {
  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7d794',
    '#ff6348', '#1dd1a1', '#ee5a6f', '#c7ecee'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
