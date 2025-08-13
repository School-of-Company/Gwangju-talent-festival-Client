"use client";

import { useGetVote } from "../../model/useGetVote";
import { toast } from "sonner";
import { postVote } from "../../api/postVote";
import { useState } from "react";
import Image from "next/image";
import success from "@/shared/asset/png/success.png";
import VoteButton from "@/shared/asset/svg/VoteButton";
import { Button } from "@/shared/ui";

export default function VoteView() {
  const { data, isError, error } = useGetVote();
  const [score, setScore] = useState([false, false, false]);
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
    <div className="flex justify-center items-center h-screen">
      <div className="sm:px-[106px] px-16 mt-[23px] flex flex-col items-center">
        <div className="flex flex-col gap-16 w-full items-center bg-gray-50 rounded-lg h-[282px] justify-center py-[40px]">
          <p className="text-body2r text-gray-600">현재 투표 중인 팀</p>
          <h1 className="sm:text-title2b text-title4b">{data?.teamName ?? "팀 이름"}</h1>
          {isSuccess && (
            <Image alt="성공" className="mt-[46px]" src={success} height={72} width={72} />
          )}
        </div>
        <small className="text-body2r mb-24 mt-[40px] text-gray-500">별점을 표시해주세요</small>
        <div className="flex sm:gap-24 gap-10 mb-[60px]">
          <VoteButton onClick={() => [setScore([true, false, false])]} isActive={score[0]} />
          <VoteButton onClick={() => [setScore([true, true, false])]} isActive={score[1]} />
          <VoteButton onClick={() => [setScore([true, true, true])]} isActive={score[2]} />
        </div>
        <Button onClick={handleVote} className="w-full">
          확인
        </Button>
      </div>
    </div>
  );
}
