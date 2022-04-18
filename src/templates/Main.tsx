import React, { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  style?: React.CSSProperties;
};

const Main = (props: IMainProps) => (
  <div
    className="antialiased min-h-screen w-full text-gray-700 overflow-auto"
    style={props.style}
  >
    {props.meta}
    <div className="min-h-screen font-sans">
      <div className="text-xl">{props.children}</div>
    </div>
    <div className="bg-indigo-800 text-zinc-100 text-center text-sm flex p-4">
      <p>Pablo Romero Jarén 2022</p>
    </div>
  </div>
);

export { Main };
