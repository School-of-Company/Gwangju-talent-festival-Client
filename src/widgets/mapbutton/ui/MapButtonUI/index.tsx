import Image from "next/image";

interface MapButtonUIProps {
  imgSrc: string;
  imgAlt: string;
  text: string;
  bgColor: keyof typeof colorVariants;
  href: string;
}

const colorVariants = {
  blue: "bg-blue-500 hover:bg-blue-600",
  yellow: "bg-yellow-500 hover:bg-yellow-600",
  green: "bg-green-500 hover:bg-green-600",
};

const MapButtonUI = ({ imgSrc, imgAlt, text, bgColor, href }: MapButtonUIProps) => {
  return (
    <a
      href={href}
      target="_blank"
      className={`flex items-center p-4 ${colorVariants[bgColor]} text-white rounded-md text-center transition-all ease-in-out duration-300 `}
    >
      <Image src={imgSrc} alt={imgAlt} width={48} height={48} className="mobile:w-30 mobile:h-30" />
      <span className="mr-8 ml-14 mobile:ml-4">{text}</span>
      <span className="block mobile:hidden"> 바로가기</span>
    </a>
  );
};

export default MapButtonUI;
