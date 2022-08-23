import React from 'react';

import { IBlogGalleryProps } from '../../blog/BlogGallery';
import IndexPage from '../../components/layout';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { getIndexStaticProps } from '../../utils/Index';
import {
  SupportedLocales,
  LocaleMessages,
  locales,
  localeMessages,
} from '../../utils/lang';

type ILocaleProps = {
  localeMessages: LocaleMessages;
  locale: SupportedLocales;
};

const Index = (props: IBlogGalleryProps & ILocaleProps) => {
  return (
    <>
      <Main
        meta={
          <Meta
            title={localeMessages.en['page.index.meta.title']}
            description={localeMessages.en['page.index.meta.description']}
            locale={locales.en}
          />
        }
      >
        <IndexPage {...props} />
      </Main>
    </>
  );
};

const getStaticProps = getIndexStaticProps(locales.en);
export { getStaticProps };

export default Index;
