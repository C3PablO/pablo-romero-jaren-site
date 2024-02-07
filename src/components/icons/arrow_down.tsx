export interface Props extends React.ComponentPropsWithoutRef<'svg'> {}
const ArrowDown = (props: Props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.4176 0.274658L11.4176 20.6057L1.71458 11.6487L0.548584 12.8997L12.2746 23.7257L24.0006 12.8997L22.8346 11.6487L13.1316 20.6057L13.1316 0.274658L11.4176 0.274658Z"
      fill="currentColor"
    />
  </svg>
);

export default ArrowDown;
