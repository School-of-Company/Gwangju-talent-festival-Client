"use client";

import { useState, useEffect } from "react";
import Star from "@/shared/asset/svg/Star";
import { useGetVote } from "@/shared/model/useGetVote";

export default function ScoreView() {
  const { data } = useGetVote();
  const activeStars = data?.star ?? 300;

  const [stars, setStars] = useState(
    Array.from({ length: 300 }, (_, i) => ({ id: i, active: false })),
  );

  useEffect(() => {
    let index = 0;
    let delay = 80;
    let cancelled = false;
    const step = () => {
      setStars(prev =>
        prev.map((star, idx) =>
          idx <= index && idx < activeStars ? { ...star, active: true } : star,
        ),
      );
      index++;
      delay = Math.max(5, delay - 1);
      if (index < activeStars && !cancelled) {
        setTimeout(step, delay);
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
          <div key={star.id}>
            <Star active={star.active} />
          </div>
        ))}
      </div>
    </div>
  );
}
