// https://ironeko.com/posts/how-to-use-next-js-image-with-markdown-or-mdx

// investigar: https://plaiceholder.co/docs/examples/next

import React from 'react';

import MarkdownIt from 'markdown-it';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';
import imageSize from 'rehype-img-size';
import { visit } from 'unist-util-visit';

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
  img: (props: ImageProps) => {
    const updatedProps = { ...props, 'aria-placeholder': undefined };
    return (
      // height and width are part of the props, so they get automatically passed here with {...props}
      <Image
        {...updatedProps}
        alt=""
        layout="responsive"
        placeholder="blur"
        loader={customLoader}
        blurDataURL={props['aria-placeholder']}
      />
    );
  },
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
      className={`max-w-screen-md mx-auto  px-3 pt-8 md:px-0 ${props.containerClass}`}
    >
      <Content>
        <MDXRemote {...props.content} components={components as any} />
      </Content>
    </div>
    <div className="flex justify-center">
      <Link href="/">
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

function setPlaceholders(options: { placeholders: { [key: string]: string } }) {
  function transformer(tree: any) {
    function visitor(node: any) {
      if (node.tagName === 'img') {
        // eslint-disable-next-line no-param-reassign
        node.properties['aria-placeholder'] =
          options.placeholders[node.properties.src];
      }
    }
    visit(tree, 'element', visitor);
  }
  return transformer;
}

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

  const mdi = new MarkdownIt();
  const result = mdi.parse(post.content, {});
  const imagePaths = result
    .filter(
      (item: any) =>
        item.content.startsWith('!') &&
        item.content.includes('/assets/images/posts/')
    )
    .map((item: any) => {
      // improve this. it can easily break images
      return item.content.slice(0, -1).slice(4);
    });
  const placeholders = await Promise.all(
    imagePaths.map(async (src: string) => {
      const { base64 } = await getPlaiceholder(src, { size: 10 });

      return {
        base64,
        src,
      };
    })
  ).then((values) => values);

  const placeholdersObj: { [key: string]: string } = {};
  placeholders.forEach((item: { src: string; base64: string }) => {
    placeholdersObj[item.src] = item.base64;
  });

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      rehypePlugins: [
        [imageSize as any, { dir: 'public' }],
        [setPlaceholders, { placeholders: placeholdersObj }],
      ],
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
