import React from "react";
import { Input } from "@/shared/ui";
import Inform from "@/shared/asset/svg/Inform";

type SloganInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
};

const SloganInput = ({ value, onChange, onBlur, error }: SloganInputProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        value={value}
        onChange={onChange}
        max={100}
        name="slogan"
        label="슬로건 입력"
        placeholder="슬로건을 입력해주세요"
        onBlur={onBlur}
        hideErrorSpace
      />
      <div className="flex items-center justify-between">
        {error ? (
          <p className="text-caption1r text-red-500">{error}</p>
        ) : (
          <p className="flex items-center gap-8 text-body3r text-gray-500">
            <Inform width={20} height={20} color="#a7a7a7" />본 결과물은 표절을 금지하며, 반드시 순수
            창작물로 작성해야 합니다.
          </p>
        )}
        <span className="text-body3r text-gray-400">{value.length}/100</span>
      </div>
    </div>
  );
};

export default React.memo(SloganInput);
