import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AxiosResponse } from "axios";
import { handleSloganFormSubmit } from "../handleSloganFormSubmit";

vi.mock("@/entities/slogan/api/postSlogan", () => ({ postSlogan: vi.fn() }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

import { postSlogan } from "@/entities/slogan/api/postSlogan";
import { toast } from "sonner";

const mockPostSlogan = vi.mocked(postSlogan);
const mockSuccess = vi.mocked(toast.success);
const mockError = vi.mocked(toast.error);

const VALID_VALUES = {
  slogan: "광주인재페스티벌",
  description: "슬로건 설명입니다.",
  school: "광주고등학교",
  name: "홍길동",
  grade: "3",
  classroom: "5",
  phone_number: "01012345678",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("handleSloganFormSubmit - 제출 성공", () => {
  it("status 200이면 toast.success를 호출하고 응답을 반환한다", async () => {
    const res = { status: 200, data: {} } as AxiosResponse<unknown>;
    mockPostSlogan.mockResolvedValue(res);
    const result = await handleSloganFormSubmit(VALID_VALUES);
    expect(mockSuccess).toHaveBeenCalledWith("슬로건이 제출되었습니다.");
    expect(result).toBe(res);
  });

  it("status 201이면 toast.success를 호출하고 응답을 반환한다", async () => {
    const res = { status: 201, data: {} } as AxiosResponse<unknown>;
    mockPostSlogan.mockResolvedValue(res);
    const result = await handleSloganFormSubmit(VALID_VALUES);
    expect(mockSuccess).toHaveBeenCalledWith("슬로건이 제출되었습니다.");
    expect(result).toBe(res);
  });
});

describe("handleSloganFormSubmit - 제출 실패", () => {
  it("API가 예외를 던지면 toast.error를 호출한다", async () => {
    mockPostSlogan.mockRejectedValue(new Error("network error"));
    await handleSloganFormSubmit(VALID_VALUES);
    expect(mockError).toHaveBeenCalledWith("슬로건 제출에 실패했습니다.");
  });

  it("비정상 상태코드(400)이면 toast.error를 호출한다", async () => {
    mockPostSlogan.mockResolvedValue({ status: 400, data: {} } as AxiosResponse<unknown>);
    await handleSloganFormSubmit(VALID_VALUES);
    expect(mockError).toHaveBeenCalledWith("슬로건 제출에 실패했습니다.");
  });

  it("비정상 상태코드(500)이면 toast.error를 호출한다", async () => {
    mockPostSlogan.mockResolvedValue({ status: 500, data: {} } as AxiosResponse<unknown>);
    await handleSloganFormSubmit(VALID_VALUES);
    expect(mockError).toHaveBeenCalledWith("슬로건 제출에 실패했습니다.");
  });
});
