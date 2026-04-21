type CheckBoxProps = {
  checked: boolean;
  width?: number;
  height?: number;
};

export default function CheckBox({ checked, width = 20, height = 20 }: CheckBoxProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        rx="5.5"
        fill={checked ? "#FF9644" : "none"}
        stroke="#FF9644"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.33842 11.7277L14.5146 5.45508L15.4545 6.40966L8.33842 13.6369L4.54541 9.78463L5.48531 8.83005L8.33842 11.7277Z"
        fill={checked ? "white" : "#FF9644"}
      />
    </svg>
  );
}
