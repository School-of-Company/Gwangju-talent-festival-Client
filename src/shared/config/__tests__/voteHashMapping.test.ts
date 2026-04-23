import { describe, it, expect } from "vitest";
import {
  VOTE_HASH_MAPPING,
  HASH_TO_ID_MAPPING,
  getHashFromId,
  getIdFromHash,
  isValidVoteHash,
} from "../voteHashMapping";

describe("VOTE_HASH_MAPPING / HASH_TO_ID_MAPPING 구조", () => {
  it("ID 1~12의 해시값이 모두 정의되어 있다", () => {
    for (let i = 1; i <= 12; i++) {
      expect(VOTE_HASH_MAPPING[String(i)]).toBeDefined();
    }
  });

  it("HASH_TO_ID_MAPPING은 VOTE_HASH_MAPPING의 역매핑이다", () => {
    Object.entries(VOTE_HASH_MAPPING).forEach(([id, hash]) => {
      expect(HASH_TO_ID_MAPPING[hash]).toBe(id);
    });
  });

  it("해시값이 중복 없이 유일하다", () => {
    const hashes = Object.values(VOTE_HASH_MAPPING);
    const uniqueHashes = new Set(hashes);
    expect(uniqueHashes.size).toBe(hashes.length);
  });
});

describe("getHashFromId", () => {
  it("유효한 ID에 대해 대응하는 해시를 반환한다", () => {
    expect(getHashFromId("1")).toBe("B86B273");
    expect(getHashFromId("6")).toBe("F58D3C7");
    expect(getHashFromId("12")).toBe("BD307A3");
  });

  it("범위를 벗어난 ID에 대해 null을 반환한다", () => {
    expect(getHashFromId("0")).toBeNull();
    expect(getHashFromId("13")).toBeNull();
  });

  it("빈 문자열에 대해 null을 반환한다", () => {
    expect(getHashFromId("")).toBeNull();
  });

  it("숫자가 아닌 문자열에 대해 null을 반환한다", () => {
    expect(getHashFromId("abc")).toBeNull();
  });
});

describe("getIdFromHash", () => {
  it("유효한 해시에 대해 대응하는 ID를 반환한다", () => {
    expect(getIdFromHash("B86B273")).toBe("1");
    expect(getIdFromHash("F58D3C7")).toBe("6");
    expect(getIdFromHash("BD307A3")).toBe("12");
  });

  it("존재하지 않는 해시에 대해 null을 반환한다", () => {
    expect(getIdFromHash("INVALID")).toBeNull();
    expect(getIdFromHash("0000000")).toBeNull();
  });

  it("빈 문자열에 대해 null을 반환한다", () => {
    expect(getIdFromHash("")).toBeNull();
  });
});

describe("isValidVoteHash", () => {
  it("매핑에 존재하는 해시는 true를 반환한다", () => {
    Object.values(VOTE_HASH_MAPPING).forEach(hash => {
      expect(isValidVoteHash(hash)).toBe(true);
    });
  });

  it("존재하지 않는 해시는 false를 반환한다", () => {
    expect(isValidVoteHash("INVALID")).toBe(false);
    expect(isValidVoteHash("1234567")).toBe(false);
  });

  it("빈 문자열은 false를 반환한다", () => {
    expect(isValidVoteHash("")).toBe(false);
  });

  it("ID 값 자체는 false를 반환한다", () => {
    expect(isValidVoteHash("1")).toBe(false);
    expect(isValidVoteHash("12")).toBe(false);
  });
});
