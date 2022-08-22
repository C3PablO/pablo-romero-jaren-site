// https://ironeko.com/posts/how-to-use-next-js-image-with-markdown-or-mdx

// investigar: https://plaiceholder.co/docs/examples/next

import path from 'path';

import React from 'react';

import MarkdownIt from 'markdown-it';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
import imageSize from 'rehype-img-size';
import { visit } from 'unist-util-visit';

import ImageComp from '../../components/image_comp';
import { Content } from '../../content/Content';
import { Meta } from '../../layout/Meta';
import { roughGradient4 } from '../../lib/utils';
import { Navbar } from '../../navigation/Navbar';
import { Main } from '../../templates/Main';
import { getAllPosts, getPostBySlug } from '../../utils/Content';
import {
  DEFAULT_LOCALE,
  localeMessages,
  LocaleMessages,
  SupportedLocales,
} from '../../utils/lang';

const ColorThief = require('colorthief');

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
  localeMessages: LocaleMessages;
  locale: SupportedLocales;
  background?: string;
  containerClass?: string;
};

const components = {
  img: ImageComp,
};

const DisplayPost = (props: IPostProps) => {
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
        <div className="fixed top-0 z-50 w-full">
          <Navbar>
            <ul className="flex w-full divide-x">
              <li className="mr-6 transition ease-in-out hover:scale-110 duration-200 cursor-pointer">
                <Link href="/">
                  <a className="flex no-underline">
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
                    {props.localeMessages[props.locale]['page.work.button.top']}
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
            <a className="text-xl md:text-2xl px-8 py-5 m-8 rounded-md inline-block text-zinc-100 transition ease-in-out hover:scale-110 duration-200 cursor-pointer bg-indigo-800 hover:bg-indigo-500 hover:no-underline no-underline font-normal">
              {props.localeMessages[props.locale]['page.work.button.bottom']}
            </a>
          </Link>
        </div>
        <div className="bg-indigo-800 text-zinc-100 text-center text-sm flex p-4">
          <p>(ɔ) Pablo Romero Jarén 2022</p>
        </div>
      </Main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<IPostUrl> = async (context) => {
  const locales = context.locales || [DEFAULT_LOCALE];
  const posts = getAllPosts(['slug'], locales);

  const paths = Object.keys(posts)
    .map((locale) =>
      posts[locale].map((post) => ({
        params: {
          slug: post.slug,
          locale,
        },
      }))
    )
    .flat();
  return {
    paths,
    fallback: true,
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
  locale,
}) => {
  const currentLocale = (locale ?? DEFAULT_LOCALE) as SupportedLocales;
  const post = getPostBySlug(params!.slug, currentLocale, [
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

  const gradients = await Promise.all(
    imagePaths.map(async (src: string) => {
      path.join(__dirname, '../', `public${src}`);
      const colors = await ColorThief.getPalette(
        path.join(__dirname, '../../../../', 'public', src),
        4
      );
      return {
        src,
        css: roughGradient4(colors),
      };
    })
  ).then((values) => values);

  const placeholdersObj: { [key: string]: string } = {};
  gradients.forEach((item: { src: string; css: string }) => {
    placeholdersObj[item.src] = item.css;
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
      localeMessages,
      locale: currentLocale,
    },
  };
};

export default DisplayPost;
