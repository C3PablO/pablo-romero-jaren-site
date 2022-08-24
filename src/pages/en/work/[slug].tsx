import React from 'react';

import { GetStaticPaths } from 'next/types';

import LayoutPost, { IPostProps } from '../../../components/layout/post';
import { Meta } from '../../../layout/Meta';
import { Main } from '../../../templates/Main';
import { getAllPosts } from '../../../utils/Content';
import { locales } from '../../../utils/lang';
import { getPostStaticProps, IPostUrl } from '../../../utils/Post';

const getStaticProps = getPostStaticProps(locales.en);

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
