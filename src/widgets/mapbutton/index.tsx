import MapButtonUI from "./ui/MapButtonUI";

const MapButtonComponent = () => {
  return (
    <div className="flex gap-4 mt-4 flex-col justify-center mobile:flex-row ">
      <MapButtonUI
        href="https://map.naver.com/directions/to/35.14082656903739,126.93299243257847"
        imgSrc="/images/mapLogo/navermap.png"
        imgAlt="Star"
        text="네이버 지도"
        bgColor="#1eaf6f"
        hoverColor="#17a255"
      />
      <MapButtonUI
        href="https://place.map.kakao.com/15266104"
        imgSrc="/images/mapLogo/kakaomap.png"
        imgAlt="Star"
        text="카카오맵"
        bgColor="#E0A800"
        hoverColor="#e5c400"
      />
      <MapButtonUI
        href="https://tmap.life/20667c7b"
        imgSrc="/images/mapLogo/tmap.png"
        imgAlt="Star"
        text="TMAP"
        bgColor="#1d77c5"
        hoverColor="#1464a2"
      />
    </div>
  );
};

export default MapButtonComponent;
