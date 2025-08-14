"use client";

import { useState, useEffect } from "react";
import Star from "@/shared/asset/svg/Star";
import { useGetVote } from "@/shared/model/useGetVote";
import Confetti from "react-confetti";

export default function ScoreView() {
  const { data } = useGetVote();
  const activeStars = data?.star ?? 300;

  const [stars, setStars] = useState(
    Array.from({ length: 300 }, (_, i) => ({ id: i, active: false })),
  );
  useEffect(() => {
    let index = 0;
    let cancelled = false;
    const step = () => {
      setStars(prev =>
        prev.map((star, idx) =>
          idx <= index && idx < activeStars ? { ...star, active: true } : star,
        ),
      );
      index++;
      if (index < activeStars && !cancelled) {
        setTimeout(step, 30);
      } else if (index >= activeStars) {
      }
    };
    step();
    return () => {
      cancelled = true;
    };
  }, [activeStars]);

  return (
    <div className="flex flex-col justify-center px-[200px] items-center">
      <h1 className="text-title1b mb-[74px] mt-[140px]">{data?.team_name ?? "팀 명"}</h1>
      <div className="flex flex-wrap gap-1">
        {stars.map(star => (
          <div
            key={star.id}
            style={{
              transition:
                "transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)",
              transform: star.active ? "scale(1)" : "scale(0.6)",
              opacity: star.active ? 1 : 0.2,
              willChange: "transform, opacity",
              display: "inline-block",
            }}
          >
            <Star active={star.active} />
          </div>
        ))}
      </div>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
}
