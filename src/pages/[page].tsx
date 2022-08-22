import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { BlogGallery, IBlogGalleryProps } from '../blog/BlogGallery';
import { Meta } from '../layout/Meta';
import { IPaginationProps } from '../pagination/Pagination';
import { Main } from '../templates/Main';
import { AppConfig } from '../utils/AppConfig';
import { getAllPosts } from '../utils/Content';
import { DEFAULT_LOCALE, SupportedLocales } from '../utils/lang';
import { convertTo2D } from '../utils/Pagination';

type IPageUrl = {
  page: string;
};

const PaginatePosts = (props: IBlogGalleryProps) => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <BlogGallery posts={props.posts} pagination={props.pagination} />
  </Main>
);

export const getStaticPaths: GetStaticPaths<IPageUrl> = async (context) => {
  const locales = context.locales || [DEFAULT_LOCALE];
  const posts = getAllPosts(['slug'], locales);

  const pages = convertTo2D(posts.en, AppConfig.pagination_size);

  return {
    paths: pages.slice(1).map((_, ind) => ({
      params: {
        // Ind starts from zero so we need to do ind + 1
        // slice(1) removes the first page so we do another ind + 1
        // the first page is implemented in index.tsx
        page: `page${ind + 2}`,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  IBlogGalleryProps,
  IPageUrl
> = async (context) => {
  const currentLocale = (context.locale ?? DEFAULT_LOCALE) as SupportedLocales;
  const locales = context.locales || [DEFAULT_LOCALE];
  const posts = getAllPosts(['title', 'date', 'slug'], locales);

  const pages = convertTo2D(posts[currentLocale], AppConfig.pagination_size);
  const currentPage = Number(context.params!.page.replace('page', ''));
  const currentInd = currentPage - 1;

  const pagination: IPaginationProps = {};

  if (currentPage < pages.length) {
    pagination.next = `page${currentPage + 1}`;
  }

  if (currentPage === 2) {
    pagination.previous = '/';
  } else {
    pagination.previous = `page${currentPage - 1}`;
  }

  return {
    props: {
      posts: pages[currentInd],
      pagination,
    },
  };
};

export default PaginatePosts;
