import { useEffect, useRef } from 'react';

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
  kind: 'cloud' | 'mote';
}

interface DustCloudEffectProps {
  /** Progresso normalizado do scroll no Hero (0 a 1) para dispersao sutil da poeira */
  scrollProgress?: number;
}

function createParticles(width: number, height: number): DustParticle[] {
  const particles: DustParticle[] = [];
  const cloudCount = 34;
  const moteCount = 30;

  for (let i = 0; i < cloudCount; i += 1) {
    // Concentra a nuvem de poeira na metade inferior e ao redor do eixo central da maquina
    const centerBias = 0.2 + Math.random() * 0.65;
    particles.push({
      x: width * centerBias,
      y: height * (0.42 + Math.random() * 0.56),
      radius: 36 + Math.random() * 76,
      vx: 0.14 + Math.random() * 0.28,
      vy: -(0.06 + Math.random() * 0.16),
      alpha: 0.035 + Math.random() * 0.065,
      phase: Math.random() * Math.PI * 2,
      kind: 'cloud',
    });
  }

  for (let i = 0; i < moteCount; i += 1) {
    particles.push({
      x: Math.random() * width,
      y: height * (0.25 + Math.random() * 0.72),
      radius: 1.2 + Math.random() * 2.2,
      vx: 0.2 + Math.random() * 0.45,
      vy: -(0.12 + Math.random() * 0.26),
      alpha: 0.14 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      kind: 'mote',
    });
  }

  return particles;
}

export function DustCloudEffect({ scrollProgress = 0 }: DustCloudEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = canvas.clientWidth || 1200;
    let height = canvas.clientHeight || 680;
    let particles = createParticles(width, height);
    let rafId = 0;
    let frame = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth || 1200;
      height = canvas.clientHeight || 680;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
    };

    resizeCanvas();

    const drawFrame = (animate: boolean) => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);
      const liftOffset = scrollRef.current * 28;

      for (const p of particles) {
        if (animate) {
          p.x += p.vx + Math.sin(frame * 0.012 + p.phase) * 0.14;
          p.y += p.vy;

          if (p.x - p.radius > width) p.x = -p.radius;
          if (p.y + p.radius < height * 0.12) {
            p.y = height * (0.85 + Math.random() * 0.18);
            p.x = width * (0.15 + Math.random() * 0.72);
          }
        }

        const drawY = p.y - liftOffset * (p.kind === 'cloud' ? 0.8 : 1.15);

        if (p.kind === 'cloud') {
          const grad = ctx.createRadialGradient(p.x, drawY, 0, p.x, drawY, p.radius);
          grad.addColorStop(0, `rgba(176, 141, 90, ${p.alpha})`);
          grad.addColorStop(0.55, `rgba(194, 162, 114, ${p.alpha * 0.45})`);
          grad.addColorStop(1, 'rgba(194, 162, 114, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, drawY, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(154, 120, 74, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, drawY, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    if (prefersReducedMotion) {
      drawFrame(false);
    } else {
      const loop = () => {
        drawFrame(true);
        rafId = window.requestAnimationFrame(loop);
      };
      rafId = window.requestAnimationFrame(loop);
    }

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => resizeCanvas())
        : null;
    observer?.observe(canvas);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Bruma sutil de solo em tons terrosos quentes sob a maquina */}
      <div
        className="absolute inset-x-0 bottom-0 h-[62%] opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 58% 48% at 52% 76%, rgba(186, 150, 96, 0.22) 0%, rgba(186, 150, 96, 0.08) 48%, rgba(242, 243, 245, 0) 78%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-4 h-[42%] opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 36% 32% at 44% 82%, rgba(161, 126, 78, 0.16) 0%, rgba(242, 243, 245, 0) 74%)',
        }}
      />
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

