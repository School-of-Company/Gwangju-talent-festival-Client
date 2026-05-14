import { SignInFormValues, SignUpFormValues } from "../model/schema";

export interface AuthFormState {
  values: Record<string, string>;
  isValid: boolean;
  submitted: boolean;
  error?: string | string[];
  shouldRedirect?: boolean;
  redirectTo?: string;
}

export type AuthFormValues = SignInFormValues | SignUpFormValues;
