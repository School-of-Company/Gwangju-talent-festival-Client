"use client";

import { LeftArrow } from "@/shared/asset/svg/LeftArrow";
import { cn } from "@/shared/utils/cn";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import React from "react";

export interface BackHeaderProps {
  text: string;
  goto?: string;
}

const BackHeader = ({ text, goto }: BackHeaderProps) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    if (goto) {
      router.push(goto);
    } else {
      router.back();
    }
  }, [router, goto]);

  return (
    <div className={cn("flex gap-24 items-center my-28 mobile:my-12")}>
      <div className={cn("cursor-pointer")} onClick={handleBack}>
        <LeftArrow />
      </div>
      <h2 className={cn("text-body1b")}>{text}</h2>
    </div>
  );
};

export default React.memo(BackHeader);
