"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
}

const STAR_COLORS = [
  "rgba(255, 255, 255, 1)",
  "rgba(180, 200, 255, 1)",
  "rgba(255, 220, 180, 1)",
  "rgba(220, 200, 255, 1)",
];

const NEBULA_COLORS = [
  "rgba(79, 142, 255, 0.18)",
  "rgba(140, 80, 255, 0.14)",
  "rgba(255, 100, 200, 0.10)",
  "rgba(80, 200, 255, 0.12)",
];

export default function GalaxyBackground({
  density = 1,
  showShootingStars = true,
}: {
  density?: number;
  showShootingStars?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let nebulae: Nebula[] = [];
    let shootingStars: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }> = [];

    const setupSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initStars = () => {
      const count = Math.floor((width * height) / 4500) * density;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.7 + 0.3,
        size: Math.random() * 1.5 + 0.3,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      }));
    };

    const initNebulae = () => {
      const count = 4;
      nebulae = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 300 + 200,
        color: NEBULA_COLORS[Math.floor(Math.random() * NEBULA_COLORS.length)],
        opacity: Math.random() * 0.4 + 0.3,
      }));
    };

    const spawnShootingStar = () => {
      const startX = Math.random() * width;
      const startY = Math.random() * height * 0.5;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.5;
      const speed = 8 + Math.random() * 4;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    };

    setupSize();
    initStars();
    initNebulae();

    let frame = 0;
    const animate = () => {
      // Background gradient (subtle)
      ctx.fillStyle = "#050818";
      ctx.fillRect(0, 0, width, height);

      // Nebulae (soft glowing clouds)
      for (const n of nebulae) {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Stars
      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
        const alpha = 0.4 + twinkle * 0.6;

        ctx.globalAlpha = alpha * star.z;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * star.z, 0, Math.PI * 2);
        ctx.fill();

        // Glow on bigger stars
        if (star.size > 1) {
          ctx.globalAlpha = alpha * star.z * 0.3;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * star.z * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Shooting stars
      if (showShootingStars && frame % 240 === 0 && Math.random() > 0.4) {
        spawnShootingStar();
      }

      shootingStars = shootingStars.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;

        const lifeRatio = s.life / s.maxLife;
        const alpha = lifeRatio < 0.3 ? lifeRatio / 0.3 : 1 - (lifeRatio - 0.3) / 0.7;

        // Draw trail
        const trailLength = 80;
        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * trailLength * 0.1,
          s.y - s.vy * trailLength * 0.1
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * trailLength * 0.1, s.y - s.vy * trailLength * 0.1);
        ctx.stroke();

        return s.life < s.maxLife && s.x < width + 100 && s.y < height + 100;
      });

      frame++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setupSize();
      initStars();
      initNebulae();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [density, showShootingStars]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
