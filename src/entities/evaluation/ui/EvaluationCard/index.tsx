import { CheckIcon } from "@/shared/asset/svg/CheckIcon";
import DownArrow from "@/shared/asset/svg/DownArrow";
import { Button } from "@/shared/ui";

const max = [40, 30, 30];

export default function EvaluationCard() {
  return (
    <ul className="w-full text-body3b flex py-14 border items-center rounded-md border-gray-100 border-solid justify-between px-24 pl-[80px]">
      <li className="text-main-600">1</li>
      {max.map((v, i) => {
        return (
          <div key={i} className="flex gap-12">
            {v}
            <DownArrow />
          </div>
        );
      })}
      <Button className="py-12 px-16 gap-12 w-[126px] justify-center flex items-center">
        <CheckIcon color="white" />9
      </Button>
    </ul>
  );
}
