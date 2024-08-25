import React from "react";

function PowerBicon({ width = "24px", height = "24px", strokeWidth = "130.625" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 2671 2544"
      overflow="hidden"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#FFF"
        strokeMiterlimit="8"
        strokeWidth={strokeWidth}
      >
        <path
          d="M1107.5 659.667V2413.5h-850V659.667c0-56.977 46.129-103.167 103.031-103.167h643.929c56.91 0 103.04 46.19 103.04 103.167z"
          transform="translate(650 65)"
        ></path>
        <path
          d="M-584.5 1278.67v1031.66c0 56.98 46.183 103.17 103.152 103.17H266.5V1278.67c0-56.98-46.183-103.17-103.152-103.17h-644.696c-56.969 0-103.152 46.19-103.152 103.17zM1955.5 134.556V2413.5h-851V134.556C1104.5 60.519 1150.68.5 1207.65.5h644.69c56.97 0 103.16 60.02 103.16 134.056z"
          transform="translate(650 65)"
        ></path>
      </g>
    </svg>
  );
}

export default PowerBicon;
