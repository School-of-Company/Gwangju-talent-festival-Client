import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { SeatChangeEvent } from "../model/types";

interface UseSeatChangeSSEOptions {
  onSeatChange?: (event: SeatChangeEvent) => void;
  enabled?: boolean;
}

export function useSeatChangeSSE(options: UseSeatChangeSSEOptions = {}) {
  const { onSeatChange, enabled = true } = options;
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const eventSource = new EventSource("/api/seat/changes", { 
      withCredentials: true 
    });
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
       if (data.event === "SEAT_CHANGE" && data.body) {
          const seatChangeEvent: SeatChangeEvent = {
            seat_section: data.body.seat_section,
            seat_number: data.body.seat_number,
            is_available: data.body.is_available,
          };
          
          onSeatChange?.(seatChangeEvent);
        }
      } catch (error) {
        console.error(error);
      }
    };

    eventSource.onerror = (error) => {
      console.error(error);
      toast.error("실시간 좌석 정보 연결에 실패했습니다.");
    };

    eventSource.onopen = () => {
      console.log("SSE 연결이 열렸습니다.");
    }; 

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [enabled, onSeatChange]);

  const closeConnection = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  return { closeConnection };
}
