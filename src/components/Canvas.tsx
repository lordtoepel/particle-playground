import { useRef, useEffect } from 'react';
import type { Particle, ParticleMode, MousePosition } from '../types/particles';
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
  mode: ParticleMode;
}

export const Canvas = ({ mode }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles based on mode
    const initParticles = () => {
      particlesRef.current = [];
      const count = mode === 'fireworks' ? 0 : 200;

      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = (Math.random() - 0.5) * 2;
        const vy = (Math.random() - 0.5) * 2;
        particlesRef.current.push(
          createParticle(x, y, vx, vy, randomColor(), 2 + Math.random() * 2, 1000)
        );
      }
    };
    initParticles();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add paint particles on mouse move
      if (mode === 'paint') {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push(
            createParticle(
              e.clientX + (Math.random() - 0.5) * 20,
              e.clientY + (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 2,
              randomColor(),
              3,
              150
            )
          );
        }
      }
    };

    // Mouse click handler
    const handleClick = (e: MouseEvent) => {
      if (mode === 'fireworks') {
        // Launch firework
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7d794', '#ff6348'];
        const burst = createFireworkBurst(e.clientX, e.clientY - 100, 50, colors);
        particlesRef.current.push(...burst);
      } else if (mode === 'gravity') {
        // Spawn burst of particles
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
              2 + Math.random() * 3,
              1000
            )
          );
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = mode === 'paint' ? 'rgba(10, 10, 30, 0.1)' : 'rgba(10, 10, 30, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update based on mode
        switch (mode) {
          case 'gravity':
            updateGravityParticle(particle, mouseRef.current);
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
        }

        // Remove particles that are out of bounds or dead
        if (
          particle.x < -50 ||
          particle.x > canvas.width + 50 ||
          particle.y < -50 ||
          particle.y > canvas.height + 50 ||
          particle.life <= 0
        ) {
          return false;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      // Maintain particle count for non-firework modes
      if (mode !== 'fireworks' && particlesRef.current.length < 200) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push(
          createParticle(x, y, 0, 0, randomColor(), 2, 1000)
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
  }, [mode]);

  return <canvas ref={canvasRef} className="fixed inset-0 bg-[#0a0a1e]" />;
};
