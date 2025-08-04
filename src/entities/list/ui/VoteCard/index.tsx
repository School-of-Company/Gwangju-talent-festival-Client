import { cn } from "@/shared/utils/cn";
import { handleStatus } from "@/views/list/lib/handleStatus";

interface VoteCardProps {
  teamName: string;
  voteCount: number;
  voteId: number;
  status: "PENDING" | "ONGOING" | "FINISHED";
}

export default function VoteCard({ status, voteCount, teamName }: VoteCardProps) {
  const handledStatus = handleStatus(status, "vote");
  return (
    <article
      className={cn(
        "px-24 max-w-[199px] w-full py-20 flex items-center rounded-lg flex-col gap-16",
        status === "ONGOING" && "border border-solid border-main-600",
        status === "ONGOING" ? "bg-main-100" : "bg-gray-50",
      )}
    >
      <h5 className="text-body3b">{teamName}</h5>
      <h4 className={cn("text-body1b", handledStatus.color)}>{voteCount}</h4>
      <strong className={cn("text-caption2b", handledStatus.color)}>{handledStatus.label}</strong>
    </article>
  );
}
