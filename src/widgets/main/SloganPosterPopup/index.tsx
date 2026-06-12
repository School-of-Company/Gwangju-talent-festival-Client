"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "@/shared/ui/Modal";
import Button from "@/shared/ui/Button";
import { RightArrow } from "@/shared/asset/svg/RightArrow";
import { scrollToElement } from "@/shared/utils/scroll";
// import { isSloganEnded } from "@/shared/config/dateConfig";

const STORAGE_KEY = "sloganPosterHidden";

export default function SloganPosterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [doNotShow, setDoNotShow] = useState(false);

  useEffect(() => {
    // if (isSloganEnded()) return;
    const hidden = localStorage.getItem(STORAGE_KEY);
    if (!hidden) setIsOpen(true);
  }, []);

  const handleClose = () => {
    if (doNotShow) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    setIsOpen(false);
  };

  const handleGoSlogan = () => {
    handleClose();
    setTimeout(() => scrollToElement("ApplyThirdSection"), 100);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="포스터"
      className="w-[485px] max-w-[calc(100vw-32px)] p-[min(1.5rem,3dvh)] max-h-[90dvh] flex flex-col"
      contentClassName="overflow-y-auto min-h-0"
      footer={
        <div className="flex flex-col gap-[min(0.75rem,1.5dvh)]">
          <Button
            type="button"
            className="w-full rounded-lg h-[min(50px,7dvh)]"
            onClick={handleGoSlogan}
          >
            <span className="text-body3b flex items-center justify-center gap-10">
              신청하러 가기
              <RightArrow color="white" width={16} height={16} />
            </span>
          </Button>
          <div className="flex items-center gap-8">
            <input
              id="doNotShow"
              type="checkbox"
              checked={doNotShow}
              onChange={e => setDoNotShow(e.target.checked)}
              className="w-[12px] h-[12px] cursor-pointer"
            />
            <label
              htmlFor="doNotShow"
              className="text-caption1r text-gray-500 cursor-pointer select-none"
            >
              다시 보지 않기
            </label>
          </div>
        </div>
      }
    >
      <Image
        src="/images/신청.png"
        alt="2026 광탈페 슬로건 공모전 안내"
        width={485}
        height={708}
        className="w-full h-auto rounded-lg"
        priority
      />
    </Modal>
  );
}
