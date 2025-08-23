import { cn } from "@/shared/utils/cn";
import BookingPage from "@/views/booking/ui/BookingPage";

export default function Booking() {
  return (
    <div className={cn("flex justify-center")}>
      <BookingPage />
    </div>
  );
}
