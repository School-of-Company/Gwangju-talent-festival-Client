"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Star from "@/shared/asset/svg/Star";
import { useGetVote } from "@/shared/model/useGetVote";
import { rgbs } from "@/shared/utils/color";
import { ease } from "@/entities/score/lib/ease";
import { changePerformOrder } from "@/shared/api/changePerformOrder";

const TOTAL_STARS = 200;

type StarCell = { id: number; active: boolean };

export default function ScoreView() {
  const [team, setTeam] = useState("");
  const { data } = useGetVote(team);
  useEffect(() => {
    const res = changePerformOrder();
    setTeam(String(res));
  }, []);
  const activeStars = Math.min(data?.star ?? TOTAL_STARS, TOTAL_STARS);
  const [stars, setStars] = useState<StarCell[]>(() =>
    Array.from({ length: TOTAL_STARS }, (_, i) => ({ id: i, active: false })),
  );

  const rafRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cellFx = useMemo(
    () =>
      Array.from({ length: TOTAL_STARS }, () =>
        mounted
          ? {
              delay: Math.random() * 120,
              rot: (Math.random() - 0.5) * 12,
              glow: 0.6 + Math.random() * 0.8,
            }
          : { delay: 0, rot: 0, glow: 0.6 },
      ),
    [mounted],
  );

  useEffect(() => {
    setStars(prev => prev.map(s => ({ ...s, active: false })));
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
      }
      if (target < total) {
        rafRef.current = requestAnimationFrame(loop);
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
    </div>
  );
}
