import React from 'react';

const HomeIcon = ({ fill = "black", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill} // This allows you to change the color via props
    {...props}
  >
    {/* Paste the contents of your SVG file here */}
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

export default HomeIcon;
