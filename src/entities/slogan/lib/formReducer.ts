import { SloganFormValues } from "../model/schema";

export interface FormState {
  formValues: SloganFormValues;
  isSubmitted: boolean;
  isSubmitting: boolean;
  isOutOfSchool: boolean;
  isSchoolConfirmed: boolean;
  touchedFields: Partial<Record<keyof SloganFormValues, boolean>>;
}

export type FormAction =
  | { type: "UPDATE_FIELD"; field: keyof SloganFormValues; value: string }
  | { type: "CONFIRM_SCHOOL"; value: string }
  | { type: "SET_SUBMITTING"; value: boolean }
  | { type: "SET_SUBMITTED"; value: boolean }
  | { type: "TOGGLE_OUT_OF_SCHOOL" }
  | { type: "TOUCH_FIELD"; field: keyof SloganFormValues };

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
  isSchoolConfirmed: false,
  touchedFields: {},
};

export const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formValues: { ...state.formValues, [action.field]: action.value },
        ...(action.field === "school" ? { isSchoolConfirmed: false } : {}),
      };
    case "CONFIRM_SCHOOL":
      return {
        ...state,
        formValues: { ...state.formValues, school: action.value },
        isSchoolConfirmed: true,
        touchedFields: { ...state.touchedFields, school: true },
      };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };
    case "SET_SUBMITTED":
      return { ...state, isSubmitted: action.value };
    case "TOUCH_FIELD":
      return { ...state, touchedFields: { ...state.touchedFields, [action.field]: true } };
    case "TOGGLE_OUT_OF_SCHOOL": {
      const next = !state.isOutOfSchool;
      return {
        ...state,
        isOutOfSchool: next,
        isSchoolConfirmed: false,
        formValues: next
          ? { ...state.formValues, school: "", grade: "", classroom: "" }
          : { ...state.formValues, birthday: "" },
      };
    }
    default:
      return state;
  }
};
