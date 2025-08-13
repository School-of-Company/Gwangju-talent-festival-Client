import { SignInFormValues, SignUpFormValues } from "../model/schema";

export interface authFormState {
  values: Record<string, string>;
  isValid: boolean;
  submitted: boolean;
  isLoading?: boolean;
  error?: string;
}

export type authFormValues = SignInFormValues | SignUpFormValues;
