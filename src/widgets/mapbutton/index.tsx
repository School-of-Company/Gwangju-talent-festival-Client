import MapButtonUI from "./ui/MapButtonUI";

const MapButtonComponent = () => {
  return (
    <div className="flex gap-4 mt-4 flex-col justify-center mobile:flex-row ">
      <MapButtonUI
        href="https://naver.me/Ghbu7lN7"
        imgSrc="/images/mapLogo/navermap.png"
        imgAlt="Star"
        text="네이버 지도"
        bgColor="green"
      />
      <MapButtonUI
        href="https://place.map.kakao.com/15266104"
        imgSrc="/images/mapLogo/kakaomap.png"
        imgAlt="Star"
        text="카카오맵"
        bgColor="yellow"
      />
      <MapButtonUI
        href="https://tmap.life/20667c7b"
        imgSrc="/images/mapLogo/tmap.png"
        imgAlt="Star"
        text="TMAP"
        bgColor="blue"
      />
    </div>
  );
};

export default MapButtonComponent;
