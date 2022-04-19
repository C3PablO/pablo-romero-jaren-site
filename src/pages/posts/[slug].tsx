// https://ironeko.com/posts/how-to-use-next-js-image-with-markdown-or-mdx

// investigar: https://plaiceholder.co/docs/examples/next

import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import imageSize from 'rehype-img-size';

import { Content } from '../../content/Content';
import { Meta } from '../../layout/Meta';
import { Navbar } from '../../navigation/Navbar';
import { Main } from '../../templates/Main';
import { getAllPosts, getPostBySlug } from '../../utils/Content';

type IPostUrl = {
  slug: string;
};

type IPostProps = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  content: MDXRemoteSerializeResult;
  background?: string;
  containerClass?: string;
};

const customLoader = ({ src }: { src: string }) => {
  return src;
};

const components = {
  img: (props: ImageProps) => (
    // height and width are part of the props, so they get automatically passed here with {...props}
    <Image
      {...props}
      layout="responsive"
      loading="lazy"
      loader={customLoader}
    />
  ),
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
    <div className="fixed top-0 z-50 w-full">
      <Navbar>
        <ul className="flex w-full divide-x">
          <li className="mr-6 transition ease-in-out hover:scale-110 duration-200 cursor-pointer">
            <Link href="/#gallery">
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
      className={`max-w-screen-md mx-auto  px-3 pt-8 md:px-0 ${props.containerClass}`}
    >
      <Content>
        <MDXRemote {...props.content} components={components as any} />
      </Content>
    </div>
    <div className="flex justify-center">
      <Link href="/#gallery">
        <a className="text-xl md:text-2xl px-8 py-5 m-8 rounded-md inline-block text-zinc-100 transition ease-in-out hover:scale-110 duration-200 cursor-pointer bg-indigo-800 hover:bg-indigo-500 hover:no-underline">
          See more work
        </a>
      </Link>
    </div>
    <div className="bg-indigo-800 text-zinc-100 text-center text-sm flex p-4">
      <p>(ɔ) Pablo Romero Jarén 2022</p>
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

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      rehypePlugins: [[imageSize as any, { dir: 'public' }]],
    },
  });

  return {
    props: {
      title: post.title,
      description: post.description,
      date: post.date,
      modified_date: post.modified_date,
      background: post.background,
      containerClass: post.containerClass,
      image: post.image,
      content: mdxSource,
    },
  };
};

export default DisplayPost;
