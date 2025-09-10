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
  const onSeatChangeRef = useRef(onSeatChange);
  
  useEffect(() => {
    onSeatChangeRef.current = onSeatChange;
  }, [onSeatChange]);

  useEffect(() => {
    if (!enabled) return;

    const eventSource = new EventSource("/api/seat/changes", { 
      withCredentials: true 
    });
    eventSourceRef.current = eventSource;

    eventSource.addEventListener('SEAT_CHANGE', (event) => {
      try {
        const data = JSON.parse(event.data);
        
        const seatChangeEvent: SeatChangeEvent = {
          seat_section: data.seat_section,
          seat_number: data.seat_number,
          is_available: data.is_available,
        };
        
        if (onSeatChangeRef.current) {
          try {
            onSeatChangeRef.current(seatChangeEvent);
          } catch (callbackError) {
            throw callbackError;
          }
        }
      } catch (error) {
        throw error;
      }
    });

    eventSource.onerror = (error) => {
      throw error;
      toast.error("실시간 좌석 정보 연결에 실패했습니다.");
    };

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [enabled]);

  const closeConnection = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  return { closeConnection };
}
