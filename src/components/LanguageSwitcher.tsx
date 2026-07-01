import Link from 'next/link';

import { SupportedLocales } from '../lib/lang';

type ILanguageSwitcherProps = {
  locale: SupportedLocales;
  hrefEn: string;
  hrefEs: string;
};

const LanguageSwitcher = ({
  locale,
  hrefEn,
  hrefEs,
}: ILanguageSwitcherProps) => {
  const options: { code: SupportedLocales; label: string; href: string }[] = [
    { code: 'en', label: 'EN', href: hrefEn },
    { code: 'es', label: 'ES', href: hrefEs },
  ];

  return (
    <div className="flex shrink-0 items-center gap-2">
      {options.map((option, index) => {
        const isActive = option.code === locale;
        return (
          <span key={option.code} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">|</span>}
            {isActive ? (
              <span className="font-bold" aria-current="true">
                {option.label}
              </span>
            ) : (
              <Link
                href={option.href}
                hrefLang={option.code}
                className="opacity-70 transition-opacity hover:opacity-100"
              >
                {option.label}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
