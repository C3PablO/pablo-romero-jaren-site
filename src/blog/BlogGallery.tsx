import React from 'react';

import Link from 'next/link';

import { PostItems } from '../lib/Content';
import { Pagination, IPaginationProps } from '../pagination/Pagination';

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination: IPaginationProps;
};

const BlogGallery = (props: IBlogGalleryProps & { path: string }) => (
  <>
    <ul className=" grid grid-cols-1 sm:grid-cols-2 gap-4" id="gallery">
      {props.posts.map((elt) => (
        <li
          key={elt.slug}
          className="mb-3 flex justify-between rounded overflow-hidden"
        >
          <Link href={`/${props.path}/${elt.slug}`}>
            <a className="zoomIn hover:no-underline font-normal no-underline">
              <img src={elt.image} alt={elt.title} />
              <h2 className="bg-indigo-800 text-zinc-100 p-3 relative truncate text-xs md:text-lg">
                {elt.title}
              </h2>
            </a>
          </Link>
        </li>
      ))}
    </ul>

    <Pagination
      previous={props.pagination.previous}
      next={props.pagination.next}
    />
  </>
);

export { BlogGallery };
