import * as React from 'react';

type Props = {
  className: string;
};

const Logo = (props: Props) => (
  <svg
    viewBox="0 0 69 91"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M37.235.51h-4.82C14.965.51.765 14.71.765 32.16v26.47c0 17.45 14.2 31.65 31.65 31.65h4.82c17.45 0 31.65-14.2 31.65-31.65V32.16c0-17.45-14.2-31.65-31.65-31.65Zm27.77 58.12c0 15.31-12.46 27.77-27.77 27.77h-4.82c-15.31 0-27.77-12.46-27.77-27.77V32.16c0-15.31 12.46-27.77 27.77-27.77h4.82c15.31 0 27.77 12.46 27.77 27.77v26.47Z"
      fill="#3730A3"
    />
    <path
      d="m51.405 16.53-2.68-2.8-11.95 11.41V12.73h-3.87v12.41l-11.98-11.41-2.68 2.8 14.66 13.96v6.65l-11.98-11.42-2.68 2.81 14.66 13.96v6.64l-11.98-11.42-2.68 2.81 14.66 13.96v23.58h3.87V54.48l14.63-13.96-2.68-2.8-11.95 11.4v-6.63l14.63-13.97-2.68-2.8-11.95 11.41v-6.64l14.63-13.96Z"
      fill="#3730A3"
    />
  </svg>
);

export default Logo;
