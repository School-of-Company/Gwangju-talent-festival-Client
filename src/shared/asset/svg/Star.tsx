export default function Star({ active, size=60 }: { active: boolean, size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 60 58" fill="none">
      <g filter="url(#filter0_d_3400_3981)">
        <path
          d="M23.3098 3.45096C24.4102 1.22122 27.5898 1.22122 28.6902 3.45096L33.531 13.2594C33.968 14.1449 34.8127 14.7586 35.7898 14.9006L46.6141 16.4734C49.0748 16.831 50.0573 19.8549 48.2767 21.5905L40.4442 29.2253C39.7371 29.9145 39.4145 30.9076 39.5814 31.8807L41.4304 42.6613C41.8507 45.112 39.2785 46.9809 37.0776 45.8238L27.396 40.7339C26.5221 40.2745 25.4779 40.2745 24.604 40.7339L14.9224 45.8238C12.7215 46.9809 10.1493 45.112 10.5696 42.6613L12.4186 31.8807C12.5855 30.9076 12.2629 29.9145 11.5558 29.2253L3.72327 21.5905C1.94272 19.8549 2.92524 16.831 5.38591 16.4734L16.2102 14.9006C17.1873 14.7586 18.032 14.1449 18.469 13.2594L23.3098 3.45096Z"
          fill={active ? "#D9AD00" : "#5B5B5B"}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3400_3981"
          x="0.814453"
          y="0.778687"
          width="58.3711"
          height="56.3964"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="5" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3400_3981" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3400_3981"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
