import { cn } from "@/shared/utils/cn";
import { useGetGithub } from "@/widgets/main/model/useGetGithub";
import Image from "next/image";

interface MemberCardProps {
  githubID: string;
}

export const MemberCard = ({ githubID }: MemberCardProps) => {
  const { data } = useGetGithub(githubID);
  return (
    <a
      href={data?.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center w-[18.4375rem] h-[7rem] rounded-xl border border-[#B2B2B2] bg-white p-5 gap-1 space-x-4 flex-shrink-0 cursor-pointer",
      )}
    >
      {data?.avatar_url ? (
        <Image
          src={data.avatar_url}
          width={72}
          height={72}
          alt={data?.name ?? ""}
          className={cn("rounded-full")}
        />
      ) : null}
      <div>
        <p className={cn("text-[1.5rem]/[2rem] font-medium")}>{data?.name ?? "조수민"}</p>
        <p className={cn("text-[1.375rem]/[1.75rem] font-normal")}>{data?.email}</p>
      </div>
    </a>
  );
};
