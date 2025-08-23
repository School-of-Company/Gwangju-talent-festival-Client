import { FC } from "react";
import { cn } from "@/shared/utils/cn";
import { FIELD_COLORS } from "@/entities/result/model/const";
import { ParticipantInfo } from "@/entities/result/model/type";

export const ParticipantCard: FC<{ participant: ParticipantInfo }> = ({ participant }) => {
  const colorClass = FIELD_COLORS[participant.분야 as keyof typeof FIELD_COLORS];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mobile:p-4">
      <div className="flex items-center gap-8 mobile:gap-3">
        <div
          className={cn(
            "w-20 h-20 mobile:w-15 mobile:h-15 rounded-full flex items-center justify-center text-white text-caption2b mobile:text-caption1b font-bold",
            colorClass,
          )}
        >
          {participant.순번}
        </div>
        <div className="flex-1">
          <div className="text-body3r mobile:text-caption2r text-gray-600 mb-1">
            {participant.소속}
          </div>
          <div className="text-body3b mobile:text-caption1b text-gray-900">
            {participant.팀명
              ? `${participant.팀명} (${participant.신청자명})`
              : participant.신청자명}
          </div>
        </div>
      </div>
    </div>
  );
};
