import React, { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';

import { DEFAULT_LOCALE, languageDetector } from '../lib/lang';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  style?: React.CSSProperties;
};

export const useLanguage = () => {
  // language detection
  const router = useRouter();
  useEffect(() => {
    const detectedLng = languageDetector.detect() ?? DEFAULT_LOCALE;
    const routeLanguage = router.route.split('/')[1];
    if (routeLanguage !== detectedLng && languageDetector.cache) {
      languageDetector.cache(routeLanguage);
    }
  }, []);

  return <></>;
};

const Main = (props: IMainProps) => {
  useLanguage();
  return (
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
};

export { Main };
