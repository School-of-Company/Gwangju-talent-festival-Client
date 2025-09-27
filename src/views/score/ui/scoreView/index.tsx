"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Star from "@/shared/asset/svg/Star";
import { useGetVote } from "@/shared/model/useGetVote";
import { ease } from "@/entities/score/lib/ease";
import { useParams } from "next/navigation";

const COLUMNS = 17;
const ROWS = 17;
const GAP = "1px";
const TOTAL_STARS = COLUMNS * ROWS;
const STAR_SIZE = 225;

const TEAMS = ['신가밴드', '라온', '야간합주실', '곽서영', 'METAPHOR', 'ALL', '구각와니', '신준', 'UNIVERSE', '정은서', '열정의 하마', '아']
const SCORES = [100, 90, 80, 70, 60, 50, 40, 30, 20, 100, 100, 200]

type StarCell = { id: number; active: boolean };

export default function ScoreView() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isError } = useGetVote(id);
  
  const fallbackScore = SCORES[Number(id) - 1] || 0;
  const apiScore = data?.star ?? 0;
  const finalScore = isError || error ? fallbackScore : apiScore;
  
  const activeStars = Math.min(finalScore, TOTAL_STARS);
  const [stars, setStars] = useState<StarCell[]>(() =>
    Array.from({ length: TOTAL_STARS || SCORES[Number(id) - 1] }, (_, i) => ({ id: i, active: false })),
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
    const duration = Math.max(500, total * 16);
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
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
      <div className="my-28 text-center">
        <h1 style={{ fontSize: "15rem" }} className="md:text-6xl font-bold text-white mb-4">
          {(isError || error) ? TEAMS[Number(id) - 1] : (data?.team_name || TEAMS[Number(id) - 1])}
        </h1>
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
          gap: GAP,
          width: "min(80vh, 80vw)",
          height: "min(80vh, 80vw)",
          aspectRatio: "1 / 1",
        }}
      >
        {stars.map((star, i) => {
          const fx = cellFx[i];
          const glow = `rgba(255, 205, 5, ${fx.glow})`;

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
                <Star active={star.active} size={STAR_SIZE} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
