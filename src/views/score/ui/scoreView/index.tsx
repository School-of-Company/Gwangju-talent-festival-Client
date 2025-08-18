"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Star from "@/shared/asset/svg/Star";
import { useGetVote } from "@/shared/model/useGetVote";
import type { CreateTypes } from "canvas-confetti";
import { colors, rgbs } from "@/shared/utils/color";
import { ease } from "@/entities/score/lib/ease";

const TOTAL_STARS = 200;

const MARKS = [
  { key: "50", th: 0.5, power: 1.1, spread: 60 },
  { key: "100", th: 1.0, power: 1.6, spread: 1000 },
];

type StarCell = { id: number; active: boolean };

export default function ScoreView() {
  const { data } = useGetVote();
  const activeStars = Math.min(data?.star ?? TOTAL_STARS, TOTAL_STARS);

  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<StarCell[]>(() =>
    Array.from({ length: TOTAL_STARS }, (_, i) => ({ id: i, active: false })),
  );

  const cellFx = useMemo(
    () =>
      Array.from({ length: TOTAL_STARS }, () => ({
        delay: Math.random() * 120,
        rot: (Math.random() - 0.5) * 12,
        glow: 0.6 + Math.random() * 0.8,
      })),
    [],
  );

  const rafRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const milestoneFired = useRef<Record<string, boolean>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiRef = useRef<CreateTypes | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!mounted) return;
    (async () => {
      const mod = await import("canvas-confetti");
      if (cancelled) return;
      if (canvasRef.current) {
        const create = mod.default.create(canvasRef.current, { resize: true, useWorker: true });
        confettiRef.current = create;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mounted]);

  const burst = (power = 1) => {
    const c = confettiRef.current;
    if (!c) return;
    const base = {
      particleCount: Math.floor(120 * power),
      spread: 70,
      startVelocity: 55,
      gravity: 1.0,
      ticks: 240,
      scalar: 1,
      colors: [
        colors.main[100],
        colors.main[200],
        colors.main[300],
        colors.main[400],
        colors.main[500],
      ],
      disableForReducedMotion: true,
    };
    c({
      ...base,
      origin: { x: 0, y: 0 },
      angle: 0,
      particleCount: Math.floor(100 * power),
      startVelocity: 60,
    });
    c({
      ...base,
      origin: { x: 1, y: 0 },
      angle: 180,
      particleCount: Math.floor(100 * power),
      startVelocity: 60,
    });
  };

  const fireIfMilestone = (p: number) => {
    for (const m of MARKS) {
      if (!milestoneFired.current[m.key] && p >= m.th) {
        milestoneFired.current[m.key] = true;
        burst(m.power);
      }
    }
  };

  useEffect(() => {
    setStars(prev => prev.map(s => ({ ...s, active: false })));
    milestoneFired.current = {};
    progressRef.current = 0;
    const total = activeStars;
    const duration = Math.max(900, total * 16);
    const start = performance.now();

    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = ease(p);
      const target = Math.floor(total * eased);
      if (target !== progressRef.current) {
        progressRef.current = target;
        setStars(prev =>
          prev.map((s, idx) => (idx < target && !s.active ? { ...s, active: true } : s)),
        );
        fireIfMilestone(eased);
      }
      if (target < total) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        setTimeout(() => burst(1.4), 60);
        setTimeout(() => burst(1.2), 240);
        setTimeout(() => burst(1.0), 420);
      }
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeStars]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
          gap: "6px",
          width: "min(1200px, 92vw)",
        }}
      >
        {stars.map((star, i) => {
          const fx = cellFx[i];
          const glow = `rgba(${rgbs.main[400]}, ${fx.glow})`;

          return (
            <div
              key={star.id}
              className="aspect-square flex items-center justify-center"
              style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            >
              <div
                className="inline-block will-change-[transform,opacity,filter]"
                style={{
                  transition: `transform 420ms cubic-bezier(.2,.8,.2,1) ${fx.delay}ms,
                               opacity 380ms ease-out ${fx.delay}ms,
                               filter 380ms ease-out ${fx.delay}ms`,
                  transform: star.active
                    ? `scale(1) rotate(${fx.rot}deg)`
                    : `scale(0.35) rotate(${fx.rot - 12}deg)`,
                  opacity: star.active ? 1 : 0.15,
                  filter: star.active
                    ? `drop-shadow(0 0 18px ${glow}) saturate(1.2)`
                    : "drop-shadow(0 0 0 rgba(0,0,0,0))",
                  animation: star.active
                    ? `popIn 420ms cubic-bezier(.2,.8,.2,1) ${fx.delay}ms both`
                    : "none",
                }}
              >
                <Star active={star.active} />
              </div>
            </div>
          );
        })}
      </div>

      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 w-full h-full" />

      <style jsx global>{`
        @keyframes popIn {
          0% {
            transform: translateZ(0) scale(1.5);
            filter: drop-shadow(0 0 0 rgba(${rgbs.main[600]}, 0));
          }
          60% {
            transform: translateZ(4px) scale(1.08);
            filter: drop-shadow(0 0 18px rgba(${rgbs.main[600]}, 0.9));
          }
          100% {
            transform: translateZ(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
