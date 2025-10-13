import { cn } from "@/shared/utils/cn";
import { useGetGithub } from "@/widgets/main/model/useGetGithub";
import Image from "next/image";

interface MemberCardProps {
  githubID: string;
  role: string;
}

export const MemberCard = ({ githubID, role }: MemberCardProps) => {
  const { data } = useGetGithub(githubID);
  return (
    <a
      href={data?.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex flex-col flex-none items-center px-[36px] w-[18rem] py-24 h-[20rem] rounded-xl bg-white cursor-pointer shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] gap-24",
        "mobile:w-[12rem] mobile:px-[12px] mobile:py-[10px] mobile:h-[12rem] mobile:gap-6",
      )}
    >
      {data?.avatar_url ? (
        <Image
          src={data.avatar_url}
          width={100}
          height={100}
          alt={data?.name ?? ""}
          className={cn("rounded-full shrink-0 mobile:w-[60px] mobile:h-[60px]")}
        />
      ) : null}
      <div className="text-center">
        <p className={cn("text-body1b mobile:text-body3b mb-20")}>{data?.name ?? "조수민"}</p>
        <p className={cn("text-body2r mobile:text-caption1b text-gray-500")}>{role}</p>
      </div>
    </a>
  );
};
