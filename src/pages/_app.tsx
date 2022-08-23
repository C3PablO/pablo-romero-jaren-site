import React from 'react';

import { AppProps } from 'next/app';

import '../styles/main.css';
import '../styles/prism-a11y-dark.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-amber-50">
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
