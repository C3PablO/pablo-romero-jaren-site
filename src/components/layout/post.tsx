import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';

import { Content } from '../../content/Content';
import { LocaleMessages, SupportedLocales } from '../../lib/lang';
import ImageComp from '../image_comp';

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
  containerClass?: string;
};
const LayoutPost = (props: IPostProps) => {
  return (
    <>
      <div
        className={`max-w-screen-md mx-auto  px-3 pt-8 md:px-0 ${props.containerClass}`}
      >
        <Content>
          <MDXRemote {...props.content} components={components as any} />
        </Content>
      </div>
      <div className="flex justify-center p-8 pb-12">
        <Link href={`/${props.locale}#work`}>
          <div className="fixed top-5 left-5 navbar">
            <a className="button">
              <svg
                className="mr-2"
                width={24}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 28 28"
              >
                <g clipPath="url(#a)">
                  <path d="M28 13H4.28L14.73 1.68 13.27.32.64 14l12.63 13.68 1.46-1.36L4.28 15H28v-2Z" />
                </g>
                <defs>
                  <clipPath id="a">
                    <path d="M0 0h28v28H0z" />
                  </clipPath>
                </defs>
              </svg>
              {props.localeMessages[props.locale]['page.work.button.bottom']}
            </a>
          </div>
        </Link>
      </div>
      <div className="bg-indigo-800 text-zinc-100 text-center text-sm flex p-4">
        <p>(ɔ) Pablo Romero Jarén 2022</p>
      </div>
    </>
  );
};

export default LayoutPost;
