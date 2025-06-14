import { useEffect, useState } from 'react';

import { IBlogGalleryProps, BlogGallery } from '../../blog/BlogGallery';
import { LocaleMessages, SupportedLocales } from '../../lib/lang';
import BGLoader from '../bg_loader';
import Button from '../button';
import ButtonLabel from '../button_label';
import ArrowRight from '../icons/arrow_right';
import Instagram from '../icons/instagram';
import Linkedin from '../icons/linkedin';
import ArrowDown from '../icons/arrow_down';

const isDST = (date: Date): boolean => {
  // Simple check for DST based on date ranges (last Sunday of March to last Sunday of October)
  const marLastSun = new Date(date.getFullYear(), 2, 31);
  marLastSun.setDate(marLastSun.getDate() - marLastSun.getDay());

  const octLastSun = new Date(date.getFullYear(), 9, 31);
  octLastSun.setDate(octLastSun.getDate() - octLastSun.getDay());

  return date >= marLastSun && date < octLastSun;
};

const SwedishClock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      const date = new Date();
      const utc = date.getTime() + date.getTimezoneOffset() * 60000;

      // Check if currently daylight saving time is active in Sweden
      const dst = isDST(new Date(utc));
      // CET is UTC+1, CEST is UTC+2
      const swedishTime = new Date(utc + 3600000 * (dst ? 2 : 1));
      setTime(swedishTime);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return <span>{time.toLocaleTimeString('en-US', { hour12: false })}</span>;
};

