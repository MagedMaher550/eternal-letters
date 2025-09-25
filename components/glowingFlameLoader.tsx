// components/BonfireLoader.tsx
"use client";

import { useEffect, useRef } from "react";

export default function BonfireLoader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = 200);
    const height = (canvas.height = 200);

    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      speedY: number;
      life: number;
    }[] = [];

    const colors = ["#fffa00", "#ff7700", "#ff2200", "#ff0000"];

    const spawnParticle = () => {
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 30,
        y: height - 10,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * -2 - 1,
        life: 100,
      });
    };

    const updateParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.y += p.speedY;
        p.life--;
        p.size *= 0.97;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0 || p.size <= 0.5) {
          particles.splice(i, 1);
        }
      });
    };

    const animate = () => {
      spawnParticle();
      updateParticles();
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex justify-center items-center h-64">
      <canvas ref={canvasRef} />
    </div>
  );
}
