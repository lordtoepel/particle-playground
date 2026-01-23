import { useRef, useEffect } from 'react';
import type { Particle, MousePosition } from '../types/particles';
import type { ExtendedMode, ParticleSettings } from './Variation1_CyberpunkTerminal';
import {
  createParticle,
  updateGravityParticle,
  updateFireworkParticle,
  updatePaintParticle,
  updateRepulsionParticle,
  createFireworkBurst,
  randomColor,
} from '../utils/physics';

interface CanvasProps {
  mode: ExtendedMode;
  settings: ParticleSettings;
  onFpsUpdate: (fps: number) => void;
}

// Matrix particle
interface MatrixParticle extends Particle {
  char: string;
  fadeSpeed: number;
}

export const Variation1_Canvas = ({ mode, settings, onFpsUpdate }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const matrixParticlesRef = useRef<MatrixParticle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const fpsRef = useRef({ frames: 0, lastTime: performance.now() });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const initParticles = () => {
      particlesRef.current = [];
      matrixParticlesRef.current = [];

      if (mode === 'matrix') {
        // Initialize matrix columns
        const columns = Math.floor(canvas.width / 20);
        for (let i = 0; i < columns; i++) {
          matrixParticlesRef.current.push({
            x: i * 20,
            y: Math.random() * canvas.height - canvas.height,
            vx: 0,
            vy: 2 + Math.random() * 3,
            size: 14,
            color: `rgba(0, 255, 65, ${0.8 + Math.random() * 0.2})`,
            alpha: 1,
            life: 1000,
            maxLife: 1000,
            char: String.fromCharCode(0x30A0 + Math.random() * 96),
            fadeSpeed: 0.02 + Math.random() * 0.03,
          });
        }
      } else if (mode === 'fireworks') {
        // Fireworks start with no particles
      } else {
        // Standard particle initialization
        const count = settings.count;
        for (let i = 0; i < count; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const vx = (Math.random() - 0.5) * 2;
          const vy = (Math.random() - 0.5) * 2;
          particlesRef.current.push(
            createParticle(x, y, vx, vy, randomColor(), settings.size, 1000)
          );
        }
      }
    };
    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      if (mode === 'paint') {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push(
            createParticle(
              e.clientX + (Math.random() - 0.5) * 20,
              e.clientY + (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 2,
              randomColor(),
              settings.size,
              150
            )
          );
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (mode === 'fireworks') {
        const colors = ['#00ff41', '#00d4ff', '#ff00ff', '#ffff00'];
        const burst = createFireworkBurst(e.clientX, e.clientY - 100, 50, colors);
        particlesRef.current.push(...burst);
      } else if (mode === 'gravity') {
        for (let i = 0; i < 30; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5;
          particlesRef.current.push(
            createParticle(
              e.clientX,
              e.clientY,
              Math.cos(angle) * speed,
              Math.sin(angle) * speed,
              randomColor(),
              settings.size,
              1000
            )
          );
        }
      } else if (mode === 'glitch') {
        // Spawn glitch particles
        for (let i = 0; i < 50; i++) {
          particlesRef.current.push(
            createParticle(
              e.clientX + (Math.random() - 0.5) * 100,
              e.clientY + (Math.random() - 0.5) * 100,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              Math.random() > 0.5 ? '#00ff41' : '#ff0080',
              settings.size * (0.5 + Math.random()),
              30 + Math.random() * 50
            )
          );
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    const animate = () => {
      // FPS calculation
      fpsRef.current.frames++;
      const now = performance.now();
      if (now >= fpsRef.current.lastTime + 1000) {
        onFpsUpdate(fpsRef.current.frames);
        fpsRef.current.frames = 0;
        fpsRef.current.lastTime = now;
      }

      // Clear with trail effect
      const alpha = mode === 'paint' ? settings.trailLength :
                    mode === 'matrix' ? 0.05 :
                    mode === 'glitch' ? 0.3 : 0.2;
      ctx.fillStyle = `rgba(10, 10, 30, ${alpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Matrix mode
      if (mode === 'matrix') {
        ctx.font = '14px monospace';
        matrixParticlesRef.current.forEach((particle) => {
          particle.y += particle.vy * settings.speed;

          if (particle.y > canvas.height + 20) {
            particle.y = -20;
            particle.char = String.fromCharCode(0x30A0 + Math.random() * 96);
          }

          ctx.save();
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = settings.glowIntensity;
          ctx.shadowColor = '#00ff41';
          ctx.fillText(particle.char, particle.x, particle.y);
          ctx.restore();

          particle.alpha = Math.max(0.3, particle.alpha - particle.fadeSpeed);
          if (Math.random() < 0.01) {
            particle.alpha = 1;
            particle.char = String.fromCharCode(0x30A0 + Math.random() * 96);
          }
        });
      }

      // Glitch mode
      if (mode === 'glitch') {
        // Random glitch spawns
        if (Math.random() < 0.05) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          for (let i = 0; i < 10; i++) {
            particlesRef.current.push(
              createParticle(
                x + (Math.random() - 0.5) * 50,
                y + (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                Math.random() > 0.5 ? '#00ff41' : '#ff0080',
                settings.size,
                20 + Math.random() * 30
              )
            );
          }
        }

        // Draw scanline glitch effect occasionally
        if (Math.random() < 0.1) {
          const y = Math.random() * canvas.height;
          ctx.fillStyle = 'rgba(0, 255, 65, 0.1)';
          ctx.fillRect(0, y, canvas.width, 2);
        }
      }

      // Update and draw standard particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        switch (mode) {
          case 'gravity':
            updateGravityParticle(particle, mouseRef.current);
            particle.vx *= settings.speed;
            particle.vy *= settings.speed;
            break;
          case 'fireworks':
            updateFireworkParticle(particle);
            break;
          case 'paint':
            updatePaintParticle(particle, mouseRef.current);
            break;
          case 'repulsion':
            updateRepulsionParticle(particle, mouseRef.current);
            break;
          case 'glitch':
            // Glitch particles teleport randomly
            if (Math.random() < 0.1) {
              particle.x += (Math.random() - 0.5) * 50;
              particle.y += (Math.random() - 0.5) * 50;
            }
            particle.x += particle.vx * settings.speed;
            particle.y += particle.vy * settings.speed;
            particle.vx *= 0.95;
            particle.vy *= 0.95;
            particle.life--;
            particle.alpha = particle.life / particle.maxLife;
            break;
        }

        if (
          particle.x < -50 ||
          particle.x > canvas.width + 50 ||
          particle.y < -50 ||
          particle.y > canvas.height + 50 ||
          particle.life <= 0
        ) {
          return false;
        }

        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = settings.glowIntensity;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      // Maintain particle count
      if (mode !== 'fireworks' && mode !== 'matrix' && mode !== 'glitch' && particlesRef.current.length < settings.count) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push(
          createParticle(x, y, 0, 0, randomColor(), settings.size, 1000)
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode, settings, onFpsUpdate]);

  return <canvas ref={canvasRef} className="fixed inset-0 bg-[#0a0a1e]" />;
};
