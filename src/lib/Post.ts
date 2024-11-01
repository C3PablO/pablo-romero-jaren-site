import path from 'path';

import MarkdownIt from 'markdown-it';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { serialize } from 'next-mdx-remote/serialize';
import imageSize from 'rehype-img-size';
import { visit } from 'unist-util-visit';

import { IPostProps } from '../components/layout/post';
import { roughGradient4 } from './color';
import { getAllPosts, getPostBySlug } from './Content';
import { localeMessages, locales, SupportedLocales } from './lang';

const ColorThief = require('colorthief');

export type IPostUrl = {
  slug: string;
};

export const getPostStaticPaths: () => GetStaticPaths<IPostUrl> =
  () => async () => {
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

export const getPostStaticProps: (
  locale: SupportedLocales
) => GetStaticProps<IPostProps, IPostUrl> =
  (locale: SupportedLocales) =>
  async ({ params }) => {
    const currentLocale = locales[locale];
    const post = getPostBySlug(params!.slug, currentLocale, [
      'title',
      'description',
      'date',
      'modified_date',
      'background',
      'containerClass',
      'category',
      'image',
      'content',
      'slug',
    ]);

    const myposts = getAllPosts(['slug', 'date'], Object.values(locales))[
      currentLocale
    ];
    const index = myposts.findIndex((item) => item.slug === params!.slug);
    const prevIdex = index > 0 ? index - 1 : myposts.length - 1;
    const nextIndex = index < myposts.length - 1 ? index + 1 : 0;

    const prevSlug = myposts[prevIdex].slug;
    const nextSlug = myposts[nextIndex].slug;

    post.prev = prevSlug;
    post.next = nextSlug;

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
          path.join(
            __dirname,
            process.env.NODE_ENV === 'production'
              ? '../../../'
              : '../../../../../',
            'public',
            src
          ),
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
        category: post.category,
        image: post.image,
        content: mdxSource,
        localeMessages,
        locale: currentLocale,
        prev: post.prev,
        next: post.next,
        slug: post.slug,
      },
    };
  };
