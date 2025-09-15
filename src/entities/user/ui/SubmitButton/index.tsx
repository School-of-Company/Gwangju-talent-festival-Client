import Button from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";

type SubmitButtonProps = {
  buttonText?: string;
  disabled?: boolean;
};

const SubmitButton = ({ buttonText, disabled }: SubmitButtonProps) => {
  return (
    <Button className={cn("w-full mt-1.25rem")} type="submit" disabled={disabled}>
      {buttonText}
    </Button>
  );
};

export default SubmitButton;
