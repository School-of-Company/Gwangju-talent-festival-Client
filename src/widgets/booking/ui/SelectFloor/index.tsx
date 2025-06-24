"use client";

import { useState } from "react";
import { cn } from "@/shared/utils/cn";
import { FloorButton } from "@/entities/booking/ui/FloorButton";

type FloorType = "1층" | "2층" | null;

interface SelectFloorProps {
  onFloorSelect?: (floor: FloorType) => void;
  defaultFloor?: FloorType;
  className?: string;
}

export const SelectFloor = ({ 
  onFloorSelect, 
  defaultFloor = null, 
  className 
}: SelectFloorProps) => {
  const [selectedFloor, setSelectedFloor] = useState<FloorType>(defaultFloor);

  const handleFloorSelect = (floor: "1층" | "2층") => {
    const newFloor: FloorType = selectedFloor === floor ? null : floor;
    setSelectedFloor(newFloor);
    onFloorSelect?.(newFloor);
  };

  return (
    <div className={cn("flex gap-16", className)}>
      <FloorButton
        floor="1층"
        isSelected={selectedFloor === "1층"}
        seatInfo="117/118"
        onClick={() => handleFloorSelect("1층")}
      />
      
      <FloorButton
        floor="2층"
        isSelected={selectedFloor === "2층"}
        seatInfo="117/118"
        onClick={() => handleFloorSelect("2층")}
      />
    </div>
  );
};

export default SelectFloor;
