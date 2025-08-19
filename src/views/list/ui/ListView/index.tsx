"use client";

import MiniHeader from "@/shared/ui/MiniHeader";
import { useGetTeams } from "../../model/useGetTeams";
import { useState } from "react";
import { Button } from "@/shared/ui";
import { closeVote } from "@/entities/list/api/closeVote";
import { openVote } from "@/entities/list/api/openVote";
import { TeamCard, Wrapper } from "@/entities/list/ui";
import { toast } from "sonner";
import TeamSlide from "@/widgets/list/ui/TeamSlide";

export default function ListView() {
  const [item, setItem] = useState(0);
  const { data, isError, error } = useGetTeams();

  if (isError) toast.error(error.message ?? "팀을 불러오는데 실패했습니다");
  const currentId = String(data?.[item].team_id) ?? "0";
  return (
    <div className="px-80 w-full">
      <MiniHeader label="관리자" />
      <div className="flex flex-col gap-[48px]">
        <div className="flex gap-[44px]">
          <Wrapper label="현재 상태">
            <TeamSlide
              voteCount={data?.[item].star ?? 0}
              status={data?.[item].status ?? "PENDING"}
              teamName={data?.[item].team_name ?? "팀"}
              setItem={setItem}
              item={item}
            />
          </Wrapper>
          <div className="w-[40%]">
            <Wrapper label="투표 제어">
              <small className="text-caption2r text-center text-gray-500">현재 투표 팀</small>
              <h3 className="text-body2b text-center">{data?.[item].team_name ?? "팀 이름"}</h3>
              <Button onClick={() => currentId && openVote(currentId)}>투표 시작</Button>
              <Button variant="third" onClick={() => currentId && closeVote(currentId)}>
                투표 마감
              </Button>
            </Wrapper>
          </div>
        </div>
        <Wrapper label="팀">
          <div className="flex gap-28 flex-wrap">
            {data?.map(v => {
              return (
                <TeamCard
                  voteCount={v.star}
                  status={v.status}
                  teamId={v.team_id}
                  teamName={v.team_name}
                  key={v.team_id}
                />
              );
            })}
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
