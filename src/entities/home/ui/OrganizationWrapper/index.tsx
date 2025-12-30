import Image from "next/image";

interface OrganizationWrapperProps {
  label: string;
  description: string;
  imageSrc: string;
  href: string;
}

export default function OrganizationWrapper({
  label,
  description,
  imageSrc,
  href,
}: OrganizationWrapperProps) {
  return (
    <div className="w-[400px] h-[400px] mobile:h-[20%] mobile:w-[48%] flex flex-col items-center border-gray-100 border-solid rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 hover:translate-y-2 p-4">
      <a href={href} target="_blank">
        <Image src={imageSrc} alt="고등의회 로고" width={300} height={300} />
      </a>
      <span className="mt-2 text-body1b mobile:text-caption1b font-semibold">{label}</span>
      <p className="text-gray-500 text-body2r mobile:text-caption2r pb-6">{description}</p>
    </div>
  );
}
