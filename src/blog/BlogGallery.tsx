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
    <ul
      className=" grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-5"
      id="gallery"
    >
      {props.posts.map((elt) => (
        <li key={elt.slug} className="grid-item">
          <Link href={`/${props.path}/${elt.slug}`}>
            <div className="zoomIn">
              <img src={elt.image} alt={elt.title} />
            </div>
            <h3 className="text-indigo-900 p-2 relative truncate text-xs md:text-lg">
              {elt.title}
            </h3>
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
