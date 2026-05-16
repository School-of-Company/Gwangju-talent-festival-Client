import { FormState } from "./formReducer";
import { SloganFormValues } from "../model/schema";
import { SchoolInfo } from "../model/school";

export interface SloganFormHandlers {
  handleSloganChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFieldChange: (
    field: keyof SloganFormValues,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSchoolSelect: (schoolName: string) => void;
  handleBirthdaySelect: (date: Date | undefined) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleToggleOutOfSchool: () => void;
  handleFieldBlur: (field: keyof SloganFormValues) => () => void;
}

export interface SloganFormSchoolData {
  schoolList: SchoolInfo[];
  filteredSchools: SchoolInfo[];
  isSchoolFetched: boolean;
}

export interface UseSloganFormReturn {
  state: FormState;
  isValid: boolean;
  isSloganPeriod: boolean;
  isOutOfSchool: boolean;
  fieldErrors: Partial<Record<keyof SloganFormValues, string>>;
  handlers: SloganFormHandlers;
  schoolData: SloganFormSchoolData;
}
