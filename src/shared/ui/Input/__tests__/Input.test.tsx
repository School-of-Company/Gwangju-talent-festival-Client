import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Input from "../index";

describe("Input", () => {
  it("label이 렌더링된다", () => {
    render(<Input type="text" label="이름" />);
    expect(screen.getByText("이름")).toBeInTheDocument();
  });

  it("placeholder가 렌더링된다", () => {
    render(<Input type="text" placeholder="입력해주세요" />);
    expect(screen.getByPlaceholderText("입력해주세요")).toBeInTheDocument();
  });

  it("텍스트 입력이 동작한다", async () => {
    const user = userEvent.setup();
    render(<Input type="text" />);
    const input = screen.getByRole("textbox");
    await user.type(input, "테스트");
    expect(input).toHaveValue("테스트");
  });

  it("password 타입일 때 토글 버튼이 보인다", () => {
    render(<Input type="password" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("password 토글 시 type이 변경된다", async () => {
    const user = userEvent.setup();
    render(<Input type="password" id="password" label="비밀번호" />);
    const input = screen.getByLabelText("비밀번호") as HTMLInputElement;
    expect(input.type).toBe("password");
    await user.click(screen.getByRole("button"));
    expect(input.type).toBe("text");
  });
});
