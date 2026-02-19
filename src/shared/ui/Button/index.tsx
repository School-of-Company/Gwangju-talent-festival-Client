import { cn } from "@/shared/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variant;
};

const variant = {
  default: "bg-new-main text-white",
  secondary: "text-white bg-main-300",
  third: "bg-new-sub3 text-new-main",
  disabled: "bg-gray-100 cursor-not-allowed text-white border border-gray-200 text-gray-800",
  outline: "border border-solid border-new-main text-new-main",
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
