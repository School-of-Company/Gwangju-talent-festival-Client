interface OrderCardProps {
  teamName: string | undefined;
  type: "prev" | "next";
}

export default function OrderCard({ teamName, type }: OrderCardProps) {
  return (
    <article className="flex flex-col sm:mt-[80px] mt-[40px] justify-center gap-16 items-center w-full bg-gray-50 rounded-lg py-16">
      <span className="text-caption1r text-gray-500">
        {type === "prev" ? "전 공연 팀" : "다음 공연 팀"}
      </span>
      <strong className="text-body3b">{teamName ?? "없음"}</strong>
    </article>
  );
}
