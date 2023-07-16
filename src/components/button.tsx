export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  markup?: 'button' | 'a';
  widthType?: string;
}

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
  markup?: 'button' | 'a';
  widthType?: string;
}

const Button = (props: ButtonProps & LinkProps) => {
  const { markup, ...rest } = props;
  // do something with specialProp
  const Component = markup ?? 'button';
  return (
    <Component
      {...rest}
      className={`button ${rest.widthType ?? 'w-fit'} ${rest.className}`}
    >
      {props.children}
    </Component>
  );
};

export default Button;
