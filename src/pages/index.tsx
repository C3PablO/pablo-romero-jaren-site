import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { languageDetector, DEFAULT_LOCALE } from '../utils/lang';

export const useRedirect = (toRoute?: string) => {
  const router = useRouter();
  const to = toRoute || router.asPath;

  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect() ?? DEFAULT_LOCALE;
    if (to.startsWith(`/${detectedLng}`) && router.route === '/404') {
      // prevent endless loop
      router.replace(`/${detectedLng}${router.route}`);
      return;
    }
    if (languageDetector.cache) {
      languageDetector.cache(detectedLng);
    }
    router.replace(`/${detectedLng}`);
  });

  return <></>;
};

const Redirect = () => {
  useRedirect();
  return <></>;
};

export default Redirect;
