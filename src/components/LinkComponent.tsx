import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { SupportedLocales } from '../lib/lang';

type ILinkComponent = {
  skipLocaleHandling?: boolean;
  locale: SupportedLocales;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const LinkComponent = ({
  children,
  skipLocaleHandling,
  ...rest
}: ILinkComponent) => {
  let skipLocale = skipLocaleHandling;
  const router = useRouter();
  const locale = rest.locale || router.query.locale || '';

  let href = rest.href || router.asPath;
  if (href.indexOf('http') === 0 || href.indexOf('https') === 0) {
    skipLocale = true;
  }
  if (locale && !skipLocale) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace('[locale]', locale);
  }

  return (
    <>
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    </>
  );
};

export default LinkComponent;
