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
  const { state, isValid, isSloganPeriod, isOutOfSchool, fieldErrors, handlers, schoolData } = useSloganForm();

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
        <div className={cn("flex flex-col mt-[3.5rem] gap-32")}>
          <SloganInput value={state.formValues.slogan} onChange={handlers.handleSloganChange} onBlur={handlers.handleFieldBlur("slogan")} error={fieldErrors.slogan} />

          <SloganDescriptionInput
            value={state.formValues.description}
            onChange={handlers.handleDescriptionChange}
            onBlur={handlers.handleFieldBlur("description")}
            error={fieldErrors.description}
          />

          <div className={cn("flex flex-col gap-16")}>
            <SchoolSearchInput
              value={state.formValues.school}
              onChange={handlers.handleFieldChange("school")}
              onBlur={handlers.handleFieldBlur("school")}
              error={fieldErrors.school}
              filteredSchools={schoolData.filteredSchools}
              isSchoolFetched={schoolData.isSchoolFetched}
              onSchoolSelect={handlers.handleSchoolSelect}
              isOutOfSchool={isOutOfSchool}
              onToggleOutOfSchool={handlers.handleToggleOutOfSchool}
              birthdayValue={state.formValues.birthday ?? ""}
              onBirthdaySelect={handlers.handleBirthdaySelect}
              onBirthdayBlur={handlers.handleFieldBlur("birthday")}
              birthdayError={fieldErrors.birthday}
            />

            <PersonalInfoInputs
              formValues={{
                name: state.formValues.name,
                grade: state.formValues.grade,
                classroom: state.formValues.classroom,
                phone_number: state.formValues.phone_number,
              }}
              onFieldChange={handlers.handleFieldChange}
              onFieldBlur={handlers.handleFieldBlur}
              isOutOfSchool={isOutOfSchool}
              fieldErrors={fieldErrors}
            />
          </div>
        </div>
      </div>
      {!isSloganPeriod && (
        <p className="text-center text-body3r text-gray-400">신청 기간이 아닙니다.</p>
      )}
      <Button type="submit" disabled={!isValid || state.isSubmitting || !isSloganPeriod}>
        응모하기
      </Button>
    </form>
  );
}
