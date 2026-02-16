interface LogoProps {
  variant?: "color" | "white";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { width: 120, height: 32 },
  md: { width: 150, height: 40 },
  lg: { width: 180, height: 48 },
};

export default function Logo({
  variant = "color",
  className,
  size = "md",
}: LogoProps) {
  const { width, height } = sizes[size];
  const houseColor = variant === "white" ? "#ffffff" : "#2D7A7A";
  const textColor = variant === "white" ? "#ffffff" : "#1e293b";
  const accentColor = variant === "white" ? "#99f6e4" : "#2D7A7A";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* House Icon */}
      <g>
        {/* House body */}
        <rect
          x="6"
          y="20"
          width="24"
          height="20"
          rx="3"
          fill={houseColor}
          opacity="0.15"
        />
        {/* Roof */}
        <path
          d="M4 22L18 8L32 22"
          stroke={houseColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* House front */}
        <rect
          x="10"
          y="22"
          width="16"
          height="16"
          rx="2"
          fill={houseColor}
        />
        {/* Door */}
        <rect x="15" y="28" width="6" height="10" rx="1" fill={variant === "white" ? "#1a5c5c" : "#ffffff"} />
        {/* Window */}
        <rect x="13" y="24" width="4" height="3" rx="0.5" fill={variant === "white" ? "#1a5c5c" : "#ffffff"} opacity="0.8" />
        <rect x="19" y="24" width="4" height="3" rx="0.5" fill={variant === "white" ? "#1a5c5c" : "#ffffff"} opacity="0.8" />
        {/* Chimney */}
        <rect x="24" y="12" width="4" height="10" rx="1" fill={houseColor} />
      </g>

      {/* Text "homefin" */}
      <text
        x="40"
        y="33"
        fontFamily="Figtree, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill={textColor}
        letterSpacing="-0.5"
      >
        home
        <tspan fill={accentColor}>fin</tspan>
      </text>
    </svg>
  );
}
