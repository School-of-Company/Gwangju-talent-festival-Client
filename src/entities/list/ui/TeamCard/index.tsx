import { cn } from "@/shared/utils/cn";
import { handleStatus } from "@/entities/list/lib/handleStatus";
import { StatusType } from "../../consts/status";

interface TeamCardProps {
  teamName: string;
  teamId: number;
  status: StatusType;
  voteCount: number;
}

export default function TeamCard({ status, teamName, voteCount }: TeamCardProps) {
  const handledStatus = handleStatus(status);
  return (
    <article
      className={cn(
        "px-24 max-w-[199px] w-full py-20 flex items-center rounded-lg flex-col gap-16",
        status === "ONGOING" ? "bg-[rgba(254,47,51,0.10)]" : "bg-gray-50",
        status === "ONGOING" && "border border-solid border-[#FE2F33]",
      )}
    >
      <div className="flex gap-8">
        <div className={cn("size-10 rounded-full", handledStatus.bg)} />
        <p className={cn("text-caption2r", handledStatus.color)}>{handledStatus.label}</p>
      </div>
      <h2 className={cn(status === "ONGOING" ? "text-black" : "text-#A7A7A7", "text-body1b")}>
        {voteCount}
      </h2>
      <h3 className="text-body2b">{teamName}</h3>
    </article>
  );
}
