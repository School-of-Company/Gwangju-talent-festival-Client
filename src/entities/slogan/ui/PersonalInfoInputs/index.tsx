import React from "react";
import { Input } from "@/shared/ui";
import { SloganFormValues } from "../../model/schema";

type PersonalInfoInputsProps = {
  formValues: {
    name: string;
    grade: string;
    classroom: string;
    phone_number: string;
  };
  onFieldChange: (
    field: keyof SloganFormValues,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFieldBlur: (field: keyof SloganFormValues) => () => void;
  isOutOfSchool: boolean;
  fieldErrors: Partial<Record<keyof SloganFormValues, string>>;
};

const PersonalInfoInputs = ({ formValues, onFieldChange, onFieldBlur, isOutOfSchool, fieldErrors }: PersonalInfoInputsProps) => {
  return (
    <div className="flex flex-col gap-16">
      <Input
        name="name"
        type="text"
        value={formValues.name}
        onChange={onFieldChange("name")}
        onBlur={onFieldBlur("name")}
        label="이름"
        placeholder="이름을 입력해주세요"
        error={fieldErrors.name}
      />
      {!isOutOfSchool && (
        <div className="flex gap-24">
          <Input
            name="grade"
            type="number"
            value={formValues.grade}
            onChange={onFieldChange("grade")}
            onBlur={onFieldBlur("grade")}
            onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
            label="학년"
            placeholder="학년을 입력해주세요"
            error={fieldErrors.grade}
          />
          <Input
            name="class"
            type="number"
            value={formValues.classroom}
            onChange={onFieldChange("classroom")}
            onBlur={onFieldBlur("classroom")}
            onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
            label="반"
            placeholder="반을 입력해주세요"
            error={fieldErrors.classroom}
          />
        </div>
      )}
      <Input
        type="number"
        name="phone"
        value={formValues.phone_number}
        onChange={onFieldChange("phone_number")}
        onBlur={onFieldBlur("phone_number")}
        label="전화번호(휴대폰번호)"
        placeholder="전화번호를 입력해주세요"
        error={fieldErrors.phone_number}
      />
    </div>
  );
};

export default React.memo(PersonalInfoInputs);
