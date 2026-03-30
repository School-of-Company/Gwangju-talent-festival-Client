import React from "react";

interface CountLengthProps {
  children: React.ReactNode;
  length?: number;
  max?: number;
}

const CountLength = ({ children, length = 0, max = 100 }: CountLengthProps) => {
  return (
    <div className="flex flex-col gap-4">
      {children}
      <span className="text-body3r ml-auto text-gray-400">{`${length}/${max}`}</span>
    </div>
  );
};

export default React.memo(CountLength);
