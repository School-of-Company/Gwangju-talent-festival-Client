import { describe, it, expect } from "vitest";
import { formReducer, initialFormState, FormState } from "../formReducer";

describe("formReducer - UPDATE_FIELD", () => {
  it("slogan 필드를 업데이트한다", () => {
    const next = formReducer(initialFormState, { type: "UPDATE_FIELD", field: "slogan", value: "광주인재" });
    expect(next.formValues.slogan).toBe("광주인재");
  });

  it("grade 필드를 업데이트한다", () => {
    const next = formReducer(initialFormState, { type: "UPDATE_FIELD", field: "grade", value: "3" });
    expect(next.formValues.grade).toBe("3");
  });

  it("업데이트한 필드 외 나머지 필드는 변경되지 않는다", () => {
    const next = formReducer(initialFormState, { type: "UPDATE_FIELD", field: "slogan", value: "광주" });
    expect(next.formValues.description).toBe("");
    expect(next.formValues.school).toBe("");
  });
});

describe("formReducer - SET_SUBMITTING", () => {
  it("isSubmitting을 true로 설정한다", () => {
    const next = formReducer(initialFormState, { type: "SET_SUBMITTING", value: true });
    expect(next.isSubmitting).toBe(true);
  });

  it("isSubmitting을 false로 설정한다", () => {
    const state: FormState = { ...initialFormState, isSubmitting: true };
    const next = formReducer(state, { type: "SET_SUBMITTING", value: false });
    expect(next.isSubmitting).toBe(false);
  });
});

describe("formReducer - SET_SUBMITTED", () => {
  it("isSubmitted를 true로 설정한다", () => {
    const next = formReducer(initialFormState, { type: "SET_SUBMITTED", value: true });
    expect(next.isSubmitted).toBe(true);
  });

  it("isSubmitted를 false로 설정한다", () => {
    const state: FormState = { ...initialFormState, isSubmitted: true };
    const next = formReducer(state, { type: "SET_SUBMITTED", value: false });
    expect(next.isSubmitted).toBe(false);
  });
});
