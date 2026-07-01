import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';

import { Content } from '../../content/Content';
import { PostItems } from '../../lib/Content';
import { LocaleMessages, SupportedLocales } from '../../lib/lang';
import Button from '../button';
import ArrowLeft from '../icons/arrow_left';
import Home from '../icons/home';
import ProjectCard from '../ProjectCard';
import LanguageSwitcher from '../LanguageSwitcher';
import ImageComp from '../image_comp';
import ArrowDown from '../icons/arrow_down';
import ArrowRight from '../icons/arrow_right';

const components = {
  img: ImageComp,
};

export type IPostProps = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  content: MDXRemoteSerializeResult;
  localeMessages: LocaleMessages;
  locale: SupportedLocales;
  background?: string;
  prev?: string;
  next?: string;
  containerClass?: string;
  slug: string;
  otherPosts: PostItems[];
};
const LayoutPost = (props: IPostProps) => {
  return (
    <>
      <div
        key={props.title}
        className={`max-w-[1000px] mx-auto  px-3 pt-8 md:px-0 ${props.containerClass}`}
      >
        <Content>
          <MDXRemote {...props.content} components={components as any} />
        </Content>
        <div className="flex gap-4 justify-center w-full py-20">
          <Link
            className="flex gap-2 items-center"
            href={`/${props.localeMessages[props.locale]['route.work']}/${
              props.prev
            }`}
          >
            <ArrowLeft />{' '}
            {props.localeMessages[props.locale]['page.work.button.prev']}
          </Link>
          <span>|</span>
          <Link
            className="flex gap-2 items-center"
            href={`/${props.localeMessages[props.locale]['route.work']}/${
              props.next
            }`}
          >
            {props.localeMessages[props.locale]['page.work.button.next']}{' '}
            <ArrowRight />
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="fixed top-5 left-5 navbar z-100">
          <Button
            markup="a"
            href={`/${props.locale}`}
            aria-label={
              props.localeMessages[props.locale]['page.work.button.home']
            }
          >
            <Home />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-amber-50 pr-0 rounded-4xl border-solid border-2 border-amber-200">
          <h2 className="font-display text-2xl mb-4 px-8 pt-8 pb-4  text-indigo-900">
            {props.localeMessages[props.locale]['page.work.title.other']}
          </h2>
          {props.otherPosts?.length > 0 && (
            <div className="-mx-3 flex gap-5 overflow-x-auto pb-8 md:mx-0">
              {props.otherPosts.map((post, index) => (
                <div
                  key={post.slug}
                  className={`w-64 shrink-0 sm:w-72 md:w-96 lg:w-[28rem] ${
                    index === 0 ? 'ml-8' : ''
                  } ${index === props.otherPosts.length - 1 ? 'mr-8' : ''}`}
                >
                  <ProjectCard
                    post={post}
                    path={props.localeMessages[props.locale]['route.work']}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-indigo-900 text-zinc-100 text-center text-sm flex items-center gap-4 p-4">
        <a href="#" className="animate-pulse rotate-180">
          <ArrowDown width={18} height={18} />
        </a>
        <p className="w-full">(ɔ) Pablo Romero Jarén 2026</p>
        <LanguageSwitcher
          locale={props.locale}
          hrefEn={`/${props.localeMessages['en']['route.work']}/${props.slug}`}
          hrefEs={`/${props.localeMessages['es']['route.work']}/${props.slug}`}
        />
      </div>
    </>
  );
};

export default LayoutPost;
