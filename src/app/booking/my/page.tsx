import { cn } from "@/shared/utils/cn";
import MyBookingPage from "@/views/booking/ui/MyBookingPage";

export default function Booking() {
  return (
    <div className={cn("flex justify-center")}>
      <MyBookingPage />
    </div>
  );
}
