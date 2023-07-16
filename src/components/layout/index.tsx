import { useState } from 'react';

import Link from 'next/link';

import { IBlogGalleryProps, BlogGallery } from '../../blog/BlogGallery';
import { LocaleMessages, SupportedLocales } from '../../lib/lang';
import BGLoader from '../bg_loader';
import Button from '../button';
import ButtonLabel from '../button_label';
import ArrowRight from '../icons/arrow_right';
import Instagram from '../icons/instagram';
import Linkedin from '../icons/linkedin';

type ILocaleProps = {
  localeMessages: LocaleMessages;
  locale: SupportedLocales;
};
const LayoutIndex = (props: IBlogGalleryProps & ILocaleProps) => {
  const [topLoaded, setTopLoaded] = useState(false);
  return (
    <>
      <div className="relative z-25">
        <BGLoader
          callback={() => {
            setTopLoaded(true);
          }}
          className={`custom_header ${
            topLoaded ? 'custom_header_loaded' : ''
          } relative`}
          placeholderColor={[
            '254, 251, 235',
            '254, 251, 235',
            '254, 251, 235',
            '254, 251, 235',
          ]}
        >
          <h1 className="font-display ligatures leading-snug text-vw-5xl md:text-[100px] text-center pt-10 text-indigo-800 relative z-50">
            Pablo
            <br /> Romero
            <br /> Jarén
          </h1>
        </BGLoader>
        <div className="bg-amber-50" id="work">
          <div className="max-w-screen-md mx-auto px-3 md:px-0">
            <h2 className="font-display text-4xl md:text-6xl text-center pb-5 text-indigo-800">
              {props.localeMessages[props.locale]['page.index.title.work']}
            </h2>
            <BlogGallery
              posts={props.posts}
              pagination={props.pagination}
              path={props.localeMessages[props.locale]['route.work']}
            />
            <h2 className="font-display text-4xl md:text-6xl text-center py-5 text-indigo-800">
              {props.localeMessages[props.locale]['page.index.title.whoami']}
            </h2>
            <p className="text-center pb-5">
              {props.localeMessages[props.locale]['page.index.text.whoami']}
            </p>
          </div>

          <div className="contact"></div>
          <div className="max-w-screen-md mx-auto px-3 md:px-0">
            <h2 className="font-display text-4xl md:text-6xl text-center py-5 text-indigo-800">
              {props.localeMessages[props.locale]['page.index.title.contact']}
            </h2>
            <p className="text-center pb-5">
              {props.localeMessages[props.locale]['page.index.text.contact']}
            </p>
          </div>
          <h3 className="text-center pb-5">
            {props.localeMessages[props.locale]['page.index.h3.contact']}
          </h3>

          <div className="w-80 flex flex-col gap-5 w-72 max-w-full m-auto">
            <Link href="https://www.linkedin.com/in/pabloromerojaren/" passHref>
              <Button
                markup="a"
                widthType="w-auto"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin />
                <ButtonLabel>Linkedin</ButtonLabel>
                <ArrowRight />
              </Button>
            </Link>
            <Link href="https://www.instagram.com/rawromero/" passHref>
              <Button
                markup="a"
                widthType="w-auto"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram />
                <ButtonLabel>Instagram</ButtonLabel>
                <ArrowRight />
              </Button>
            </Link>
          </div>
          <div className="basedIn"></div>
          <div className="bg-indigo-800 text-zinc-100 text-center text-sm flex p-4">
            <p>(ɔ) Pablo Romero Jarén 2022</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutIndex;
