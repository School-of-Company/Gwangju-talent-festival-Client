import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { seatBooking } from "../api/seatBooking";
import { Seat } from "../model/types";

export function useSeatBooking() {
  return useMutation({
    mutationFn: (data: Omit<Seat, "status">) => seatBooking(data),
    onSuccess: () => {
      toast.success("좌석 예매가 완료되었습니다.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("좌석 예매에 실패했습니다.");
    },
  });
} 