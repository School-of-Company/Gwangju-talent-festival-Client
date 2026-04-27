import { cn } from "@/shared/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variant;
};

const variant = {
  default: "bg-orange-500 text-white",
  secondary: "text-white bg-main-300",
  third: "bg-orange-200 text-orange-500",
  disabled: "bg-gray-100 cursor-not-allowed border border-gray-200 text-gray-800",
  outline: "border border-solid border-orange-500 text-orange-500",
};

const Button = ({
  children,
  className,
  onClick,
  variant: variantKey = "default",
  disabled,
  ...props
}: ButtonProps) => {
  const effectiveVariant = disabled ? "disabled" : variantKey;

  return (
    <>
      <button
        className={cn(
          `px-4 py-2 h-[50px] rounded-md whitespace-nowrap text-body3b font-bold cursor-pointer select-none ${variant[effectiveVariant]}`,
          className,
        )}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
