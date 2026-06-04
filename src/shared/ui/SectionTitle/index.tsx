import { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type SectionTitleProps = Readonly<{
  title: string;
  description?: ReactNode;
  className?: string;
}>;

export const SectionTitle = ({ title, description, className }: SectionTitleProps) => {
  return (
    <div className={cn("w-full text-center", className)}>
      <h2 className={cn("text-title1b mobile:text-body2b break-keep")}>{title}</h2>
      {description && (
        <p
          className={cn(
            "text-body2r text-gray-500 pt-[1.5rem] mobile:text-caption2r mobile:pt-[1rem] mb-[24px] mobile:px-18",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
