"use client";

import MiniHeader from "@/shared/ui/MiniHeader";
import { useGetTeams } from "../../model/useGetTeams";
import { useGetVotes } from "../../model/useGetVotes";
import { useState } from "react";
import { Button } from "@/shared/ui";
import { closeVote } from "@/entities/list/api/closeVote";
import { openVote } from "@/entities/list/api/openVote";
import { TeamCard, Wrapper } from "@/entities/list/ui";
import { toast } from "sonner";
import TeamSlide from "@/widgets/list/ui/TeamSlide";
import { startCount } from "@/entities/list/api/startCount";

export default function ListView() {
  const [item, setItem] = useState(0);
  const { data: votes, isError: votesIsError, error: votesError } = useGetVotes();
  const { data: teams, isError: teamsIsError, error: teamsError } = useGetTeams();

  if (votesIsError) toast.error(votesError.message ?? "투표를 불러오는데 실패했습니다");
  if (teamsIsError) toast.error(teamsError.message ?? "팀을 불러오는데 실패했습니다");
  const currentId = votes && votes[item].vote_id.toString();
  return (
    <div className="px-80 w-full">
      <MiniHeader label="관리자" />
      <div className="flex flex-col gap-[48px]">
        <div className="flex gap-[44px]">
          <Wrapper label="현재 상태">
            <TeamSlide
              voteCount={votes?.[item].voteCount ?? 0}
              setItem={setItem}
              status={votes?.[item].status ?? "PENDING"}
              teamName={votes?.[item].teamName ?? "팀"}
            />
          </Wrapper>
          <div className="w-[40%]">
            <Wrapper label="투표 제어">
              <Button onClick={() => currentId && openVote(currentId)}>투표시작</Button>
              <Button variant="secondary" onClick={() => currentId && startCount(currentId)}>
                집계 시작
              </Button>
              <Button variant="third" onClick={() => currentId && closeVote(currentId)}>
                투표 완료
              </Button>
            </Wrapper>
          </div>
        </div>
        <Wrapper label="팀">
          <div className="flex gap-28 flex-wrap">
            {teams?.map(v => {
              return (
                <TeamCard
                  status={v.status}
                  teamId={v.team_id}
                  teamName={v.teamName}
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
