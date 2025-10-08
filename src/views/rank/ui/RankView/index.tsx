"use client";

import TopRank from "@/entities/rank/ui/TopRank";
import RankCard from "@/entities/rank/ui/RankCard";

type RankData = {
  ranking: number;
  team_name: string;
  popularity_award: boolean;
};

const RANK_DATA: RankData[] = [
  {
    ranking: 1,
    team_name: "야간합주실",
    popularity_award: true,
  },
  {
    ranking: 2,
    team_name: "구각와니",
    popularity_award: false,
  },

  {
    ranking: 3,
    team_name: "ALL",
    popularity_award: false,
  },

  {
    ranking: 4,
    team_name: "신준",
    popularity_award: false,
  },

  {
    ranking: 5,
    team_name: "신가밴드",
    popularity_award: true,
  },

  {
    ranking: 6,
    team_name: "정은서",
    popularity_award: true,
  },
];

export default function RankView() {
  return (
    <div>
      <header className="text-center text-title3m py-[32px]">순위</header>
      {RANK_DATA && <TopRank rank={[RANK_DATA[0], RANK_DATA[1], RANK_DATA[2], RANK_DATA[3]]} />}
      <div className="flex flex-col gap-16 px-[5%] my-28">
        {RANK_DATA &&
          RANK_DATA?.map((v, i) => {
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
