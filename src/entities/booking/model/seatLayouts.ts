import { Section, SeatLayout, Seat, SEAT_STATUS, SEAT_INFO } from "./types";

const SECTION_SEAT_PATTERNS: Record<Section, (number | null)[][]> = {
  A: [
    [null, null, null, 1, 2, 3],
    [null, null, 4, 5, 6, 7],
    [null, 8, 9, 10, 11, 12],
    [null, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41],
    [42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59],
    [60, 61, 62, 63, 64, 65],
    [66, 67, 68, 69, 70, 71],
    [72, 73, 74, 75, 76, 77],
  ],

  B: Array.from({ length: 13 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, colIndex) => rowIndex * 10 + colIndex + 1),
  ),

  C: Array.from({ length: 14 }, (_, rowIndex) =>
    Array.from({ length: 11 }, (_, colIndex) => rowIndex * 11 + colIndex + 1),
  ),

  D: Array.from({ length: 13 }, (_, rowIndex) =>
    Array.from({ length: 10 }, (_, colIndex) => rowIndex * 10 + colIndex + 1),
  ),

  E: [
    [1, 2, 3, null, null, null],
    [4, 5, 6, 7, null, null],
    [8, 9, 10, 11, 12, null],
    [13, 14, 15, 16, 17, null],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41],
    [42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59],
    [60, 61, 62, 63, 64, 65],
    [66, 67, 68, 69, 70, 71],
    [72, 73, 74, 75, 76, 77],
  ],

  F: [
    [null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44],
    [45, 46, 47, 48, 49],
    [50, 51, 52, 53, 54],
  ],

  G: [
    [null, 1, 2, 3, 4, 5, null, null, null, null, null],
    [6, 7, 8, 9, 10, 11, null, null, null, null, null],
    [12, 13, 14, 15, 16, 17, null, null, null, null, null],
    [18, 19, 20, 21, 22, 23, null, null, null, null, null],
    [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56],
    [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67],
    [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
    [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
    [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
  ],

  H: [
    [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, null],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
    [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
    [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
    [76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
    [87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97],
    [98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108],
    [109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119],
  ],

  I: [
    [null, null, null, null, null, 1, 2, 3, 4, 5, null],
    [null, null, null, null, null, 6, 7, 8, 9, 10, 11],
    [null, null, null, null, null, 12, 13, 14, 15, 16, 17],
    [null, null, null, null, null, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56],
    [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67],
    [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
    [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
    [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
  ],

  J: [
    [1, 2, 3, 4, null],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44],
    [45, 46, 47, 48, 49],
    [50, 51, 52, 53, 54],
  ],
};

const generateSeatLayout = (section: Section): SeatLayout => {
  const seatInfo = SEAT_INFO[section];
  const { total } = seatInfo;
  const pattern = SECTION_SEAT_PATTERNS[section];

  const seats: Seat[] = [];
  let seatIndex = 0;

  pattern.forEach(row => {
    row.forEach(seatNumber => {
      if (seatNumber !== null && seatIndex < total) {
        const status = SEAT_STATUS.AVAILABLE;

        seats.push({
          seatNumber: seatNumber.toString(),
          status,
          section,
        });

        seatIndex++;
      }
    });
  });

  return {
    section,
    seats,
  };
};

export const SEAT_LAYOUTS: Record<Section, SeatLayout> = Object.freeze({
  A: Object.freeze(generateSeatLayout("A")),
  B: Object.freeze(generateSeatLayout("B")),
  C: Object.freeze(generateSeatLayout("C")),
  D: Object.freeze(generateSeatLayout("D")),
  E: Object.freeze(generateSeatLayout("E")),
  F: Object.freeze(generateSeatLayout("F")),
  G: Object.freeze(generateSeatLayout("G")),
  H: Object.freeze(generateSeatLayout("H")),
  I: Object.freeze(generateSeatLayout("I")),
  J: Object.freeze(generateSeatLayout("J")),
});

export const getSeatLayout = (section: Section): SeatLayout => {
  return SEAT_LAYOUTS[section];
};

export const findSeatById = (seatNumber: string, section: Section): Seat | undefined => {
  const layout = SEAT_LAYOUTS[section];
  return layout.seats.find(seat => seat.seatNumber === seatNumber);
};

export const getAvailableSeatsCount = (section: Section): number => {
  const layout = SEAT_LAYOUTS[section];
  return layout.seats.filter(seat => seat.status === SEAT_STATUS.AVAILABLE).length;
};

export const getSeatPattern = (section: Section): (number | null)[][] => {
  return SECTION_SEAT_PATTERNS[section];
};
