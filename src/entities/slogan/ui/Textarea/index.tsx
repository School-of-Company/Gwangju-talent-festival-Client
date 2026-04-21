import { cn } from "@/shared/utils/cn";
import { forwardRef } from "react";
import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hideErrorSpace?: boolean;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, placeholder, label, error, hideErrorSpace, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-8">
        <label className="text-body3b">{label}</label>
        <textarea
          className={cn(
            "w-full outline-none rounded-md p-12 text-body3r placeholder:text-gray-400 overflow-y-scroll focus:ring-0 h-[150px] border border-gray-100 resize-none",
            className,
          )}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        {!hideErrorSpace && (
          <p className={cn("text-caption1r h-[0.75rem] leading-none", error ? "text-red-500" : "invisible")}>
            {error ?? " "}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default React.memo(Textarea);
