import React, { useMemo } from "react";
import { Input } from "@/shared/ui";
import { cn } from "@/shared/utils/cn";
import Search from "@/shared/asset/svg/Search";
import HighlightText from "../HighlightText";
import CheckBox from "@/shared/asset/svg/CheckBox";

type School = {
  SD_SCHUL_CODE: string;
  SCHUL_NM: string;
};

type SchoolSearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredSchools: School[];
  isSchoolFetched: boolean;
  onSchoolSelect: (schoolName: string) => void;
  isOutOfSchool: boolean;
  onToggleOutOfSchool: () => void;
  birthdayValue: string;
  onBirthdayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SchoolSearchInput = ({
  value,
  onChange,
  filteredSchools,
  isSchoolFetched,
  onSchoolSelect,
  isOutOfSchool,
  onToggleOutOfSchool,
  birthdayValue,
  onBirthdayChange,
}: SchoolSearchInputProps) => {
  const normalizedValue = useMemo(() => value.replace(/\s+/g, ""), [value]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <span className="text-body3b">{isOutOfSchool ? "생년월일" : "학교"}</span>
        <button type="button" onClick={onToggleOutOfSchool} className="flex items-center gap-8">
          <CheckBox checked={isOutOfSchool} />
          <span className="text-body3b text-orange-500">학교 밖 청소년</span>
        </button>
      </div>
      <div className="relative">
        {isOutOfSchool ? (
          <Input
            name="birthday"
            type="text"
            value={birthdayValue}
            onChange={onBirthdayChange}
            placeholder="2001 / 10 / 28"
          />
        ) : (
          <>
            <Input
              name="school"
              type="text"
              value={value}
              onChange={onChange}
              placeholder="학교를 입력해주세요"
            />
            <span className={cn("absolute right-[1.25rem] top-1/2 -translate-y-1/2")}>
              <Search />
            </span>
          </>
        )}
      </div>
      {isSchoolFetched && normalizedValue !== "" && filteredSchools.length > 0 && (
        <div className="absolute left-0 right-0 bg-white shadow-xl rounded mt-8 max-h-[350px] overflow-y-auto z-10">
          {filteredSchools.map((school, i) => (
            <div key={school.SD_SCHUL_CODE}>
              {i !== 0 && <div className="h-px bg-gray-100 mx-12" />}
              <div
                className="cursor-pointer p-16 hover:bg-gray-100 rounded"
                onClick={() => onSchoolSelect(school.SCHUL_NM)}
              >
                <HighlightText text={school.SCHUL_NM} searchTerm={value} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(SchoolSearchInput);
