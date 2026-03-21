"use client";

import { useReducer, useCallback, useMemo } from "react";
import { formReducer, initialFormState } from "./formReducer";
import { sloganSchema, SloganFormValues } from "../model/schema";
import { handleSloganFormSubmit } from "./handleSloganFormSubmit";
import { useDebounce } from "./useDebounce";
import { useGetSchool } from "../api/useGetSchool";
import { normalizeText } from "./normalizeText";
import { SchoolInfoResponse } from "@/widgets/slogan/model/school";
import { UseSloganFormReturn } from "./types";

const SCHOOL_SEARCH_DELAY = 200;

const parseSchoolApiResponse = (data: SchoolInfoResponse | undefined) => {
  if (!data?.schoolInfo || data.schoolInfo.length < 2) return [];
  return data.schoolInfo[1].row ?? [];
};

export const useSloganForm = (): UseSloganFormReturn => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const isValid = sloganSchema.safeParse(state.formValues).success;

  const normalizedSchoolName = useMemo(
    () => normalizeText(state.formValues.school),
    [state.formValues.school],
  );
  const debouncedSchoolName = useDebounce<string>(normalizedSchoolName, SCHOOL_SEARCH_DELAY);
  const { data: schoolData, isSuccess: isSchoolFetched } = useGetSchool(debouncedSchoolName);

  const schoolList = useMemo(() => parseSchoolApiResponse(schoolData), [schoolData]);

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

  const handleSchoolSelect = useCallback((schoolName: string) => {
    dispatch({ type: "UPDATE_FIELD", field: "school", value: schoolName });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch({ type: "SET_SUBMITTING", value: true });
      try {
        const res = await handleSloganFormSubmit(state.formValues);
        dispatch({ type: "SET_SUBMITTED", value: res });
      } finally {
        dispatch({ type: "SET_SUBMITTING", value: false });
      }
    },
    [state.formValues],
  );

  return {
    state,
    isValid,
    handlers: {
      handleSloganChange,
      handleDescriptionChange,
      handleFieldChange,
      handleSchoolSelect,
      handleSubmit,
    },
    schoolData: {
      schoolList,
      filteredSchools,
      isSchoolFetched,
    },
  };
};
