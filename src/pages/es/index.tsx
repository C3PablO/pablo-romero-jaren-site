import React from 'react';

import { IBlogGalleryProps } from '../../blog/BlogGallery';
import IndexPage from '../../components/layout';
import { Meta } from '../../layout/Meta';
import { getIndexStaticProps } from '../../lib/Index';
import {
  SupportedLocales,
  LocaleMessages,
  locales,
  localeMessages,
} from '../../lib/lang';
import { Main } from '../../templates/Main';

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
            title={localeMessages.es['page.index.meta.title']}
            description={localeMessages.es['page.index.meta.description']}
            locale={locales.es}
          />
        }
      >
        <IndexPage {...props} />
      </Main>
    </>
  );
};

const getStaticProps = getIndexStaticProps(locales.es);
export { getStaticProps };

export default Index;
