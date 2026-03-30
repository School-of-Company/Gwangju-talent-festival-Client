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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-1 max-w-[420px] mobile:w-full flex flex-col items-center px-9 py-11 tablet:px-6 tablet:py-8 mobile:px-24 mobile:py-32 rounded-[20px] bg-white border border-gray-100 hover:border-gray-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer"
    >
      <div className="relative w-[60%] aspect-square mb-24 tablet:mb-16 mobile:mb-16">
        <Image src={imageSrc} alt={label} fill className="object-contain" />
      </div>

      <span className="text-caption2r text-gray-500 bg-gray-100 rounded-full px-14 py-6 mb-14 mobile:mb-10">
        {description}
      </span>

      <span className="text-body1b tablet:text-body3b mobile:text-caption1b text-center text-black break-keep leading-snug">
        {label}
      </span>
    </a>
  );
}
