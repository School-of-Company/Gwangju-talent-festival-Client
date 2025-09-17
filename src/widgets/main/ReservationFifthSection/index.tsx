"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/shared/utils/cn";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import Button from "@/shared/ui/Button";
import { redirect } from "next/navigation";
import { ticketOpenDate, performerTicketOpenDate } from "@/shared/config/authConfig";
import { useMySeat } from "@/entities/booking/lib/useMySeat";
import { getTokenFromCookie } from "@/shared/utils/auth";
import { isLoggedIn } from "@/shared/utils/auth";

const formatDateLeft = (timeLeft: number) => {
  const DAY = 1000 * 60 * 60 * 24;
  const HOUR = 1000 * 60 * 60;
  const MIN = 1000 * 60;
  const SEC = 1000;
  if (timeLeft < DAY) {
    if (timeLeft < HOUR) {
      return `${String(Math.floor(timeLeft / MIN)).padStart(2, "0")}분 ${String(Math.floor((timeLeft % MIN) / SEC)).padStart(2, "0")}초 후`;
    } else {
      return `${String(Math.floor(timeLeft / HOUR)).padStart(2, "0")}시간 후`;
    }
  } else {
    return `D-${Math.round(timeLeft / DAY)}`;
  }
};

const ReservationFifthSection = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { data: mySeat, refetch: refetchMySeat } = useMySeat();

  useEffect(() => {
    const updateUserRole = () => {
      if (typeof window !== "undefined") {
        const role = getTokenFromCookie("role");
        setUserRole(role);
      }
    };

    updateUserRole();

    const handleStorageChange = () => {
      updateUserRole();
      refetchMySeat();
    };

    window.addEventListener('storage', handleStorageChange);
    
    const handleFocus = () => {
      updateUserRole();
      refetchMySeat();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [refetchMySeat]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const relevantTicketOpenDate = (userRole === "ROLE_PERFORMER") ? performerTicketOpenDate : ticketOpenDate;
      const difference = relevantTicketOpenDate.getTime() - now.getTime();
      setTimeLeft(difference > 0 ? difference : 0);
    };

    if (userRole !== null && isLoggedIn()) {
      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer);
    } else {
      const now = new Date();
      const difference = ticketOpenDate.getTime() - now.getTime();
      console.log("else",difference);
      setTimeLeft(difference > 0 ? difference : 0);
    }
  }, [userRole]);

  return (
    <section
      id="ReservationFifthSection"
      className={cn(
        "relative h-full max-h-[600px] bg-main-100 overflow-hidden tablet:h-[800px] justify-items-center mt-20",
      )}
    >
      <div className={cn("z-0")}>
        <div className={cn("absolute left-[1%] top-0 h-full w-[26%] mobile:w-[30%]")}>
          <Image src="/images/starline.png" alt="Star Line" fill />
        </div>
        <div className={cn("absolute right-[4%] top-0 h-full w-[26%] mobile:w-[30%]")}>
          <Image src="/images/trophyline.png" alt="Trophy Line" fill />
        </div>
        <div
          className={cn(
            "absolute left-0 top-[40%] translate-y-[-50%] w-[30%] aspect-square tablet:left-0 mobile:w-[40%] mobile:top-[60%] mobile:left-[-4%]",
          )}
        >
          <Image src="/images/star.png" alt="Star" fill />
        </div>
        <div
          className={cn(
            "absolute right-[4%] top-[40%] translate-y-[-50%] w-[30%] aspect-square z-0 mobile:w-[40%] mobile:right-[-10%]",
          )}
        >
          <Image src="/images/trophy.png" alt="Trophy" fill />
        </div>
      </div>

      <div className={cn("relative w-full text-center mt-[66px] mobile:mt-[2rem]")}>
        <SectionTitle title="본선 좌석예매" className="mb-28" />
        <div
          className={cn(
            "flex flex-col gap-[40px] mb-[60px] bg-white rounded-[12px] py-[72px] px-[60px] text-center w-[376px] mobile:p-[24px] mobile:w-fit justify-self-center mx-auto mobile:mb-[15px] mobile:gap-[24px]",
          )}
        >
          <p className={cn("text-body1b mobile:text-caption1b")}>티켓오픈안내</p>
          <p className={cn("text-title1b text-main-600 mobile:text-body1b")}>
            {timeLeft > 0 ? (
              formatDateLeft(timeLeft)
            ) : (
              mySeat && userRole === "ROLE_PERFORMER" ? (
                <div className="flex gap-2 w-full">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      redirect("/booking/my");
                    }}
                  >
                    내 좌석 보기
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      redirect("/booking");
                    }}
                  >
                    추가 예매
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => {
                    redirect(mySeat ? "/booking/my" : "/booking");
                  }}
                >
                  {mySeat ? "내 좌석 보러가기" : "예매하기"}
                </Button>
              )
            )}
          </p>

          <div className={cn("flex justify-center gap-4 items-center")}>
            <span className={cn("text-body2r mobile:text-caption2r")}>티켓오픈</span>
            <span className={cn("text-body2r text-gray-500 mobile:text-caption2r")}>
              {((userRole === "ROLE_PERFORMER") ? performerTicketOpenDate : ticketOpenDate).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </div>
          <span className={cn("text-body2b text-main-600 mobile:text-caption2b")}>
            현장에서 실물티켓으로 교환 후 입장 가능합니다.
          </span>
        </div>
      </div>
    </section>
  );
};

export default ReservationFifthSection;
