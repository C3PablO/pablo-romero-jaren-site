import React from 'react';

import Link from 'next/link';

import { PostItems } from '../lib/Content';
import { Pagination, IPaginationProps } from '../pagination/Pagination';
import ArrowRight from '../components/icons/arrow_right';

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
          className="grid-item overflow-hidden shadow-md shadow-gray-950/20 relative"
        >
          <Link
            href={`/${props.path}/${elt.slug}`}
            className="block bg-white hover:no-underline rounded-xl overflow-hidden"
          >
            <div className="zoomIn border-solid border-2 border-white">
              <img src={elt.image} alt={elt.title} className="rounded-b-xl" />
            </div>
            <div className="info bottom-0 w-full p-5">
              <h3 className="text-indigo-900 truncate md:text-lg no-underline">
                {elt.title}
              </h3>
              <p className="text-sm normal mb-2 font-normal">
                {elt.description}
              </p>
              <small className="block text-pink-900 text-right">
                Read more <ArrowRight width={14} className="ml-1 inline" />
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
