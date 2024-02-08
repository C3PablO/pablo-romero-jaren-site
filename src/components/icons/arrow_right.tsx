export interface Props extends React.ComponentPropsWithoutRef<'svg'> {}

const ArrowRight = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#a)">
      <path d="M.549 12.857H20.88l-8.957 9.703 1.251 1.166L24 12 13.174.274 11.923 1.44l8.957 9.703H.549v1.714Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default ArrowRight;
