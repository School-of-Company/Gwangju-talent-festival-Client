"use client";
import { cn } from "@/shared/utils/cn";
import { STATUS, StatusType } from "../../consts/status";

interface TeamCardProps {
  teamName: string;
  teamId: number;
  vote_status: StatusType;
  voteCount: number;
}

export default function TeamCard({ vote_status, teamName, voteCount }: TeamCardProps) {
  return (
    <article
      className={cn(
        "px-24 max-w-[199px] w-full py-20 flex items-center rounded-lg flex-col gap-16",
        vote_status === "ONGOING" ? "bg-[rgba(254,47,51,0.10)]" : "bg-gray-50",
        vote_status === "ONGOING" && "border border-solid border-[#FE2F33]",
      )}
    >
      <div className="flex gap-8">
        <div
          className={cn(
            "size-10 rounded-full",
            vote_status === "ONGOING"
              ? "bg-[#FE2F33]"
              : vote_status === "FINISHED"
                ? "bg-[#17C200]"
                : "bg-[#FEBD2F]",
          )}
        />
        <p
          className={cn(
            "text-caption2r",
            vote_status === "ONGOING"
              ? "text-[#FE2F33]"
              : vote_status === "FINISHED"
                ? "text-[#17C200]"
                : "text-[#FEBD2F]",
          )}
        >
          {STATUS[vote_status]}
        </p>
      </div>
      <h2
        className={cn(vote_status === "ONGOING" ? "text-black" : "text-[#A7A7A7]", "text-body1b")}
      >
        {voteCount}
      </h2>
      <h3 className="text-body2b">{teamName}</h3>
    </article>
  );
}
