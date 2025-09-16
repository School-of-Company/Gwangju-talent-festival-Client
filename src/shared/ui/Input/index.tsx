import { useState, forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  type: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(prev => !prev);
    };

    return (
      <div className="w-full flex flex-col gap-8">
        <label className="text-body3b">{label}</label>
        <div className="relative">
          <input
            className={cn(
              "w-full outline-none rounded-md px-16 py-4 text-body3r placeholder:text-gray-400 focus:ring-0 transition-all h-[50px] border-gray-100 border border-solid",
              type === "number" &&
                "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              className,
            )}
            placeholder={placeholder}
            type={showPassword ? "text" : "password"} // Toggle between text and password
            ref={ref}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "숨기기ㅤ" : "보이기ㅤ"}
            </button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
