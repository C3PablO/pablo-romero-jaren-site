import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';

import { Content } from '../../content/Content';
import { LocaleMessages, SupportedLocales } from '../../lib/lang';
import Button from '../button';
import ButtonLabel from '../button_label';
import ArrowLeft from '../icons/arrow_left';
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
};
const LayoutPost = (props: IPostProps) => {
  return (
    <>
      <div
        key={props.title}
        className={`max-w-screen-md mx-auto  px-3 pt-8 md:px-0 ${props.containerClass}`}
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
            <ArrowLeft /> Prev
          </Link>
          <span>|</span>
          <Link
            className="flex gap-2 items-center"
            href={`/${props.localeMessages[props.locale]['route.work']}/${
              props.next
            }`}
          >
            Next <ArrowRight />
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="fixed top-5 left-5 navbar z-100">
          <Button markup="a" href={`/${props.locale}#work`}>
            <ArrowLeft />
            <ButtonLabel>
              {props.localeMessages[props.locale]['page.work.button.bottom']}
            </ButtonLabel>
          </Button>
        </div>
      </div>
      <div className="bg-indigo-900 text-zinc-100 text-center text-sm flex p-4">
        <a href="#" className="animate-pulse rotate-180">
          <ArrowDown width={18} height={18} />
        </a>
        <p className="w-full">(ɔ) Pablo Romero Jarén 2024</p>
      </div>
    </>
  );
};

export default LayoutPost;
