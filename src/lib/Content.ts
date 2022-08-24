import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export type PostItems = {
  [key: string]: string;
};

export function getPostSlugs(locales: string[]) {
  const slugsByLocale: { [key: string]: string[] } = {};
  locales.forEach((locale) => {
    slugsByLocale[locale] = fs.readdirSync(`${postsDirectory}/${locale}`);
  });
  return slugsByLocale;
}

export function getPostBySlug(
  slug: string,
  locale: string,
  fields: string[] = []
) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `/${locale}`, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const items: PostItems = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = [], locales: string[] = []) {
  const postsByLocale: { [key: string]: PostItems[] } = {};
  const slugsByLocale = getPostSlugs(locales);
  Object.keys(slugsByLocale).forEach((locale) => {
    postsByLocale[locale] = slugsByLocale[locale]
      .map((slug) => getPostBySlug(slug, locale, fields))
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  });

  return postsByLocale;
}
