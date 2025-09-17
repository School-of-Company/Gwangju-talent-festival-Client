import Image from "next/image";

interface MapButtonUIProps {
  imgSrc: string;
  imgAlt: string;
  text: string;
  bgColor: string;
  hoverColor: string;
  href: string;
}

const MapButtonUI = ({ imgSrc, imgAlt, text, bgColor, hoverColor, href }: MapButtonUIProps) => {
  return (
    <a
      href={href}
      target="_blank"
      className={`flex items-center p-4 bg-[${bgColor}] text-white rounded-md text-center transition-all ease-in-out duration-300 hover:bg-[${hoverColor}]`}
    >
      <Image src={imgSrc} alt={imgAlt} width={48} height={48} />
      <span className="mr-8 ml-14">{text}</span>
      <span className="block mobile:hidden"> 바로가기</span>
    </a>
  );
};

export default MapButtonUI;
