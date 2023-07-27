import React from 'react';

import { AppProps } from 'next/app';
import { Bungee_Shade, Roboto_Mono } from 'next/font/google';

import '../styles/main.css';
import '../styles/prism-a11y-dark.css';

const roboto = Roboto_Mono({
  weight: ['300'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const bungee = Bungee_Shade({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-bungee',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${bungee.variable} ${roboto.variable} bg-amber-50 font-sans`}
    >
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
