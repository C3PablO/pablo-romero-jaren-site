import React, { ReactNode } from 'react';

type INavbarProps = {
  children: ReactNode;
};

const Navbar = (props: INavbarProps) => (
  <nav className="bg-indigo-900 navbar flex text-xl p-2">
    {props.children}

    <style jsx>
      {`
        .navbar :global(a) {
          @apply text-indigo-200;
          @apply font-semibold;
        }

        .navbar :global(a:hover) {
          @apply no-underline text-zinc-100;
        }
      `}
    </style>
  </nav>
);

export { Navbar };
