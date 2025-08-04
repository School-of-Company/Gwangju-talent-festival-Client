"use client";

import { cn } from "@/shared/utils/cn";
import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  label: string;
}

export default function Buttons({ children, label }: WrapperProps) {
  return (
    <div className="w-full">
      <h3 className={cn("text-body1b mb-24")}>{label}</h3>
      <div
        className={cn("p-24 border border-gray-100 border-solid rounded-lg flex flex-col gap-24")}
      >
        {children}
      </div>
    </div>
  );
}
