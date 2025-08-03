import { LeftArrow } from "@/shared/asset/svg/LeftArrow";

export default function MiniHeader({ label }: { label: string }) {
  return (
    <header className="flex gap-24 py-10 my-[45px] px-16">
      <LeftArrow />
      <span className="text-body2b">{label}</span>
    </header>
  );
}
