"use client";

import BackHeader from "@/shared/ui/BackHeader";
import { FC } from "react";

export const ResultPage: FC = () => {

  return (
    <div className="w-full min-h-[calc(100vh-70px)] flex flex-col items-center px-4">
      <div className="max-w-3xl w-full flex flex-col gap-10">
        <BackHeader text="예선 결과" />
      </div>
    </div>
  );
};

