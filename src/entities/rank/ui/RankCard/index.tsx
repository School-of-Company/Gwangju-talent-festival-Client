import Fire from "@/shared/asset/svg/Fire";
import { cn } from "@/shared/utils/cn";
import { Rank } from "@/views/rank/model/rankType";

export default function RankCard({ popularity_award, ranking, team_name }: Rank) {
  return (
    <article
      className={cn(
        "flex justify-center gap-[40px]",
        popularity_award
          ? "bg-main-100 border-main-600 border border-solid"
          : "shadow-[0_8px_28px_0_rgba(0,0,0,0.12)]",
      )}
    >
      {popularity_award && (
        <div className="flex gap-12">
          <Fire />
          <h4 className="text-title2b text-main-600">인기상</h4>
        </div>
      )}
      <strong className={cn("text-gray-400", popularity_award ? "text-title4b" : "text-title2b")}>
        {ranking}등
      </strong>
      <strong className="text-title4b">{team_name}</strong>
    </article>
  );
}
