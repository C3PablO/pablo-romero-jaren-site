export interface Props extends React.ComponentPropsWithoutRef<'svg'> {}

const ArrowLeft = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#a)">
      <path d="M24 11.143H3.669l8.957-9.703L11.374.274.55 12l10.825 11.726 1.252-1.166-8.957-9.703H24v-1.714Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default ArrowLeft;
