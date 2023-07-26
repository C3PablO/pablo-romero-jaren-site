import Link from 'next/link';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  markup?: 'button' | 'a';
  widthType?: string;
}

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
  markup?: 'button' | 'a';
  widthType?: string;
}

const Button = (props: ButtonProps & LinkProps) => {
  const { markup = 'button', ...rest } = props;
  // do something with specialProp
  const Component = markup === 'button' ? 'button' : Link;
  const addProps = { ...rest };
  delete addProps.widthType;
  return (
    <Component
      {...addProps}
      href={props.href ?? ''}
      className={`button ${rest.widthType ?? 'w-fit'} ${rest.className ?? ''}`}
    >
      {props.children}
    </Component>
  );
};

export default Button;
