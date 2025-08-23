import { cn } from "@/shared/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variant;
};

const variant = {
  default: "bg-main-600 text-white",
  secondary: "text-white bg-main-300",
  third: "bg-main-100 text-main-600",
  disabled: "bg-gray-300 cursor-not-allowed text-white",
  outline: "border border-solid border-main-600 text-main-600",
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
          `px-4 py-2 h-[50px] rounded-md whitespace-nowrap text-body3b font-bold ${variant[effectiveVariant]}`,
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
