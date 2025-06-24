import { cn } from "@/shared/utils/cn";

type FloorType = "1층" | "2층";

interface FloorButtonProps {
  floor: FloorType;
  isSelected: boolean;
  seatInfo: string;
  onClick: () => void;
  className?: string;
}

export const FloorButton = ({ 
  floor, 
  isSelected, 
  seatInfo, 
  onClick, 
  className 
}: FloorButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full px-6 py-2 text-body2b ",
        "min-w-[160px] min-h-[40px]",
        isSelected
          ? " bg-main-600 text-white"
          : "bg-transparent border-1 border-gray-200 text-gray-500 hover:border-main-300",
        className
      )}
    >
      <div className="flex items-center gap-18">
        <span className="text-caption2b font-bold">{floor}</span>
        <span className="text-caption2r opacity-80">{seatInfo}</span>
      </div>
    </button>
  );
};

export default FloorButton; 