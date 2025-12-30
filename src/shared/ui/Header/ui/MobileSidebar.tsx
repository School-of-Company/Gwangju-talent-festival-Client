"use client";

import { links } from "@/shared/const/headerValues";
import { cn } from "@/shared/utils/cn";

interface MobileSidebarProps {
  onClose: () => void;
  onLinkClick: (section: string) => void;
}

export const MobileSidebar = ({ onClose, onLinkClick }: MobileSidebarProps) => {
  return (
    <div
      className={cn(
        "fixed top-74px right-0 w-full h-[calc(100vh-64px)] mobile:block hidden z-10",
      )}
    >
      <div className={cn("flex h-full")}>
        <div
          className={cn("w-[calc(100vw-129px)]", "bg-black/40")}
          onClick={onClose}
        ></div>
        <div className={cn("w-[129px] bg-white")}>
          <div className={cn("flex flex-col gap-[2.5rem] text-body3b m-26")}>
            {links.map((link, index) => (
              <button
                key={index}
                onClick={() => onLinkClick(link.section)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
