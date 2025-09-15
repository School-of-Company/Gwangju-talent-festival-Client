import Medal from "@/shared/asset/svg/Medal";
import { Rank } from "@/views/rank/model/rankType";

export default function TopRank({ rank }: { rank: Rank[] }) {
  return (
    <div className="bg-main-100 rounded-[40px] py-[42px] px-[41px]">
      <div className="flex justify-around items-end">
        <div className="bg-main-500 w-[20vw] rounded-t-[40px] gap-20 py-[60px] h-[40%] flex flex-col justify-end items-center">
          <h3 className="text-white text-title4b">{rank[1].team_name}</h3>
        </div>
        <div className="bg-main-600 w-[20vw] gap-20 py-[60px] flex flex-col rounded-t-[40px] justify-center items-center">
          <Medal />
          <h3 className="text-white text-title4b">{rank[0].team_name}</h3>
        </div>
        <div className="bg-main-400 w-[20vw] gap-24 py-30 flex rounded-t-[40px] justify-center items-center">
          <h3 className="text-white text-title4b">{rank[2].team_name}</h3>
          <svg
            width="2"
            height="40"
            viewBox="0 0 2 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="1.16602" y1="2.18557e-08" x2="1.16601" y2="40" stroke="#D6A1E6" />
          </svg>

          <h3 className="text-white text-title4b">{rank[3].team_name}</h3>
        </div>
      </div>
      <ul className="text-title1b rounded-[40px] bg-white border-2 border-solid border-gray-100 flex py-[36px] justify-around items-center">
        <li>꿈이룸상</li>
        <li>광탈페상</li>
        <li>꿈피움상</li>
      </ul>
    </div>
  );
}
