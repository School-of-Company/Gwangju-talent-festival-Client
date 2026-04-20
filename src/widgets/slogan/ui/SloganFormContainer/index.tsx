"use client";

import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui";
import BackHeader from "@/shared/ui/BackHeader";
import SloganFormSuccess from "@/entities/slogan/ui/SloganFormSuccess";
import SloganInput from "@/entities/slogan/ui/SloganInput";
import SloganDescriptionInput from "@/entities/slogan/ui/SloganDescriptionInput";
import SchoolSearchInput from "@/entities/slogan/ui/SchoolSearchInput";
import PersonalInfoInputs from "@/entities/slogan/ui/PersonalInfoInputs";
import { useSloganForm } from "@/entities/slogan/lib/useSloganForm";

export default function SloganFormContainer() {
  const { state, isValid, isOutOfSchool, handlers, schoolData } = useSloganForm();

  if (state.isSubmitted) {
    return <SloganFormSuccess />;
  }

  return (
    <form
      onSubmit={handlers.handleSubmit}
      className={cn("flex px-12 mt-[32px] flex-col pb-5 gap-[6.25rem]")}
    >
      <div>
        <BackHeader text="슬로건 응모" />
        <div className={cn("flex flex-col mt-[3.5rem] gap-24")}>
          <SloganInput value={state.formValues.slogan} onChange={handlers.handleSloganChange} />

          <SloganDescriptionInput
            value={state.formValues.description}
            onChange={handlers.handleDescriptionChange}
          />

          <SchoolSearchInput
            value={state.formValues.school}
            onChange={handlers.handleFieldChange("school")}
            filteredSchools={schoolData.filteredSchools}
            isSchoolFetched={schoolData.isSchoolFetched}
            onSchoolSelect={handlers.handleSchoolSelect}
            isOutOfSchool={isOutOfSchool}
            onToggleOutOfSchool={handlers.handleToggleOutOfSchool}
            birthdayValue={state.formValues.birthday ?? ""}
            onBirthdayChange={handlers.handleFieldChange("birthday")}
          />

          <PersonalInfoInputs
            formValues={{
              name: state.formValues.name,
              grade: state.formValues.grade,
              classroom: state.formValues.classroom,
              phone_number: state.formValues.phone_number,
            }}
            onFieldChange={handlers.handleFieldChange}
            isOutOfSchool={isOutOfSchool}
          />
        </div>
      </div>
      <Button type="submit" disabled={!isValid || state.isSubmitting}>
        응모하기
      </Button>
    </form>
  );
}
