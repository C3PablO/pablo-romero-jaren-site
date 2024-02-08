import { useState } from 'react';

import { IBlogGalleryProps, BlogGallery } from '../../blog/BlogGallery';
import { LocaleMessages, SupportedLocales } from '../../lib/lang';
import BGLoader from '../bg_loader';
import Button from '../button';
import ButtonLabel from '../button_label';
import ArrowRight from '../icons/arrow_right';
import Instagram from '../icons/instagram';
import Linkedin from '../icons/linkedin';
import ArrowDown from '../icons/arrow_down';

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
          <header className="flex flex-col items-center pt-10 text-indigo-900 relative z-50">
            <h1 className="font-display text-vw-5xl min-[600px]:text-[80px] md:text-[110px] text-center leading-none">
              PABLO
              <br /> ROMERO
              <br /> JARÉN
            </h1>
            <h2 className="flex flex-col md:flex-row gap-3 text-2xl text-center md:text-[40px]">
              <span>UI/Graphic Artist</span>
              <p>
                <a
                  href="#work"
                  className="inline-block m-auto p-2 bg-[#491763] text-white rounded-full animate-bounce"
                >
                  <ArrowDown width={18} height={18} />
                </a>
              </p>
            </h2>
          </header>
        </BGLoader>
        <div className="bg-amber-50" id="work">
          <div className="max-w-screen-md mx-auto px-3 md:px-0">
            <h2
              data-aos="fade-up"
              data-aos-once="false"
              className="font-display text-vw-5xl min-[600px]:text-[80px] md:text-[110px] md:text-6xl text-center pb-5 pt-5 text-indigo-900"
            >
              {props.localeMessages[props.locale]['page.index.title.work']}
            </h2>
            <BlogGallery
              posts={props.posts}
              pagination={props.pagination}
              path={props.localeMessages[props.locale]['route.work']}
            />
          </div>

          <div className="contact flex flex-col items-center justify-center -mt-[15vh]">
            <h2
              data-aos="fade-up"
              data-aos-once="false"
              className="font-display text-vw-5xl min-[600px]:text-[80px] md:text-[110px] md:text-6xl text-center py-5 text-indigo-900"
            >
              {props.localeMessages[props.locale]['page.index.title.whoami']}
            </h2>
          </div>
          <div
            className="max-w-screen-md mx-auto px-3 md:px-0 mt-10"
            data-aos="fade-up"
            data-aos-once="false"
          >
            <p className="text-center pb-5">
              {props.localeMessages[props.locale]['page.index.text.whoami']}
            </p>
            <p className="text-center pb-5">
              {props.localeMessages[props.locale]['page.index.text.contact']}
            </p>
          </div>

          <div className="basedIn flex flex-col items-center justify-start bg-fixed">
            <div className="max-w-screen-md mx-auto px-3 md:px-0">
              <h2
                data-aos="fade-up"
                data-aos-once="false"
                className="font-display text-vw-5xl min-[600px]:text-[80px] md:text-[110px] md:text-6xl text-center py-5 text-indigo-900"
              >
                {props.localeMessages[props.locale]['page.index.title.contact']}
              </h2>
            </div>
            <div
              data-aos="fade-up"
              data-aos-once="false"
              className="w-80 flex flex-col gap-5 w-72 max-w-full"
            >
              <Button
                href="https://www.linkedin.com/in/pabloromerojaren/"
                markup="a"
                widthType="w-auto"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin />
                <ButtonLabel>LinkedIn</ButtonLabel>
                <ArrowRight />
              </Button>

              <Button
                markup="a"
                href="https://www.instagram.com/rawromero/"
                widthType="w-auto"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram />
                <ButtonLabel>Instagram</ButtonLabel>
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div className="bg-indigo-900 text-zinc-100 text-center text-sm flex items-center p-4">
            <a href="#" className="animate-pulse rotate-180">
              <ArrowDown width={18} height={18} />
            </a>
            <p className="w-full">(ɔ) Pablo Romero Jarén 2024</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutIndex;
