"use client";

import { Button } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";
import { closeVote } from "../../api/closeVote";
import { openVote } from "../../api/openVote";

export default function Buttons({ id }: { id: string }) {
  return (
    <div>
      <h3 className={cn("text-body1b mb-24")}>투표 제어</h3>
      <div
        className={cn("p-24 border border-gray-100 border-solid rounded-lg flex flex-col gap-24")}
      >
        <Button onClick={() => openVote(id)}>투표시작</Button>
        <Button varient="third" onClick={() => closeVote(id)}>
          투표 완료
        </Button>
      </div>
    </div>
  );
}
