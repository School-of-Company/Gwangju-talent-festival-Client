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
      queryClient.invalidateQueries({ queryKey: seatQueryKeys.seatState(vars.section) });
    },
    onError: error => {
      console.error(error);
      toast.error(error.message);
    },
  });
}
