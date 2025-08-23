"use client";

import TopRank from "@/entities/rank/ui/TopRank";
import { useGetRank } from "../../model/useGetRank";

export default function RankView() {
  const { data } = useGetRank();
  console.log(data);
  return (
    <div>
      <header className="pt-[69px] text-center text-title3m pb-[32px]">순위</header>
      <TopRank />
    </div>
  );
}
