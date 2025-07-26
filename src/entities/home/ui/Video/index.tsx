"use client";

import { cn } from "@/shared/utils/cn";
import { useEffect, useRef } from "react";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(err => {
      console.warn("Autoplay blocked:", err);
    });
  }, []);

  return (
    <div className={cn("relative", "w-full", "h-full", "select-none")}>
      <video
        ref={videoRef}
        className={cn("w-full", "h-full", "object-cover")}
        autoPlay
        muted
        playsInline
        preload="auto"
        loop
      >
        <source
          src="https://kr.object.ncloudstorage.com/gwangju-talent-festival-bucket/video%20(2).mp4"
          type="video/mp4"
        />
      </video>

      <div
        className={cn(
          "absolute",
          "inset-0",
          "select-none",
          "bg-gradient-to-t",
          "from-black/100",
          "via-transparent",
          "to-transparent",
          "[background-position:0_30%]",
        )}
      />

      <div
        className={cn(
          "absolute",
          "bottom-[12%]",
          "left-0",
          "w-full",
          "px-4",
          "mobile:bottom-[6%]",
          "select-none",
        )}
      >
        <div
          className={cn(
            "max-w-[1060px]",
            "mx-auto",
            "text-white",
            "text-sm",
            "rounded",
            "flex",
            "flex-col",
            "gap-14",
            "tablet:pl-20",
            "mobile:pl-10",
            "mobile:gap-0",
            "select-none",
          )}
        >
          <p
            className={cn(
              "font-bold",
              "text-title1b",
              "tablet:text-body1b",
              "mobile:text-caption1b",
              "select-none",
            )}
          >
            光탈페 (광주학생탈렌트페스티벌)
          </p>
          <p
            className={cn(
              "text-title4r",
              "tablet:text-body3r",
              "mobile:text-caption3r",
              "!leading-[130%]",
            )}
          >
            <span className={cn("inline-block")}>
              光탈페는 광주학생의회가 중심이 되어{"\u00A0"}
            </span>
            <span className={cn("inline-block")}>학생들이 재능을 펼치고 즐길 수 있도록 기획된</span>
            <span className={cn("block")}>학생주도형 오디션 프로그램입니다</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
