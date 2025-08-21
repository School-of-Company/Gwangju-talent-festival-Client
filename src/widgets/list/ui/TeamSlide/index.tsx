"use client";

import { Button } from "@/shared/ui";
import { handleStatus } from "@/entities/list/lib/handleStatus";
import { StatusType } from "@/entities/list/consts/status";
import { useCallback } from "react";
import { RightArrow } from "@/shared/asset/svg/RightArrow";
import { LeftArrow } from "@/shared/asset/svg/LeftArrow";

interface TeamSlideProps {
  setItem: (v: number) => void;
  item: number;
  teamName: string;
  voteCount: number;
  status: StatusType;
}

export default function TeamSlide({ teamName, status, voteCount, setItem, item }: TeamSlideProps) {
  const next = useCallback(() => {
    if (item < 9) {
      setItem(item + 1);
    }
  }, [item, setItem]);

  const prev = useCallback(() => {
    if (item > 0) {
      setItem(item - 1);
    }
  }, [item, setItem]);
  return (
    <div className="w-full py-12 flex items-center justify-between h-full">
      <div className="flex items-center">
        {item > 0 && (
          <div onClick={prev}>
            <LeftArrow className="cursor-pointer" width={28} height={28} color="#909090" />
          </div>
        )}
        <div className="flex ml-[53px] gap-[40px] flex-col">
          <div className="flex gap-28 items-center">
            <span className="text-gray-500 text-body2r">진행팀</span>
            <h3 className="text-body1b">{teamName}</h3>
          </div>
          <div className="flex items-center gap-[32px]">
            <span className="text-gray-500 text-body2r">투표상태</span>
            <Button className="w-[80px]" variant="outline">
              {handleStatus(status).label}
            </Button>
          </div>
          <div className="flex items-center gap-[37px]">
            <span className="text-gray-500 text-body2r">현재 투표 수</span>
            <h3 className="text-body1b text-main-600">{voteCount}</h3>
          </div>
        </div>
      </div>
      {item < 9 && (
        <div
          className="flex items-center cursor-pointer gap-24 text-body1b text-gray-500"
          onClick={next}
        >
          다음 팀<RightArrow height={28} color="#909090" width={28} />
        </div>
      )}
    </div>
  );
}