type ILocaleProps = {
  localeMessages: LocaleMessages;
  locale: SupportedLocales;
};
const LayoutIndex = (props: IBlogGalleryProps & ILocaleProps) => {
  const [topLoaded, setTopLoaded] = useState(false);
  const productProyects = props.posts.filter(
    (post) => post.category === 'product'
  );
  const illustrationProyects = props.posts.filter(
    (post) => post.category === 'illustration'
  );

  const [style, setStyle] = useState({
    opacity: 1,
    filter: 'blur(0px)', // Initial blur value
  });

  const handleScroll = () => {
    // Maximum scroll value at which header is fully transparent
    const maxScroll = 900; // Adjust this value based on your needs
    const currentScroll = window.scrollY;
    const opacity = Math.max(1 - currentScroll / maxScroll, 0);
    const blur = Math.min((currentScroll / maxScroll) * 2, 10); // Calculate blur from 0 to 10

    setStyle({
      opacity,
      filter: `blur(${blur}px)`, // Apply calculated blur value
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));

      const { hash } = window.location;
      if (hash) {
        const hashElement = document.getElementById(hash.replace('#', ''));
        if (hashElement) {
          hashElement.scrollIntoView();
        }
      }
    }, 50);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <div className="relative z-25 bg-amber-100">
        <BGLoader
          callback={() => {
            setTopLoaded(true);
          }}
          className={`top-0 custom_header ${
            topLoaded ? 'custom_header_loaded' : ''
          } relative`}
          placeholderColor={[
            '254, 251, 235',
            '254, 251, 235',
            '254, 251, 235',
            '254, 251, 235',
          ]}
          style={{
            ...style,
            transition: 'opacity 50ms ease, filter 50ms ease',
          }}
        >
          <header className="flex flex-col items-center pt-10 text-indigo-900 relative z-50">
            <h1 className="font-display text-vw-5xl min-[600px]:text-[80px] md:text-[110px] text-center leading-none">
              PABLO
              <br /> ROMERO
              <br /> JARÉN
            </h1>
            <h2 className="flex flex-col md:flex-row gap-3 text-2xl text-center md:text-[40px]">
              <span>A Design Journey</span>
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
        <div className="relative" id="work">
          <div className="relative h-24 bg-gradient-to-b from-transparent to-amber-50"></div>
          <div className="bg-amber-50">
            <div className="max-w-screen-md mx-auto px-3 md:px-0">
              <h2 className="m-0 font-display text-vw-5xl min-[600px]:text-[80px] leading-none md:text-[110px] md:text-6xl text-center pb-5 pt-5 text-indigo-900">
                {props.localeMessages[props.locale]['page.index.title.work']}
              </h2>
              <div className="flex items-center max-w-[700px] mx-auto mb-16">
                <p className="text-center text-2xl md:text-3xl">
                  {props.localeMessages[props.locale]['page.index.text.work']}
                </p>
              </div>

              <h3 className="font-display text-4xl pb-4 text-indigo-900">
                Product design
              </h3>
              <BlogGallery
                posts={productProyects}
                pagination={props.pagination}
                path={props.localeMessages[props.locale]['route.work']}
                columns={2}
              />
              <br />
              <br />
              <h3 className="font-display text-4xl pb-4 text-indigo-900">
                Illustration
              </h3>
              <BlogGallery
                posts={illustrationProyects}
                pagination={props.pagination}
                path={props.localeMessages[props.locale]['route.work']}
                columns={3}
              />
            </div>

            <div className="contact flex flex-col items-center justify-center -mt-[15vh]">
              <h2 className="font-display text-vw-5xl min-[600px]:text-[80px] md:text-[110px] md:text-6xl text-center py-5 text-indigo-900">
                {props.localeMessages[props.locale]['page.index.title.whoami']}
              </h2>
            </div>

            <div className="flex gap-4 md:gap-8 items-center max-w-[700px] mx-auto px-3 md:px-0 mt-14">
              <p className="pb-8 text-center text-2xl md:text-3xl">
                {
                  'Naturally curious, I navigate between disciplines to create meaningful experiences and keep me interested in my work.'
                }
              </p>
            </div>
            <div
              className="flex gap-4 md:gap-8 items-center max-w-[600px] mx-auto px-3 md:px-0 mt-4"
              data-aos="fade-right"
            >
              <h2 className="font-display leading-none text-vw-5xl min-[600px]:text-[80px] md:text-[110px] md:text-6xl text-center py-5 text-indigo-900 m-0">
                🌍
              </h2>
              <p className="pb-5">
                {
                  'The destination is a place where I can use my skills to forge paths that positively impact society.'
                }
              </p>
            </div>
            <div
              className="flex gap-4 md:gap-8 items-center max-w-[600px] mx-auto px-3 md:px-0 mt-4"
              data-aos="fade-right"
            >
              <h2 className="font-display leading-none text-vw-5xl min-[600px]:text-[80px] md:text-[110px] md:text-6xl text-center py-5 text-indigo-900 m-0">
                🧳
              </h2>
              <p className="pb-5">
                {
                  'My suitcase holds UI/UX design and engineering, design systems, illustration, and a strong interest in learning and exploring.'
                }
              </p>
            </div>
            <div
              className="flex gap-4 md:gap-8 items-center max-w-[600px] mx-auto px-3 md:px-0 mt-4"
              data-aos="fade-right"
            >
              <h2 className="font-display leading-none text-vw-5xl min-[600px]:text-[80px] md:text-[110px] md:text-6xl text-center py-5 text-indigo-900 m-0">
                📍
              </h2>
              <p className="pb-5">
                {
                  'I am charting new territories at Electrolux, crafting Design Systems.'
                }
              </p>
            </div>
            <div
              className="flex gap-4 md:gap-8 items-center max-w-[600px] mx-auto px-3 md:px-0 mt-4"
              data-aos="fade-right"
            >
              <h2 className="font-display leading-none text-vw-5xl min-[600px]:text-[80px] md:text-[110px] md:text-6xl text-center py-5 text-indigo-900 m-0">
                🏕️
              </h2>
              <p className="pb-5">
                {'My basecamp is set in Stockholm, Sweeden '}
                <SwedishClock />
                {' CET (UTC+1).'}
              </p>
            </div>

            <div className="basedIn flex flex-col items-center justify-start bg-fixed">
              <div className="max-w-screen-md mx-auto px-3 md:px-0">
                <h2
                  data-aos="fade-up"
                  className="font-display text-vw-5xl min-[600px]:text-[80px] md:text-[110px] md:text-6xl text-center py-5 text-indigo-900"
                >
                  {
                    props.localeMessages[props.locale][
                      'page.index.title.contact'
                    ]
                  }
                </h2>
              </div>
              <div
                data-aos="fade-up"
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
              <p className="w-full">(ɔ) Pablo Romero Jarén 2025</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutIndex;
