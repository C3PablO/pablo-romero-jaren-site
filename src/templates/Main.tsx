import React, { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  style?: React.CSSProperties;
};

const Main = (props: IMainProps) => (
  <div
    className="antialiased w-full text-gray-700 overflow-auto"
    style={props.style}
  >
    {props.meta}
    <div className="font-sans w-full overflow-hidden">
      <div className="text-xl">{props.children}</div>
    </div>
  </div>
);

export { Main };
