import { SloganFormValues } from "../model/schema";

export interface FormState {
  formValues: SloganFormValues;
  isSubmitted: boolean;
  isSubmitting: boolean;
}

export type FormAction =
  | { type: "UPDATE_FIELD"; field: keyof SloganFormValues; value: string }
  | { type: "SET_SUBMITTING"; value: boolean }
  | { type: "SET_SUBMITTED"; value: boolean };

export const initialFormState: FormState = {
  formValues: {
    slogan: "",
    description: "",
    school: "",
    grade: "",
    name: "",
    classroom: "",
    phone_number: "",
  },
  isSubmitted: false,
  isSubmitting: false,
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
    default:
      return state;
  }
};
