import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';

import { Content } from '../../content/Content';
import { LocaleMessages, SupportedLocales } from '../../lib/lang';
import { Navbar } from '../../navigation/Navbar';
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
      <div className="fixed top-0 z-50 w-full">
        <Navbar>
          <ul className="flex w-full divide-x">
            <li className="mr-6 transition ease-in-out hover:scale-110 duration-200 cursor-pointer">
              <Link href={`/${props.locale}`}>
                <a className="flex no-underline">
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
                  {props.localeMessages[props.locale]['page.work.button.top']}
                </a>
              </Link>
            </li>
            <li className="w-full truncate">
              <h1 className="text-xs w-full text-indigo-200 text-xl px-5 truncate">
                {' '}
                {props.title}
              </h1>
            </li>
          </ul>
        </Navbar>
      </div>
      <div
        className={`max-w-screen-md mx-auto  px-3 pt-8 md:px-0 ${props.containerClass}`}
      >
        <Content>
          <MDXRemote {...props.content} components={components as any} />
        </Content>
      </div>
      <div className="flex justify-center">
        <Link href={`/${props.locale}`}>
          <a className="text-xl md:text-2xl px-8 py-5 m-8 rounded-md inline-block text-zinc-100 transition ease-in-out hover:scale-110 duration-200 cursor-pointer bg-indigo-800 hover:bg-indigo-500 hover:no-underline no-underline font-normal">
            {props.localeMessages[props.locale]['page.work.button.bottom']}
          </a>
        </Link>
      </div>
      <div className="bg-indigo-800 text-zinc-100 text-center text-sm flex p-4">
        <p>(ɔ) Pablo Romero Jarén 2022</p>
      </div>
    </>
  );
};

export default LayoutPost;
