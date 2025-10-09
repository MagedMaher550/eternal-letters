"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/contexts/settings-context";

export function EffectsRenderer() {
  const { settings, isMobile } = useSettings();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorTrailRef = useRef<{ x: number; y: number; life: number }[]>([]);

  const shouldRenderCursorTrail = settings.cursorTrail && !isMobile;

  const particleCount = isMobile ? 20 : 50;

  const animationSpeed = settings.reducedMotion ? 0.3 : 1;

  const backgroundIntensity = isMobile ? 0.5 : 1;

  useEffect(() => {
    if (settings.runeSeals && !isMobile) {
      document.documentElement.setAttribute("data-rune-seals", "true");
    } else {
      document.documentElement.removeAttribute("data-rune-seals");
    }
  }, [settings.runeSeals, isMobile]);

  useEffect(() => {
    if (!settings.particleEffects || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5 * animationSpeed,
        vy: (Math.random() - 0.5) * 0.5 * animationSpeed,
        life: Math.random(),
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.002 * animationSpeed;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (p.life > 1) p.life = 0;

        const alpha = Math.sin(p.life * Math.PI) * 0.3;
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [settings.particleEffects, particleCount, animationSpeed]);

  useEffect(() => {
    if (!shouldRenderCursorTrail || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      cursorTrailRef.current.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (cursorTrailRef.current.length > 20) {
        cursorTrailRef.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cursorTrailRef.current = cursorTrailRef.current.filter((point) => {
        point.life -= 0.05 * animationSpeed;
        return point.life > 0;
      });

      cursorTrailRef.current.forEach((point) => {
        const size = point.life * 8;
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          size
        );
        gradient.addColorStop(0, `rgba(251, 191, 36, ${point.life * 0.8})`);
        gradient.addColorStop(1, `rgba(251, 146, 60, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [shouldRenderCursorTrail, animationSpeed]);

  useEffect(() => {
    if (!canvasRef.current || settings.dynamicBackground === "none") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;

    if (settings.dynamicBackground === "embers") {
      const embers: { x: number; y: number; vy: number; life: number }[] = [];
      const emberCount = isMobile ? 15 : 30;

      for (let i = 0; i < emberCount; i++) {
        embers.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 100,
          vy: (-0.5 - Math.random() * 0.5) * animationSpeed,
          life: Math.random(),
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        embers.forEach((ember) => {
          ember.y += ember.vy;
          ember.life += 0.005 * animationSpeed;

          if (ember.y < -10) {
            ember.y = canvas.height + 10;
            ember.x = Math.random() * canvas.width;
            ember.life = 0;
          }

          const alpha =
            (Math.sin(ember.life * Math.PI * 2) * 0.5 + 0.3) *
            backgroundIntensity;
          ctx.fillStyle = `rgba(251, 146, 60, ${alpha})`;
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();
    } else if (settings.dynamicBackground === "fog") {
      let offset = 0;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        offset += 0.2 * animationSpeed;

        for (let i = 0; i < 3; i++) {
          const y = (offset + i * 200) % canvas.height;
          const gradient = ctx.createLinearGradient(0, y - 100, 0, y + 100);
          gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
          gradient.addColorStop(
            0.5,
            `rgba(139, 92, 246, ${0.05 * backgroundIntensity})`
          );
          gradient.addColorStop(1, "rgba(139, 92, 246, 0)");

          ctx.fillStyle = gradient;
          ctx.fillRect(0, y - 100, canvas.width, 200);
        }

        animationId = requestAnimationFrame(animate);
      };

      animate();
    } else if (settings.dynamicBackground === "stars") {
      const stars: { x: number; y: number; size: number; twinkle: number }[] =
        [];
      const starCount = isMobile ? 50 : 100;

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          twinkle: Math.random() * Math.PI * 2,
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach((star) => {
          star.twinkle += 0.05 * animationSpeed;
          const alpha =
            ((Math.sin(star.twinkle) + 1) / 2) * 0.8 * backgroundIntensity;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();
    } else if (settings.dynamicBackground === "aurora") {
      let offset = 0;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        offset += 0.01 * animationSpeed;

        for (let i = 0; i < 5; i++) {
          const y = canvas.height / 2 + Math.sin(offset + i) * 100;
          const gradient = ctx.createLinearGradient(0, y - 50, 0, y + 50);
          gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
          gradient.addColorStop(
            0.5,
            `rgba(${100 + i * 30}, ${150 - i * 20}, 246, ${
              0.1 * backgroundIntensity
            })`
          );
          gradient.addColorStop(1, "rgba(139, 92, 246, 0)");

          ctx.fillStyle = gradient;
          ctx.fillRect(0, y - 50, canvas.width, 100);
        }

        animationId = requestAnimationFrame(animate);
      };

      animate();
    } else if (settings.dynamicBackground === "fireflies") {
      const fireflies: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        life: number;
      }[] = [];
      const fireflyCount = isMobile ? 20 : 40;

      for (let i = 0; i < fireflyCount; i++) {
        fireflies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3 * animationSpeed,
          vy: (Math.random() - 0.5) * 0.3 * animationSpeed,
          life: Math.random() * Math.PI * 2,
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireflies.forEach((fly) => {
          fly.x += fly.vx;
          fly.y += fly.vy;
          fly.life += 0.05 * animationSpeed;

          if (fly.x < 0 || fly.x > canvas.width) fly.vx *= -1;
          if (fly.y < 0 || fly.y > canvas.height) fly.vy *= -1;

          const alpha =
            ((Math.sin(fly.life) + 1) / 2) * 0.6 * backgroundIntensity;
          const gradient = ctx.createRadialGradient(
            fly.x,
            fly.y,
            0,
            fly.x,
            fly.y,
            10
          );
          gradient.addColorStop(0, `rgba(251, 191, 36, ${alpha})`);
          gradient.addColorStop(1, "rgba(251, 191, 36, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(fly.x, fly.y, 10, 0, Math.PI * 2);
          ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [
    settings.dynamicBackground,
    isMobile,
    animationSpeed,
    backgroundIntensity,
  ]);

  useEffect(() => {
    if (!settings.candleFlicker) {
      document.documentElement.style.removeProperty("--candle-flicker");
      return;
    }

    let animationId: number;
    const animate = () => {
      const flicker = 0.95 + Math.random() * 0.1;
      document.documentElement.style.setProperty(
        "--candle-flicker",
        flicker.toString()
      );
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [settings.candleFlicker]);

  if (
    !settings.particleEffects &&
    !shouldRenderCursorTrail &&
    settings.dynamicBackground === "none"
  ) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
