import Link from 'next/link';

import { PostItems } from '../lib/Content';
import ArrowRight from './icons/arrow_right';

type IProjectCardProps = {
  post: PostItems;
  path: string;
};

const ProjectCard = ({ post, path }: IProjectCardProps) => (
  <Link href={`/${path}/${post.slug}`} className="grid-item">
    <div className="zoomIn border-solid border-2 border-white">
      <img src={post.image} alt={post.title} className="rounded-b-xl" />
    </div>
    <div className="info bottom-0 w-full p-5">
      <h4 className="font-display text-indigo-900 truncate md:text-lg no-underline">
        {post.title}
      </h4>
      <p className="text-sm normal mb-2 font-normal">{post.description}</p>
      <small className="block text-indigo-900 text-right">
        Read more <ArrowRight width={14} className="ml-1 inline" />
      </small>
    </div>
  </Link>
);

export default ProjectCard;
