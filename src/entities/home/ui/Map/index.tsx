"use client";

import { cn } from "@/shared/utils/cn";
import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (
          container: HTMLElement,
          options: { center: KakaoLatLng; level: number },
        ) => KakaoMap;
        Marker: new (options: { position: KakaoLatLng }) => KakaoMarker;
        services: {
          Geocoder: new () => KakaoGeocoder;
        };
      };
    };
  }
}

type KakaoMapProps = Readonly<{
  latitude?: number;
  longitude?: number;
  address?: string;
  markerPosition?: { lat: number; lng: number };
  className?: string;
}>;

type KakaoMap = Readonly<{
  setCenter: (position: KakaoLatLng) => void;
}>;

type KakaoLatLng = Readonly<{
  getLat: () => number;
  getLng: () => number;
}>;

type KakaoMarker = Readonly<{
  setMap: (map: KakaoMap) => void;
}>;

interface GeocoderResult {
  address_name: string;
  x: string;
  y: string;
}

type GeocoderStatus = "OK" | "ZERO_RESULT" | "ERROR";

type KakaoGeocoder = Readonly<{
  addressSearch: (
    address: string,
    callback: (result: GeocoderResult[], status: GeocoderStatus) => void,
  ) => void;
}>;

export const Map = ({
  latitude = 35.140811,
  longitude = 126.933014,
  address,
  markerPosition,
  className,
}: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<KakaoMap | null>(null);

  const loadKakaoMapsSDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.kakao && window.kakao.maps) {
        resolve();
        return;
      }

      const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', () => reject(new Error('Kakao Maps SDK 로드 실패')));
        return;
      }

      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
      script.async = true;
      
      script.onload = () => {
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Kakao Maps SDK 로드 실패'));
      };

      document.head.appendChild(script);
    });
  };

  const initMap = useCallback(() => {
    if (!mapRef.current || !window.kakao?.maps) return;

    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapRef.current, options);
    mapInstance.current = map;

    if (address) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (status === "OK") {
          const lat = parseFloat(result[0].y);
          const lng = parseFloat(result[0].x);
          const coords = new window.kakao.maps.LatLng(lat, lng);

          map.setCenter(coords);

          const marker = new window.kakao.maps.Marker({
            position: coords,
          });
          marker.setMap(map);
        } else {
          const defaultPosition = new window.kakao.maps.LatLng(latitude, longitude);
          const marker = new window.kakao.maps.Marker({
            position: defaultPosition,
          });
          marker.setMap(map);
        }
      });
    } else if (markerPosition) {
      const markerPos = new window.kakao.maps.LatLng(markerPosition.lat, markerPosition.lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPos,
      });
      marker.setMap(map);
    } else {
      const defaultPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: defaultPosition,
      });
      marker.setMap(map);
    }
  }, [latitude, longitude, address, markerPosition]);

  useEffect(() => {
    const loadAndInitMap = async () => {
      try {
        await loadKakaoMapsSDK();
        
        if (window.kakao?.maps) {
          window.kakao.maps.load(() => {
            initMap();
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadAndInitMap();
  }, [initMap]);

  return (
    <div className={cn("relative w-full h-[200px] bg-slate-300 mb-[16px]", className)}>
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};
