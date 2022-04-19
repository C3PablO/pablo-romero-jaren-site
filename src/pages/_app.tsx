import React, { useEffect, useState } from 'react';

import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { AppProps } from 'next/app';

import '../styles/main.css';
import '../styles/prism-a11y-dark.css';

import { animations } from '../lib/animations';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  const startIndex = 2;
  const animation = animations[startIndex];
  const exitBefore = false;

  return (
    <div className="app-wrap bg-amber-50">
      <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter={!exitBefore}>
          <m.div
            key={router.route.concat(animation.name)}
            className={loaded ? 'page-wrap' : 'page-wrap first'}
            initial={loaded ? 'initial' : undefined}
            animate="animate"
            exit="exit"
            variants={animation.variants}
            transition={animation.transition}
          >
            <Component {...pageProps} />
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}
export default MyApp;
