import React from 'react';

import { GetStaticPaths } from 'next/types';

import LayoutPost, { IPostProps } from '../../../components/layout/post';
import { Meta } from '../../../layout/Meta';
import { getAllPosts } from '../../../lib/Content';
import { locales } from '../../../lib/lang';
import { getPostStaticProps, IPostUrl } from '../../../lib/Post';
import { Main } from '../../../templates/Main';

const getStaticProps = getPostStaticProps(locales.es);

export { getStaticProps };

export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
  const posts = getAllPosts(['slug'], Object.values(locales));

  const paths = Object.keys(posts)
    .map((locale) =>
      posts[locale].map((post) => ({
        params: {
          slug: post.slug,
        },
      }))
    )
    .flat();
  return {
    paths,
    fallback: true,
  };
};

const DisplayPost = (props: IPostProps) => {
  if (!props.date) {
    return <div />;
  }
  return (
    <>
      <Main
        style={{ background: props.background }}
        meta={
          <Meta
            title={props.title}
            description={props.description}
            post={{
              image: props.image,
              date: props.date,
              modified_date: props.modified_date,
            }}
          />
        }
      >
        <LayoutPost {...props} />
      </Main>
    </>
  );
};

export default DisplayPost;
