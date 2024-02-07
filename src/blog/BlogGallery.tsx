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
      className=" grid grid-cols-1 gap-5 sm:grid-cols-2 relative z-1"
      id="gallery"
    >
      {props.posts.map((elt) => (
        <li
          key={elt.slug}
          className="grid-item overflow-hidden shadow-md relative"
        >
          <Link
            href={`/${props.path}/${elt.slug}`}
            className="block bg-white hover:no-underline rounded-xl overflow-hidden"
          >
            <div className="zoomIn">
              <img src={elt.image} alt={elt.title} />
            </div>
            <div className="info bottom-0 w-full p-5">
              <h3 className="text-indigo-900 truncate md:text-lg no-underline">
                {elt.title}
              </h3>
              <p className="text-sm normal mb-2 font-normal">
                {elt.description}
              </p>
              <small className="block underline text-pink-900 text-right">
                Read more
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
