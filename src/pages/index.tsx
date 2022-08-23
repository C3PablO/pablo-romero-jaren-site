import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { languageDetector, DEFAULT_LOCALE } from '../utils/lang';

export const useRedirect = () => {
  const router = useRouter();
  // redirect to locale
  useEffect(() => {
    const detectedLng = languageDetector.detect() ?? DEFAULT_LOCALE;
    if (languageDetector.cache) {
      languageDetector.cache(detectedLng);
    }
    router.replace(`/${detectedLng}`);
  }, []);

  return <></>;
};

const Redirect = () => {
  useRedirect();
  return <></>;
};

export default Redirect;
