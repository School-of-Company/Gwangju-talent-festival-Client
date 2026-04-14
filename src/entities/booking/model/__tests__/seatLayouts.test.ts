import { describe, it, expect } from "vitest"
import { getSeatLayout, findSeatById, getAvailableSeatsCount, getSeatPattern } from "../seatLayouts"
import { SEAT_STATUS, SEAT_INFO } from "../types"

describe("getSeatLayout - 레이아웃 생성", () => {
  it("반환된 레이아웃의 section 필드가 요청한 섹션과 일치한다", () => {
    const layout = getSeatLayout("A")
    expect(layout.section).toBe("A")
  })

  it("각 섹션의 좌석 수는 SEAT_INFO의 total과 일치한다", () => {
    const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const
    sections.forEach(section => {
      const layout = getSeatLayout(section)
      expect(layout.seats).toHaveLength(SEAT_INFO[section].total)
    })
  })

  it("모든 좌석의 초기 상태는 AVAILABLE이다", () => {
    const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const
    sections.forEach(section => {
      const layout = getSeatLayout(section)
      layout.seats.forEach(seat => {
        expect(seat.status).toBe(SEAT_STATUS.AVAILABLE)
      })
    })
  })

  it("각 좌석의 section 필드가 해당 섹션으로 설정된다", () => {
    const layout = getSeatLayout("B")
    layout.seats.forEach(seat => {
      expect(seat.section).toBe("B")
    })
  })
})

describe("findSeatById - ID로 좌석 조회", () => {
  it("존재하는 좌석 번호로 조회하면 해당 좌석을 반환한다", () => {
    const seat = findSeatById("1", "A")
    expect(seat).toBeDefined()
    expect(seat?.seatNumber).toBe("1")
    expect(seat?.section).toBe("A")
  })

  it("존재하지 않는 좌석 번호로 조회하면 undefined를 반환한다", () => {
    const seat = findSeatById("9999", "A")
    expect(seat).toBeUndefined()
  })

  it("해당 섹션의 최대 좌석 수를 초과한 번호는 undefined를 반환한다", () => {
    // 섹션 A의 total은 77
    const seat = findSeatById("78", "A")
    expect(seat).toBeUndefined()
  })

  it("섹션 내 마지막 좌석 번호로 조회할 수 있다", () => {
    // 섹션 F의 total은 54
    const seat = findSeatById("54", "F")
    expect(seat).toBeDefined()
    expect(seat?.seatNumber).toBe("54")
  })
})

describe("getAvailableSeatsCount - 빈 좌석 카운트", () => {
  it("초기 상태에서 빈 좌석 수는 전체 좌석 수와 같다", () => {
    const count = getAvailableSeatsCount("A")
    expect(count).toBe(SEAT_INFO["A"].total)
  })

  it("모든 섹션의 초기 빈 좌석 수가 SEAT_INFO total과 일치한다", () => {
    const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const
    sections.forEach(section => {
      const count = getAvailableSeatsCount(section)
      expect(count).toBe(SEAT_INFO[section].total)
    })
  })
})

describe("getSeatPattern - 섹션 패턴 조회", () => {
  it("2차원 배열을 반환한다", () => {
    const pattern = getSeatPattern("A")
    expect(Array.isArray(pattern)).toBe(true)
    expect(pattern.every(row => Array.isArray(row))).toBe(true)
  })

  it("패턴의 숫자 요소 수는 SEAT_INFO.total과 일치한다", () => {
    const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const
    sections.forEach(section => {
      const count = getSeatPattern(section).flat().filter(n => n !== null).length
      expect(count).toBe(SEAT_INFO[section].total)
    })
  })

  it("A·E·G·H·I·J 섹션 패턴에는 null이 포함된다", () => {
    const sectionsWithNulls = ["A", "E", "G", "H", "I", "J"] as const
    sectionsWithNulls.forEach(section => {
      const hasNull = getSeatPattern(section).flat().some(n => n === null)
      expect(hasNull).toBe(true)
    })
  })

  it("B·C·D 섹션 패턴에는 null이 없다", () => {
    const sectionsWithoutNulls = ["B", "C", "D"] as const
    sectionsWithoutNulls.forEach(section => {
      const hasNull = getSeatPattern(section).flat().some(n => n === null)
      expect(hasNull).toBe(false)
    })
  })
})

describe("getSeatLayout - 좌석 번호 형식", () => {
  it("좌석 번호는 문자열 타입이다", () => {
    const layout = getSeatLayout("A")
    layout.seats.forEach(seat => {
      expect(typeof seat.seatNumber).toBe("string")
    })
  })

  it("각 섹션의 첫 번째 좌석 번호는 '1'이다", () => {
    const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const
    sections.forEach(section => {
      expect(getSeatLayout(section).seats[0].seatNumber).toBe("1")
    })
  })

  it("같은 섹션 내 좌석 번호는 중복되지 않는다", () => {
    const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] as const
    sections.forEach(section => {
      const numbers = getSeatLayout(section).seats.map(s => s.seatNumber)
      expect(new Set(numbers).size).toBe(numbers.length)
    })
  })
})

describe("findSeatById - 엣지 케이스", () => {
  it("좌석 번호 '0'은 존재하지 않는다", () => {
    expect(findSeatById("0", "A")).toBeUndefined()
  })

  it("섹션이 다르면 같은 번호도 해당 섹션 기준으로 독립적으로 조회된다", () => {
    const seatA = findSeatById("1", "A")
    const seatB = findSeatById("1", "B")
    expect(seatA?.section).toBe("A")
    expect(seatB?.section).toBe("B")
  })
})
