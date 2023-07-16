export interface Props extends React.ComponentPropsWithoutRef<'span'> {}

const ButtonLabel = (props: Props) => {
  return (
    <span className="grow" {...props}>
      {props.children}
    </span>
  );
};

export default ButtonLabel;
