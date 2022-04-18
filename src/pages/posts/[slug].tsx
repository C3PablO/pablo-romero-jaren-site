import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import { Content } from '../../content/Content';
import { Meta } from '../../layout/Meta';
import { Navbar } from '../../navigation/Navbar';
import { Main } from '../../templates/Main';
import { getAllPosts, getPostBySlug } from '../../utils/Content';
import { markdownToHtml } from '../../utils/Markdown';

type IPostUrl = {
  slug: string;
};

type IPostProps = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  content: string;
  background?: string;
  containerClass?: string;
};

const DisplayPost = (props: IPostProps) => (
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
    <div className="sticky top-0 z-50 relative w-full">
      <Navbar>
        <ul className="flex w-full divide-x">
          <li className="mr-6 transition ease-in-out hover:scale-110 duration-200 cursor-pointer">
            <Link href="/">
              <a className="flex">
                <svg
                  className="mr-2"
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 28 28"
                >
                  <g clipPath="url(#a)">
                    <path d="M28 13H4.28L14.73 1.68 13.27.32.64 14l12.63 13.68 1.46-1.36L4.28 15H28v-2Z" />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path d="M0 0h28v28H0z" />
                    </clipPath>
                  </defs>
                </svg>
                Work
              </a>
            </Link>
          </li>
          <li className="w-full truncate">
            <h1 className="text-xs w-full text-indigo-200 text-xl px-5 truncate">
              {' '}
              {props.title}
            </h1>
          </li>
        </ul>
      </Navbar>
    </div>
    <div
      className={`max-w-screen-md mx-auto  px-3 md:px-0 ${props.containerClass}`}
    >
      <Content>
        <div
          className="text-center space-y-10 md:space-y-20 text-sm md:text-base py-5"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </Content>
    </div>
    <div className="flex content-center">
      <Link href="/">
        <a className="text-xl md:text-2xl pt-8 pb-10 inline-block text-zinc-100 transition ease-in-out hover:scale-110 duration-200 cursor-pointer">
          See more work
        </a>
      </Link>
    </div>
  </Main>
);

export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IPostProps, IPostUrl> = async ({
  params,
}) => {
  const post = getPostBySlug(params!.slug, [
    'title',
    'description',
    'date',
    'modified_date',
    'background',
    'containerClass',
    'image',
    'content',
    'slug',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      title: post.title,
      description: post.description,
      date: post.date,
      modified_date: post.modified_date,
      background: post.background,
      containerClass: post.containerClass,
      image: post.image,
      content,
    },
  };
};

export default DisplayPost;
