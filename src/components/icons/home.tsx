export interface Props extends React.ComponentPropsWithoutRef<'svg'> {}

const Home = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M12 2.1 1 12h3v9h6v-6h4v6h6v-9h3L12 2.1Z" />
  </svg>
);

export default Home;
