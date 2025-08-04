import { Button } from "@/shared/ui";
import { handleStatus } from "@/entities/list/lib/handleStatus";

interface TeamSlideProps {
  setItem: (v: number) => void;
  teamName: string;
  voteCount: number;
  status: "PENDING" | "ONGOING" | "FINISHED";
}

export default function TeamSlide({ teamName, status, voteCount }: TeamSlideProps) {
  return (
    <div className="w-full flex flex-col gap-[40px] h-full py-4">
      <div className="flex gap-28 items-center">
        <span className="text-gray-500 text-body2r">진행팀</span>
        <h3 className="text-body1b">{teamName}</h3>
      </div>
      <div className="flex items-center gap-[32px]">
        <span className="text-gray-500 text-body2r">투표상태</span>
        <Button className="w-[80px]" variant="outline">
          {handleStatus(status, "vote").label}
        </Button>
      </div>
      <div className="flex items-center gap-[37px]">
        <span className="text-gray-500 text-body2r">현재 투표 수</span>
        <h3 className="text-body1b text-main-600">{voteCount}</h3>
      </div>
    </div>
  );
}
