import { cn } from "@/shared/utils/cn";
import { useMemo } from "react";
import React from "react";

interface CountLengthProps {
  children: React.ReactNode;
  length?: number;
  max?: number;
  error?: string;
}

const CountLength = ({ children, length = 0, max = 100, error }: CountLengthProps) => {
  const countText = useMemo(() => `${length}/${max}`, [length, max]);

  return (
    <div className={cn("flex flex-col gap-4")}>
      {children}
      <div className="flex items-center justify-between">
        <span className={cn("text-caption1r", error ? "text-red-500" : "invisible")}>
          {error ?? " "}
        </span>
        <span className={cn("text-body3r text-gray-400")}>{countText}</span>
      </div>
    </div>
  );
};

export default React.memo(CountLength);
