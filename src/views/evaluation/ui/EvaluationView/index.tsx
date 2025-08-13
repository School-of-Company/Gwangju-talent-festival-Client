import EvaluationCard from "@/entities/evaluation/ui/EvaluationCard";
import Standard from "@/entities/evaluation/ui/Standard";
import { Button } from "@/shared/ui";

const Mock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function EvaluationView() {
  return (
    <div className="flex items-center flex-col">
      <Standard />
      <div className="justify-center flex flex-col gap-24 w-full">
        {Mock.map(v => {
          return <EvaluationCard order={v} key={v} />;
        })}
      </div>
      <Button className="w-[420px] mt-[60px] mb-[70px]">확인</Button>
    </div>
  );
}
