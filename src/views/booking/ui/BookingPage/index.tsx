"use client";

import { useState, useCallback } from "react";
import SelectSection from "@/widgets/booking/ui/SelectSection";
import Button from "@/shared/ui/Button";
import { SectionType } from "@/entities/booking/model/types";
import Inform from "@/shared/asset/svg/Inform";
import { colors } from "@/shared/utils/color";

const BookingPage = () => {
  const [selectedSection, setSelectedSection] = useState<SectionType>(null);

  const handleSectionSelect = useCallback((section: SectionType) => {
    setSelectedSection(section);
  }, []);

  const handleBookingClick = useCallback(() => {
    if (selectedSection) {
      console.log(`${selectedSection}구역 예매 진행`);
    }
  }, [selectedSection]);

  return (
    <main>
      <div className="flex flex-col items-center gap-16 mt-16">
        <h1 className="text-body2b">ㅁㄴㅇㄹ</h1>
        <div className="flex items-center gap-4 hover:cursor-pointer" onClick={() => {}}>
          <Inform width={16} height={16} color={colors.gray[500]} />
          <p className="text-caption2r text-gray-500">예매 시 주의사항</p>
        </div>
      </div>

      <div></div>

      <div className="flex flex-col items-center gap-16 mt-16">
        <SelectSection onSectionSelect={handleSectionSelect} />
        <Button
          className="w-full h-[50px]"
          onClick={handleBookingClick}
          isDisabled={!selectedSection}
        >
          {selectedSection ? `${selectedSection}구역 예매하기` : "구역을 선택해주세요"}
        </Button>
      </div>
    </main>
  );
};

export default BookingPage;
