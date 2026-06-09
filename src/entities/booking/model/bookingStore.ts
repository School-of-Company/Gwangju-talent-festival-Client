import { create } from "zustand";
import { Section, Seat, SEAT_STATUS } from "./types";
import { MAX_PERFORMER_SEATS } from "./constants";
import { getTokenFromCookie } from "@/shared/utils/auth";

interface BookingStore {
  selectedSection: Section | null;
  selectedSeat: Seat | null;
  selectedSeats: Seat[];
  isPerformerMode: boolean;

  setSelectedSection: (section: Section | null) => void;
  selectSeat: (seat: Seat, maxSelectableSeats?: number) => void;
  removeOccupiedSeat: (section: Section, seatNumber: string) => void;
  setPerformerMode: (isPerformer: boolean) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  selectedSection: null,
  selectedSeat: null,
  selectedSeats: [],
  isPerformerMode: getTokenFromCookie("role") === "ROLE_PERFORMER",

  setSelectedSection: section =>
    set({ selectedSection: section, selectedSeat: null, selectedSeats: [] }),

  selectSeat: (seat, maxSelectableSeats = MAX_PERFORMER_SEATS) => {
    if (seat.status === SEAT_STATUS.OCCUPIED) return;
    const { isPerformerMode, selectedSeats, selectedSeat } = get();

    if (isPerformerMode) {
      const isAlreadySelected = selectedSeats.some(
        s => s.seatNumber === seat.seatNumber && s.section === seat.section,
      );
      if (isAlreadySelected) {
        set({
          selectedSeats: selectedSeats.filter(
            s => !(s.seatNumber === seat.seatNumber && s.section === seat.section),
          ),
        });
      } else {
        if (maxSelectableSeats <= 0) return;
        const next =
          selectedSeats.length >= maxSelectableSeats
            ? [...selectedSeats.slice(1), seat]
            : [...selectedSeats, seat];
        set({ selectedSeats: next });
      }
    } else {
      const isSameSeat =
        selectedSeat?.seatNumber === seat.seatNumber && selectedSeat?.section === seat.section;
      set({ selectedSeat: isSameSeat ? null : seat });
    }
  },

  removeOccupiedSeat: (section, seatNumber) =>
    set(state => ({
      selectedSeats: state.selectedSeats.filter(
        s => !(s.section === section && s.seatNumber === seatNumber),
      ),
      selectedSeat:
        state.selectedSeat?.section === section && state.selectedSeat?.seatNumber === seatNumber
          ? null
          : state.selectedSeat,
    })),

  setPerformerMode: isPerformer => set({ isPerformerMode: isPerformer }),

  reset: () => set({ selectedSection: null, selectedSeat: null, selectedSeats: [] }),
}));
