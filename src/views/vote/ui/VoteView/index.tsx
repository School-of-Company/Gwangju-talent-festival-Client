"use client";

import { toast } from "sonner";
import { postVote } from "../../api/postVote";
import { useState } from "react";
import VoteButton from "@/shared/asset/svg/VoteButton";
import { Button } from "@/shared/ui";
import { useGetVote } from "@/shared/model/useGetVote";
import { useParams } from "next/navigation";

export default function VoteView() {
  const { id } = useParams<{ id: string }>();
  const { data, isError, error } = useGetVote(id ?? "");
  const [score, setScore] = useState([true, false, false]);
  const [isSuccess, setIsSuccess] = useState(false);
  if (isError) toast.error(error.message ?? "현재 투표를 불러오는데 실패했습니다");

  const handleVote = async () => {
    if (data?.team_id && data.team_name) {
      const res = await postVote(score.filter(v => v).length, data?.team_id);

      if ("status" in res && res.status === 200) {
        toast.success("투표되었습니다");
        setIsSuccess(true);
      } else {
        toast.error(res.data.message ?? "투표되지 않았습니다 다시 시도해주세요");
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="sm:px-[106px] px-16 mt-[23px] flex flex-col items-center">
        <div className="flex flex-col gap-16 w-full items-center bg-gray-50 rounded-lg h-[282px] justify-center py-[40px]">
          <p className="text-body2r text-gray-600">현재 투표 중인 팀</p>
          <h1 className="sm:text-title2b text-title4b">{data?.team_name ?? "팀 이름"}</h1>
          {isSuccess && (
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="96" height="96" rx="48" fill="#17C200" />
              <path
                d="M39.0002 60.5998L28.5002 50.0998C28.2256 49.8219 27.8986 49.6012 27.5381 49.4506C27.1776 49.3 26.7908 49.2225 26.4002 49.2225C26.0095 49.2225 25.6227 49.3 25.2622 49.4506C24.9017 49.6012 24.5747 49.8219 24.3002 50.0998C24.0223 50.3743 23.8016 50.7013 23.651 51.0618C23.5004 51.4223 23.4229 51.8091 23.4229 52.1998C23.4229 52.5905 23.5004 52.9772 23.651 53.3377C23.8016 53.6982 24.0223 54.0252 24.3002 54.2998L36.8702 66.8698C38.0402 68.0398 39.9302 68.0398 41.1002 66.8698L72.9002 35.0998C73.1781 34.8252 73.3987 34.4982 73.5493 34.1377C73.6999 33.7772 73.7775 33.3905 73.7775 32.9998C73.7775 32.6091 73.6999 32.2223 73.5493 31.8618C73.3987 31.5014 73.1781 31.1743 72.9002 30.8998C72.6256 30.6219 72.2986 30.4012 71.9381 30.2506C71.5776 30.1 71.1908 30.0225 70.8002 30.0225C70.4095 30.0225 70.0227 30.1 69.6622 30.2506C69.3017 30.4012 68.9747 30.6219 68.7002 30.8998L39.0002 60.5998Z"
                fill="white"
              />
            </svg>
          )}
        </div>
        <small className="text-body2r mb-24 mt-[40px] text-gray-500">방금 공연한 팀에게 별을 선물해 주세요!!</small>
        <div className="flex sm:gap-24 gap-10 mb-[60px]">
          <VoteButton onClick={() => [setScore([true, false, false])]} isActive={score[0]} />
          <VoteButton onClick={() => [setScore([true, true, false])]} isActive={score[1]} />
          <VoteButton onClick={() => [setScore([true, true, true])]} isActive={score[2]} />
        </div>
        <Button
          onClick={handleVote}
          variant={isSuccess ? "disabled" : "default"}
          className="w-full"
        >
          {isSuccess ? "투표 됨" : "확인"}
        </Button>
      </div>
    </div>
  );
}
