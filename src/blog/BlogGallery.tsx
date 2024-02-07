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
    <ul className=" grid grid-cols-1 gap-5 sm:grid-cols-2" id="gallery">
      {props.posts.map((elt) => (
        <li
          key={elt.slug}
          className="grid-item bg-white overflow-hidden rounded-3xl shadow-md relative"
        >
          <Link
            href={`/${props.path}/${elt.slug}`}
            className="hover:no-underline"
          >
            <div className="zoomIn">
              <img src={elt.image} alt={elt.title} />
            </div>
            <div className="info bottom-0 w-full p-5">
              <h3 className="text-indigo-900 truncate text-xs md:text-lg no-underline">
                {elt.title}
              </h3>
              <p className="text-sm"> {elt.description}</p>
              <small className="block underline text-pink-900 text-right">
                See more
              </small>
            </div>
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
