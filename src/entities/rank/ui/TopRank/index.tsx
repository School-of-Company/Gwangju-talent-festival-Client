import Medal from "@/shared/asset/svg/Medal";

export default function TopRank() {
  return (
    <div className="bg-main-10 rounded-[40px]">
      <div>
        <div>
          <h3>팀 이름</h3>
        </div>
        <div>
          <Medal />
          <h3>팀 이름</h3>
        </div>
        <div>
          <h3>팀 이름</h3>
        </div>
      </div>
      <ul className="text-title1b flex justify-around items-center">
        <li>2등</li>
        <li>1등</li>
        <li>3등</li>
      </ul>
    </div>
  );
}
