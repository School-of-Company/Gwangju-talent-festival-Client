import { useState, forwardRef } from "react";
import { cn } from "@/shared/utils/cn";
import { EyeShow } from "@/shared/asset/svg/EyeShow";
import { EyeHide } from "@/shared/asset/svg/EyeHide";
import { colors } from "@/shared/utils/color";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  type: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, label, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(prev => !prev);
    };

    return (
      <div className="w-full flex flex-col gap-8">
        <label className="text-body3b" htmlFor={id}>
          {label}
        </label>
        <div className="relative">
          <input
            className={cn(
              "w-full outline-none rounded-md px-16 py-4 text-body3r placeholder:text-gray-400 focus:ring-0 transition-all h-[50px] border-gray-100 border border-solid",
              type === "number" &&
                "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              className,
            )}
            id={id}
            placeholder={placeholder}
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            ref={ref}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute right-[1rem] top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeShow color={colors.gray[400]} />
              ) : (
                <EyeHide color={colors.gray[400]} />
              )}
            </button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
