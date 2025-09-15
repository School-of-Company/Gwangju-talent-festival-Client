"use client";

import TopRank from "@/entities/rank/ui/TopRank";
import { useGetRank } from "../../model/useGetRank";
import RankCard from "@/entities/rank/ui/RankCard";

export default function RankView() {
  const { data } = useGetRank();
  console.log(data);
  return (
    <div>
      <header className="pt-[69px] text-center text-title3m pb-[32px]">순위</header>
      {data && <TopRank rank={[data[0], data[1], data[2], data[3]]} />}
      <div className="flex flex-col gap-[52px] px-[41px] my-28">
        {data &&
          data?.map((v, i) => {
            if (i < 4) return null;
            return (
              <RankCard
                popularity_award={v.popularity_award}
                ranking={v.ranking}
                team_name={v.team_name}
                key={v.ranking}
              />
            );
          })}
      </div>
    </div>
  );
}
