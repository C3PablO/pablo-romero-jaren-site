import { GetStaticProps } from 'next/types';

import { AppConfig } from './AppConfig';
import { getAllPosts } from './Content';
import { localeMessages, locales, SupportedLocales } from './lang';
import { IBlogGalleryProps } from '../blog/BlogGallery';
import { IPaginationProps } from '../pagination/Pagination';

export const getIndexStaticProps: (
  locale: SupportedLocales
) => GetStaticProps<IBlogGalleryProps> =
  (locale: SupportedLocales) => async () => {
    const currentLocale = locales[locale];
    const posts = getAllPosts(
      ['title', 'date', 'slug', 'image'],
      Object.values(locales)
    );
    const pagination: IPaginationProps = {};

    if (posts[currentLocale].length > AppConfig.pagination_size) {
      pagination.next = '/page2';
    }

    return {
      props: {
        posts: posts[currentLocale].slice(0, AppConfig.pagination_size),
        pagination,
        localeMessages,
        locale: currentLocale,
      },
    };
  };
