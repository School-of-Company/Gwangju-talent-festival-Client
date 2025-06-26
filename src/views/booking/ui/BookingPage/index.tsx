"use client";

import { useState, useCallback } from "react";
import SelectFloor from "@/widgets/booking/ui/SelectFloor";
import Button from "@/shared/ui/Button";
import { FloorType } from "@/entities/booking/model/types";

const BookingPage = () => {
  const [selectedFloor, setSelectedFloor] = useState<FloorType>(null);

  const handleFloorSelect = useCallback((floor: FloorType) => {
    setSelectedFloor(floor);
  }, []);

  const handleBookingClick = useCallback(() => {
    if (selectedFloor) {
      console.log(`${selectedFloor} 예매 진행`);
    }
  }, [selectedFloor]);

  return (
    <div>
      <SelectFloor 
        onFloorSelect={handleFloorSelect}
        defaultFloor={selectedFloor}
      />

      <div className="flex justify-center mt-16"> 
        <Button
          className="w-full h-[50px]"
          onClick={handleBookingClick}
          isDisabled={!selectedFloor}
        >
          {selectedFloor ? `${selectedFloor} 예매하기` : "층을 선택해주세요"} 
        </Button>
      </div>
    </div>
  );
};

export default BookingPage; 