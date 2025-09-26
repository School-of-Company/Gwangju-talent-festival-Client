import { Section, Seat, SEAT_STATUS } from "./types";

export interface LotterySeatConfig {
  id: string;
  seats: Array<{
    section: Section;
    seatNumber: string;
  }>;
}

export const LOTTERY_SEAT_CONFIGS: Record<string, LotterySeatConfig> = {
  "1": {
    id: "1",
    seats: [
      { section: "A", seatNumber: "1" },
      { section: "B", seatNumber: "2" },
      { section: "C", seatNumber: "3" },
      { section: "D", seatNumber: "4" },
      { section: "E", seatNumber: "5" },
    ]
  },
  "2": {
    id: "2", 
    seats: [
      { section: "B", seatNumber: "1" },
      { section: "B", seatNumber: "2" },
      { section: "B", seatNumber: "3" },
      { section: "B", seatNumber: "4" },
      { section: "B", seatNumber: "5" },
      { section: "B", seatNumber: "6" },
      { section: "B", seatNumber: "7" },
      { section: "B", seatNumber: "8" },
    ]
  },
  "3": {
    id: "3",
    seats: [
      { section: "C", seatNumber: "1" },
      { section: "C", seatNumber: "2" },
      { section: "C", seatNumber: "3" },
      { section: "C", seatNumber: "4" },
      { section: "C", seatNumber: "5" },
      { section: "C", seatNumber: "6" },
      { section: "C", seatNumber: "7" },
      { section: "C", seatNumber: "8" },
      { section: "C", seatNumber: "9" },
      { section: "C", seatNumber: "10" },
    ]
  },
  "4": {
    id: "4",
    seats: [
      { section: "D", seatNumber: "1" },
      { section: "D", seatNumber: "2" },
      { section: "D", seatNumber: "3" },
      { section: "D", seatNumber: "4" },
      { section: "D", seatNumber: "5" },
      { section: "D", seatNumber: "6" },
      { section: "D", seatNumber: "7" },
      { section: "D", seatNumber: "8" },
      { section: "D", seatNumber: "9" },
      { section: "D", seatNumber: "10" },
      { section: "D", seatNumber: "11" },
      { section: "D", seatNumber: "12" },
    ]
  },
  "5": {
    id: "5",
    seats: [
      { section: "E", seatNumber: "1" },
      { section: "E", seatNumber: "2" },
      { section: "E", seatNumber: "3" },
      { section: "E", seatNumber: "4" },
      { section: "E", seatNumber: "5" },
      { section: "E", seatNumber: "6" },
      { section: "E", seatNumber: "7" },
      { section: "E", seatNumber: "8" },
      { section: "E", seatNumber: "9" },
      { section: "E", seatNumber: "10" },
      { section: "E", seatNumber: "11" },
      { section: "E", seatNumber: "12" },
      { section: "E", seatNumber: "13" },
      { section: "E", seatNumber: "14" },
      { section: "E", seatNumber: "15" },
    ]
  }
};

export const getLotteryConfig = (id: string): LotterySeatConfig | null => {
  return LOTTERY_SEAT_CONFIGS[id] || null;
};

export const convertToSeats = (config: LotterySeatConfig): Seat[] => {
  return config.seats.map(seat => ({
    seatNumber: seat.seatNumber,
    section: seat.section,
    status: SEAT_STATUS.AVAILABLE
  }));
};
