"use client";

import Inform from "@/shared/asset/svg/Inform";
import { Button } from "@/shared/ui";
import MiniHeader from "@/shared/ui/MiniHeader";
import { useGetVote } from "../../model/useGetVote";
import { toast } from "sonner";
import OrderCard from "@/entities/vote/ui/OrderCard";
import { postVote } from "../../api/postVote";
import { useState } from "react";
import Image from "next/image";
import success from "@/shared/asset/png/success.png";

export default function VoteView() {
  const { data, isError, error } = useGetVote();
  const [isSuccess, setIsSuccess] = useState(false);
  if (isError) toast.error(error.message ?? "현재 투표를 불러오는데 실패했습니다");

  const handleVote = async () => {
    if (data?.team_id && data.teamName) {
      const res = await postVote(data?.teamName, data?.team_id);
      if (res.status === 200) {
        toast.success("투표되었습니다");
        setIsSuccess(true);
      } else {
        toast.error("투표되지 않았습니다 다시 시도해주세요");
      }
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[600px]">
        <MiniHeader label="투표" />
        <div className="sm:px-[106px] px-16 mt-[23px]">
          <div className="flex flex-col gap-16 items-center bg-gray-50 rounded-lg h-[282px] justify-center py-[40px]">
            <p className="text-body2r text-gray-600">현재 투표 중인 팀</p>
            <h1 className="sm:text-title2b text-title4b">{data?.teamName ?? "팀 이름"}</h1>
            {isSuccess && (
              <Image alt="성공" className="mt-[46px]" src={success} height={72} width={72} />
            )}
          </div>
          <Button onClick={handleVote} className="w-full sm:mt-[80px] mt-[40px]">
            투표하기
          </Button>
          <div className="flex gap-10 items-center justify-center mt-12">
            <Inform width={16} height={16} color="#BDBDBD" />
            <small className="text-gray-300 text-caption2r">
              관리자가 투표를 시작할 때까지 기다려주세요
            </small>
          </div>
          <div className="flex gap-24">
            <OrderCard type="prev" teamName={data?.prev_team.teamName} />
            <OrderCard type="next" teamName={data?.next_team.teamName} />
          </div>
        </div>
      </div>
    </div>
  );
}
