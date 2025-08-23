import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { seatBooking } from "@/entities/booking/api/seatBooking";
import { Seat } from "@/entities/booking/model/types";
import { useQueryClient } from "@tanstack/react-query";
import { seatQueryKeys } from "@/entities/booking/lib/useSeatState";

export function useSeatBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Seat, "status">) => seatBooking(data),
    onSuccess: (_result, vars) => {
      toast.success("좌석 예매가 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: seatQueryKeys.seatState(vars.section) });
      queryClient.invalidateQueries({ queryKey: seatQueryKeys.allSeats() });
    },
    onError: error => {
      console.error(error);
      toast.error("좌석 예매에 실패했습니다.");
    },
  });
}
