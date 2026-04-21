"use client";

import { useReducer, useCallback, useMemo } from "react";
import { formReducer, initialFormState } from "./formReducer";
import { sloganSchema, SloganFormValues } from "../model/schema";
import { handleSloganFormSubmit } from "./handleSloganFormSubmit";
import { useDebounce } from "./useDebounce";
import { useGetSchool } from "../api/useGetSchool";
import { SchoolInfoResponse } from "../model/school";
import { UseSloganFormReturn } from "./types";
import { outOfSchoolSloganSchema } from "../model/schema";

const SCHOOL_SEARCH_DELAY = 200;

const parseSchoolApiResponse = (data: SchoolInfoResponse | undefined) => {
  if (!data?.schoolInfo || data.schoolInfo.length < 2) return [];
  return data.schoolInfo[1].row ?? [];
};

export const useSloganForm = (): UseSloganFormReturn => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const schema = state.isOutOfSchool ? outOfSchoolSloganSchema : sloganSchema;

  const debouncedFormValues = useDebounce(state.formValues, 500);

  const normalizedSchoolName = useMemo(
    () => state.formValues.school.replace(/\s+/g, ""),
    [state.formValues.school],
  );
  const debouncedSchoolName = useDebounce<string>(normalizedSchoolName, SCHOOL_SEARCH_DELAY);
  const { data: schoolData, isSuccess: isSchoolFetched } = useGetSchool(debouncedSchoolName);

  const schoolList = useMemo(() => parseSchoolApiResponse(schoolData), [schoolData]);

  const isSchoolValid = useMemo(
    () =>
      state.isSchoolConfirmed ||
      schoolList.some(s => s.SCHUL_NM === normalizedSchoolName),
    [state.isSchoolConfirmed, schoolList, normalizedSchoolName],
  );

  const isValid =
    schema.safeParse(state.formValues).success &&
    (state.isOutOfSchool || isSchoolValid);

  const fieldErrors = useMemo(() => {
    const result = schema.safeParse(debouncedFormValues);
    const errors: Partial<Record<keyof SloganFormValues, string>> = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof SloganFormValues;
        if (!errors[field] && state.touchedFields[field]) {
          errors[field] = issue.message;
        }
      }
    }
    if (
      !state.isOutOfSchool &&
      !isSchoolValid &&
      state.touchedFields.school &&
      debouncedFormValues.school
    ) {
      errors.school = "학교를 목록에서 선택해주세요.";
    }
    return errors;
  }, [debouncedFormValues, state.touchedFields, isSchoolValid, state.isOutOfSchool, schema]);

  const filteredSchools = useMemo(
    () => schoolList.filter(school => school.SCHUL_NM !== normalizedSchoolName),
    [schoolList, normalizedSchoolName],
  );

  const handleSloganChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_FIELD", field: "slogan", value: e.target.value });
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: "UPDATE_FIELD", field: "description", value: e.target.value });
  }, []);

  const handleFieldChange = useCallback(
    (field: keyof SloganFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "UPDATE_FIELD", field, value: e.target.value });
    },
    [],
  );

  const handleFieldBlur = useCallback(
    (field: keyof SloganFormValues) => () => {
      dispatch({ type: "TOUCH_FIELD", field });
    },
    [],
  );

  const handleSchoolSelect = useCallback((schoolName: string) => {
    dispatch({ type: "CONFIRM_SCHOOL", value: schoolName });
  }, []);

  const handleToggleOutOfSchool = useCallback(() => {
    dispatch({ type: "TOGGLE_OUT_OF_SCHOOL" });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch({ type: "SET_SUBMITTING", value: true });
      try {
        const res = await handleSloganFormSubmit(state.formValues, state.isOutOfSchool);
        dispatch({ type: "SET_SUBMITTED", value: !!res });
      } catch {
      } finally {
        dispatch({ type: "SET_SUBMITTING", value: false });
      }
    },
    [state.formValues, state.isOutOfSchool],
  );

  return {
    state,
    isValid,
    isOutOfSchool: state.isOutOfSchool,
    fieldErrors,
    handlers: {
      handleSloganChange,
      handleDescriptionChange,
      handleFieldChange,
      handleSchoolSelect,
      handleSubmit,
      handleToggleOutOfSchool,
      handleFieldBlur,
    },
    schoolData: {
      schoolList,
      filteredSchools,
      isSchoolFetched,
    },
  };
};
