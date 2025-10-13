import Fire from "@/shared/asset/svg/Fire";
import { cn } from "@/shared/utils/cn";
import { Rank } from "@/views/rank/model/rankType";

export default function RankCard({ popularity_award, team_name }: Rank) {
  return (
    <article
      className={cn(
        "flex justify-center items-center py-[20px] rounded-[20px] gap-[40px]",
        popularity_award
          ? "bg-main-100 border-main-600 border border-solid"
          : "shadow-[0_0_28px_4px_rgba(0,0,0,0.16)]",
      )}
    >
      {popularity_award && (
        <div className="flex gap-6 items-center justify-center">
          <Fire width={30} height={30} />
          <h4 className="text-body1b mobile:text-caption1b text-main-600">인기상</h4>
        </div>
      )}
      <strong className="text-body1b mobile:text-caption1b">{team_name}</strong>
    </article>
  );
}
