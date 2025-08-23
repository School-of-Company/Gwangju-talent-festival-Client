export const SECTIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const;

export type Section = (typeof SECTIONS)[number];
export type SectionType = Section | null;

export const SEAT_STATUS = {
  OCCUPIED: "occupied",
  AVAILABLE: "available",
  SELECTED: "selected",
} as const;

export type SeatStatus = (typeof SEAT_STATUS)[keyof typeof SEAT_STATUS];

export interface Seat {
  seatNumber: string;
  status: SeatStatus;
  section: Section;
}

export interface SeatLayout {
  section: Section;
  seats: Seat[];
}

export interface SelectedSeatInfo {
  seat: Seat;
  section: Section;
}

export interface SeatInfo {
  occupied: number;
  total: number;
}

export const SEAT_INFO: Record<Section, SeatInfo> = {
  A: { occupied: 0, total: 77 },
  B: { occupied: 0, total: 130 },
  C: { occupied: 0, total: 154 },
  D: { occupied: 0, total: 130 },
  E: { occupied: 0, total: 77 },
  F: { occupied: 0, total: 54 },
  G: { occupied: 0, total: 100 },
  H: { occupied: 0, total: 119 },
  I: { occupied: 0, total: 100 },
  J: { occupied: 0, total: 54 },
} as const;

type SectionKey<T extends Section> = `section_${Lowercase<T>}`;

type AllSectionKeys = {
  [K in Section as SectionKey<K>]: boolean[];
};

export type AllSeatsApiResponse = AllSectionKeys;

export interface SectionSeatsApiResponse {
  seats: boolean[];
}

export const getSectionFromKey = (key: keyof AllSeatsApiResponse): Section => {
  const sectionLetter = key.replace("section_", "").toUpperCase() as Section;
  if (SECTIONS.includes(sectionLetter)) {
    return sectionLetter;
  }
  throw new Error(`Invalid section key: ${key}`);
};
