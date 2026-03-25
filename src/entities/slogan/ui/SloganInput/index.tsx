import React from "react";
import { Input } from "@/shared/ui";
import CountLength from "../CountLength";

type SloganInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SloganInput = ({ value, onChange }: SloganInputProps) => {
  return (
    <CountLength length={value.length}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        max={100}
        name="slogan"
        label="슬로건 입력"
        placeholder="슬로건을 입력해주세요"
      />
    </CountLength>
  );
};

export default React.memo(SloganInput);
