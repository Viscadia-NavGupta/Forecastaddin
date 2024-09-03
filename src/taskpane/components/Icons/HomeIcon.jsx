import React from "react";

function HomeIcon({ fill = "#FFFFFF", width = "24px", height = "24px" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 64 64" fill={fill}>
      <path d="M32 2.133l-30 28.5 4.5 4.2L32 10.5 57.5 34.833l4.5-4.2-30-28.5zm0 10.667L8 34.833V58h16V42h16v16h16V34.833L32 12.8z" />
    </svg>
  );
}

export default HomeIcon;
