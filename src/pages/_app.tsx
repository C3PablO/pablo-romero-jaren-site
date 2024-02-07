import React from 'react';

import { AppProps } from 'next/app';
import { Fraunces, Inter } from 'next/font/google';

import '../styles/main.css';
import '../styles/prism-a11y-dark.css';

const inter = Inter({
  weight: ['300'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const bungee = Fraunces({
  weight: ['900'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-fraunces',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${bungee.variable} ${inter.variable} bg-amber-50 font-sans`}
    >
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
