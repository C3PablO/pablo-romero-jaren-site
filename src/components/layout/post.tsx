import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { Content } from '../../content/Content';
import { LocaleMessages, SupportedLocales } from '../../lib/lang';
import Button from '../button';
import ButtonLabel from '../button_label';
import ArrowLeft from '../icons/arrow_left';
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
        <div className="fixed top-5 left-5 navbar">
          <Button markup="a" href={`/${props.locale}#work`}>
            <ArrowLeft />
            <ButtonLabel>
              {props.localeMessages[props.locale]['page.work.button.bottom']}
            </ButtonLabel>
          </Button>
        </div>
      </div>
      <div className="bg-indigo-800 text-zinc-100 text-center text-sm flex p-4">
        <p>(ɔ) Pablo Romero Jarén 2022</p>
      </div>
    </>
  );
};

export default LayoutPost;
