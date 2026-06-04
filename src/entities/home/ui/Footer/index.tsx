import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-24 bg-gray-100 flex items-center justify-center gap-[5%] text-black mobile:flex-col mobile:gap-12 mobile:py-20 mobile:px-16">
      <ul className="flex items-center sm:text-body3r text-caption2r gap-5 mobile:flex-col mobile:gap-4 mobile:items-center mobile:text-center">
        <p>&copy; 2026 光탈페. All rights reserved. </p>
        <a
          className="pr-8 underline underline-offset-4"
          href="https://zircon-august-7e1.notion.site/kr-2727d70a961480b88410fe81e5ebc239?source=copy_link"
        >
          개인정보처리방침
        </a>
        {/* <li className="px-8 border-l border-white/40 underline underline-offset-4">
          영상정보처리기기운영·관리방침
        </li>
        <li className="pl-8 border-l border-white/40 underline underline-offset-4">
          저작권신고 및 보호규정
        </li> */}
      </ul>
      <div className="flex items-center gap-10">
        <Image
          src="/images/gwanglogo.jpg"
          alt="교육청 로고"
          width={40}
          height={40}
          className="mobile:w-[20px] mobile:h-[20px]"
        />
        <Image
          src="/images/gwhclogo.png"
          alt="고등의회 로고"
          width={50}
          height={50}
          className="mobile:w-[20px] mobile:h-[20px]"
        />
        <Image
          src="/images/gsmlogo-.png"
          alt="광소마고 로고"
          width={50}
          height={50}
          className="mobile:w-[20px] mobile:h-[20px]"
        />
      </div>
    </footer>
  );
}
