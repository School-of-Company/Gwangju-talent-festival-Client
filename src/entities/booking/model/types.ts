export const SECTIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const;

export type Section = typeof SECTIONS[number];
export type SectionType = Section | null;

export interface SeatInfo {
  occupied: number;
  total: number;
}

export interface SectionDropdownProps {
  section: Section;
  isSelected: boolean;
  seatInfo: string;
  onClick: () => void;
  className?: string;
}

export interface SelectSectionProps {
  onSectionSelect?: (section: SectionType) => void;
  className?: string;
}

export const SEAT_INFO: Record<Section, SeatInfo> = {
  "A": { occupied: 117, total: 118 },
  "B": { occupied: 115, total: 118 },
  "C": { occupied: 110, total: 118 },
  "D": { occupied: 112, total: 118 },
  "E": { occupied: 108, total: 118 },
  "F": { occupied: 114, total: 118 },
  "G": { occupied: 109, total: 118 },
  "H": { occupied: 113, total: 118 },
  "I": { occupied: 116, total: 118 },
  "J": { occupied: 111, total: 118 },
} as const; 