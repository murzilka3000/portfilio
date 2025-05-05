import React, { useEffect, useRef, useState } from 'react';
import s from './HeroParticles.module.scss';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Particle {
  position: Vec3;
  velocity: Vec3;
  acceleration: Vec3;
  color: string;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface HeroParticlesProps {
  particleCount?: number;
  interactive?: boolean;
  starPoints?: number;
}

const HeroParticles: React.FC<HeroParticlesProps> = ({
  particleCount = 80,
  interactive = true,
  starPoints = 5 // Default to 5 points
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Vec3>({ x: 0, y: 0, z: 0 });
  const prevMouseRef = useRef<Vec3>({ x: 0, y: 0, z: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const colorPalette = ['#7B5AFF', '#00B8FF', '#3651FF', '#F868FF', '#6A3CFF'];

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle());
    return () => { particlesRef.current = []; };
  }, [dimensions, particleCount]);

  const createParticle = (fromMouse: boolean = false): Particle => {
    const position = fromMouse
      ? { ...mouseRef.current }
      : { x: Math.random() * dimensions.width, y: Math.random() * dimensions.height, z: Math.random() * 100 };
    const velocity = fromMouse
      ? { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10, z: (Math.random() - 0.5) * 5 }
      : { x: (Math.random() - 0.5) * 1, y: (Math.random() - 0.5) * 1, z: (Math.random() - 0.5) * 0.5 };
    return {
      position, velocity, acceleration: { x: 0, y: 0, z: 0 },
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      size: fromMouse ? Math.random() * 6 + 3 : Math.random() * 4.5 + 1.5,
      opacity: Math.random() * 0.5 + 0.3,
      life: 0,
      maxLife: fromMouse ? 50 + Math.random() * 30 : Infinity
    };
  };

  const drawStar = (
    ctx: CanvasRenderingContext2D, cx: number, cy: number,
    spikes: number, outerRadius: number, innerRadius: number,
    color: string, opacity: number
  ) => {
    
    outerRadius = Math.max(0.1, outerRadius);
    innerRadius = Math.max(0.1, innerRadius);
    if (innerRadius >= outerRadius) innerRadius = outerRadius * 0.4;

    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color.replace(/rgba?\((\d+,\s?\d+,\s?\d+)(?:,\s?[\d.]+)?\)/, `rgba($1, ${opacity})`);
    ctx.fill();
    ctx.restore();
  };


  useEffect(() => {
    if (!canvasRef.current || !dimensions.width || !dimensions.height) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        prevMouseRef.current = { ...mouseRef.current };
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, z: 0 };
        if (interactive) {
            const dx = mouseRef.current.x - prevMouseRef.current.x;
            const dy = mouseRef.current.y - prevMouseRef.current.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance > 5) {
                const particlesToAdd = Math.min(5, Math.floor(distance / 10));
                for (let i = 0; i < particlesToAdd; i++) particlesRef.current.push(createParticle(true));
            }
        }
    };
    const handleTouchMove = (e: TouchEvent) => {
        if (!containerRef.current || e.touches.length === 0) return;
        const rect = containerRef.current.getBoundingClientRect();
        prevMouseRef.current = { ...mouseRef.current };
        mouseRef.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top, z: 0 };
        if (interactive) {
             const dx = mouseRef.current.x - prevMouseRef.current.x;
            const dy = mouseRef.current.y - prevMouseRef.current.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance > 5) {
                const particlesToAdd = Math.min(5, Math.floor(distance / 10));
                for (let i = 0; i < particlesToAdd; i++) particlesRef.current.push(createParticle(true));
            }
        }
        e.preventDefault();
    };
    if (interactive) {
      containerRef.current?.addEventListener('mousemove', handleMouseMove);
      containerRef.current?.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const newParticles: Particle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += 1;
        if (p.life > p.maxLife) continue;

        if (p.maxLife < Infinity) {
          const lifeRatio = p.life / p.maxLife;
          p.opacity = Math.max(0, p.opacity * (1 - lifeRatio));
          p.size = Math.max(0.1, p.size * (1 - lifeRatio * 0.3));
        }

        const distanceToMouse = interactive ? distanceTo(p.position, mouseRef.current) : Infinity;
        if (interactive && distanceToMouse < 150) {
            const forceDirection = { x: p.position.x - mouseRef.current.x, y: p.position.y - mouseRef.current.y, z: p.position.z };
            const distance = Math.max(1, distanceToMouse);
            const forceMagnitude = 200 / (distance * distance);
            p.acceleration.x += normalize(forceDirection).x * forceMagnitude;
            p.acceleration.y += normalize(forceDirection).y * forceMagnitude;
        }
        p.acceleration.x += (Math.random() - 0.5) * 0.01;
        p.acceleration.y += (Math.random() - 0.5) * 0.01;
        p.acceleration.z += (Math.random() - 0.5) * 0.005;
        p.velocity.x += p.acceleration.x;
        p.velocity.y += p.acceleration.y;
        p.velocity.z += p.acceleration.z;
        const speed = Math.sqrt(p.velocity.x**2 + p.velocity.y**2 + p.velocity.z**2);
        const maxSpeed = p.maxLife < Infinity ? 5 : 1;
        if (speed > maxSpeed) {
            p.velocity.x = (p.velocity.x / speed) * maxSpeed;
            p.velocity.y = (p.velocity.y / speed) * maxSpeed;
            p.velocity.z = (p.velocity.z / speed) * maxSpeed;
        }
        p.velocity.x *= 0.99; p.velocity.y *= 0.99; p.velocity.z *= 0.99;
        p.acceleration.x = 0; p.acceleration.y = 0; p.acceleration.z = 0;
        p.position.x += p.velocity.x; p.position.y += p.velocity.y; p.position.z += p.velocity.z;
        if (p.position.x < -p.size) p.position.x = canvas.width + p.size; else if (p.position.x > canvas.width + p.size) p.position.x = -p.size;
        if (p.position.y < -p.size) p.position.y = canvas.height + p.size; else if (p.position.y > canvas.height + p.size) p.position.y = -p.size;


        // --- ЗАМЕНА КРУГА НА ЗВЕЗДУ ---
        if (p.opacity > 0 && p.size > 0.1) {
            const outerRadius = p.size;
            const innerRadius = outerRadius * 0.4;
            drawStar(
              ctx,
              p.position.x, p.position.y,
              starPoints,
              outerRadius, innerRadius,
              p.color, p.opacity
            );
        }
        // --- КОНЕЦ ЗАМЕНЫ ---


        // Рисуем свечение (ВРЕМЕННО ОТКЛЮЧЕНО ДЛЯ ДИАГНОСТИКИ)
        /*
        if (p.opacity > 0.1 && p.size > 0.5) {
            ctx.beginPath();
            const glowRadius = p.size * 2.5;
            const gradient = ctx.createRadialGradient(
              p.position.x, p.position.y, p.size * 0.1,
              p.position.x, p.position.y, glowRadius
            );
            gradient.addColorStop(0, p.color.replace(/rgba?\((\d+,\s?\d+,\s?\d+)(?:,\s?[\d.]+)?\)/, `rgba($1, ${p.opacity * 0.6})`));
            gradient.addColorStop(1, p.color.replace(/rgba?\((\d+,\s?\d+,\s?\d+)(?:,\s?[\d.]+)?\)/, `rgba($1, 0)`));
            ctx.fillStyle = gradient;
            ctx.arc(p.position.x, p.position.y, glowRadius, 0, Math.PI * 2);
            ctx.fill();
        }
        */

        // Рисуем связи
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (!p2 || p2.life > p2.maxLife) continue;
          const dx = p.position.x - p2.position.x; const dy = p.position.y - p2.position.y;
          const distance = Math.sqrt(dx*dx + dy*dy);
          if (distance < 80) {
            ctx.beginPath(); ctx.moveTo(p.position.x, p.position.y); ctx.lineTo(p2.position.x, p2.position.y);
            const linkOpacity = (1 - distance / 80) * Math.min(p.opacity, p2.opacity) * 0.8;
            if (linkOpacity > 0) {
                ctx.strokeStyle = `rgba(123, 90, 255, ${linkOpacity})`;
                ctx.lineWidth = Math.max(0.1, Math.min(p.size, p2.size) * 0.3);
                ctx.stroke();
            }
          }
        }

        newParticles.push(p);
      }

      particlesRef.current = newParticles;
      while (particlesRef.current.length < particleCount) particlesRef.current.push(createParticle());
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
      if (interactive && containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [dimensions, particleCount, interactive, starPoints]);

  const distanceTo = (a: Vec3, b: Vec3): number => {
    const dx = a.x - b.x; const dy = a.y - b.y; return Math.sqrt(dx*dx + dy*dy);
  };
  const normalize = (vector: Vec3): Vec3 => {
    const length = Math.sqrt(vector.x**2 + vector.y**2 + vector.z**2);
    if (length === 0) return { x: 0, y: 0, z: 0 };
    return { x: vector.x / length, y: vector.y / length, z: vector.z / length };
  };

  return (
    <div ref={containerRef} className={s.particleContainer}>
      <canvas ref={canvasRef} className={s.particleCanvas} />
    </div>
  );
};

export default HeroParticles;