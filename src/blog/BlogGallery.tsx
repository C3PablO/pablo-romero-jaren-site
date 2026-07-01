import { PostItems } from '../lib/Content';
import { Pagination, IPaginationProps } from '../pagination/Pagination';
import ProjectCard from '../components/ProjectCard';

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination: IPaginationProps;
};

const BlogGallery = (
  props: IBlogGalleryProps & { path: string; columns?: 1 | 2 | 3 | 4 },
) => (
  <>
    <ul
      className={`grid grid-cols-1 gap-5 sm:grid-cols-${
        props.columns ?? 2
      } relative z-100`}
      id="gallery"
    >
      {props.posts.map((elt) => (
        <li data-aos="fade-up" key={elt.slug} id={elt.slug}>
          <ProjectCard post={elt} path={props.path} />
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
