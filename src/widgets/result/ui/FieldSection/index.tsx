import { FC } from "react";
import { cn } from "@/shared/utils/cn";
import { ParticipantCard } from "@/entities/result/ui/ParticipantCard";
import { ParticipantInfo } from "@/entities/result/model/type";
import { FIELD_COLORS } from "@/entities/result/model/const";

export const FieldSection: FC<{ field: string; participants: ParticipantInfo[] }> = ({
  field,
  participants,
}) => {
  const colorClass = FIELD_COLORS[field as keyof typeof FIELD_COLORS];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6 mobile:mb-4">
        <div className="relative inline-block">
          <span
            className={cn(
              colorClass,
              "absolute left-0 top-1/2 -translate-y-1/2 w-full opacity-30"
            )}
            style={{
              height: "70%",
              top: "60%",
              zIndex: 0,
            }}
            aria-hidden="true"
          />
          <h3 className="relative z-10 text-body1b mobile:text-body2b text-gray-900 px-1">
            {field}
          </h3>
        </div>
        <div className="text-body2r mobile:text-caption1r text-gray-500">{participants.length}팀</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mobile:gap-3">
        {participants.map((participant) => (
          <ParticipantCard key={participant.순번} participant={participant} />
        ))}
      </div>
    </div>
  );
};