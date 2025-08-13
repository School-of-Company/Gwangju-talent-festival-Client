"use client";

import { CheckIcon } from "@/shared/asset/svg/CheckIcon";
import { Button } from "@/shared/ui";
import { useState } from "react";
import CustomDropdown from "../Dropdown";

type Score = {
  value: number | string;
  write: boolean;
  max: number;
  show: boolean;
};

const scores: Score[] = [
  { value: 0, write: false, max: 40, show: false },
  { value: 0, write: false, max: 30, show: false },
  { value: 0, write: false, max: 30, show: false },
];

export default function EvaluationCard({ order }: { order: number }) {
  const [values, setValues] = useState<Score[]>(scores);

  return (
    <ul className="w-full text-body3b flex py-14 border items-center rounded-md border-gray-100 border-solid justify-between px-24 pl-[80px]">
      <li className="text-main-600">{order}</li>
      {values.map((v, i) => {
        return v.write ? (
          <input
            className="w-[46.53px]"
            key={i}
            max={v.max}
            type="number"
            value={v.value}
            onChange={e => {
              const val = e.target.value === "" ? "" : Number(e.target.value);

              if (val === "" || val <= v.max) {
                setValues(prev =>
                  prev.map((item, idx) => (idx === i ? { ...item, value: val } : item)),
                );
              }
            }}
            onBlur={() => {
              setValues(prev =>
                prev.map((item, idx) =>
                  idx === i
                    ? {
                        ...item,
                        value: item.value === 0 || Number.isNaN(item.value) ? 0 : item.value,
                        write: false,
                        show: false,
                      }
                    : item,
                ),
              );
            }}
            autoFocus
          />
        ) : (
          <CustomDropdown
            key={i}
            value={v.value}
            max={v.max}
            isOpen={v.show}
            onToggle={() => {
              setValues(prev =>
                prev.map((item, idx) => (idx === i ? { ...item, show: !item.show } : item)),
              );
            }}
            onSelect={selectedValue => {
              setValues(prev =>
                prev.map((item, idx) =>
                  idx === i ? { ...item, value: selectedValue, write: false, show: false } : item,
                ),
              );
            }}
            onDoubleClick={() => {
              setValues(prev =>
                prev.map((item, idx) => (idx === i ? { ...item, write: true, show: false } : item)),
              );
            }}
          />
        );
      })}
      <Button className="py-12 px-16 gap-12 w-[126px] justify-center flex items-center">
        <CheckIcon color="white" />9
      </Button>
    </ul>
  );
}
