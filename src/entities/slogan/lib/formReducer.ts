import { SloganFormValues } from "../model/schema";

export interface FormState {
  formValues: SloganFormValues;
  isSubmitted: boolean;
  isSubmitting: boolean;
  isOutOfSchool: boolean;
}

export type FormAction =
  | { type: "UPDATE_FIELD"; field: keyof SloganFormValues; value: string }
  | { type: "SET_SUBMITTING"; value: boolean }
  | { type: "SET_SUBMITTED"; value: boolean }
  | { type: "TOGGLE_OUT_OF_SCHOOL" };

export const initialFormState: FormState = {
  formValues: {
    slogan: "",
    description: "",
    name: "",
    school: "",
    grade: "",
    classroom: "",
    phone_number: "",
    birthday: "",
  },
  isSubmitted: false,
  isSubmitting: false,
  isOutOfSchool: false,
};

export const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formValues: { ...state.formValues, [action.field]: action.value },
      };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };
    case "SET_SUBMITTED":
      return { ...state, isSubmitted: action.value };
    case "TOGGLE_OUT_OF_SCHOOL": {
      const next = !state.isOutOfSchool;
      return {
        ...state,
        isOutOfSchool: next,
        formValues: next
          ? { ...state.formValues, school: "", grade: "", classroom: "" }
          : state.formValues,
      };
    }
    default:
      return state;
  }
};
