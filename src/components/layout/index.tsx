import { IBlogGalleryProps, BlogGallery } from '../../blog/BlogGallery';
import { LocaleMessages, SupportedLocales } from '../../utils/lang';
import BGLoader from '../bg_loader';
import Logo from '../header_logo';

type ILocaleProps = {
  localeMessages: LocaleMessages;
  locale: SupportedLocales;
};
const LayoutIndex = (props: IBlogGalleryProps & ILocaleProps) => {
  return (
    <>
      <div className="relative z-25">
        <BGLoader
          className="custom_header relative"
          placeholderColor={[
            '254, 251, 235',
            '167, 142, 201',
            '242, 173, 204',
            '229, 108, 137',
          ]}
        >
          <Logo className="mx-auto my-0 w-full pt-8 max-w-[200px] md:max-w-[300px] lg:max-w-[350px] relative" />
        </BGLoader>
        <div className="bg-amber-50 pt-5">
          <div className="max-w-screen-md mx-auto px-3 md:px-0">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-center pb-5 text-indigo-800">
              {props.localeMessages[props.locale]['page.index.title.work']}
            </h2>
            <BlogGallery
              posts={props.posts}
              pagination={props.pagination}
              path={props.localeMessages[props.locale]['route.work']}
            />
            <h2 className="font-display font-bold text-3xl md:text-5xl text-center py-5 text-indigo-800">
              {props.localeMessages[props.locale]['page.index.title.whoami']}
            </h2>
            <p className="text-center pb-5">
              {props.localeMessages[props.locale]['page.index.text.whoami']}
            </p>
          </div>

          <div className="contact"></div>
          <div className="max-w-screen-md mx-auto px-3 md:px-0">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-center py-5 text-indigo-800">
              {props.localeMessages[props.locale]['page.index.title.contact']}
            </h2>
            <p className="text-center pb-5">
              {props.localeMessages[props.locale]['page.index.text.contact']}
            </p>
          </div>
          <h3 className="text-center pb-5">
            {props.localeMessages[props.locale]['page.index.h3.contact']}
          </h3>

          <ul className="flex py-8 w-full max-w-[50vw] md:max-w-[20vw] mx-auto">
            <li className="mr-2  transition ease-in-out hover:scale-110 duration-200 cursor-pointer px-1">
              <a
                href="https://www.linkedin.com/in/pabloromerojaren/"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="fill-indigo-800 hover:fill-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </li>
            <li className="mr-2  transition ease-in-out hover:scale-110 duration-200 cursor-pointer px-1">
              <a
                href="https://www.behance.net/rawromero"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="fill-indigo-800 hover:fill-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.228 15.01h-2.228v-2.01h2.261c1.878 0 2.003 2.01-.033 2.01zm6.758-2.677h3.018c-.117-1.715-2.73-1.977-3.018 0zm-6.804-3.333h-2.182v2h2.389c1.673 0 1.937-2-.207-2zm15.818-4v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-10 3h5v-1h-5v1zm-3.552 3.618c1.907-.974 1.837-4.55-1.813-4.604h-4.635v9.978h4.311c4.522 0 4.445-4.534 2.137-5.374zm9.487.602c-.274-1.763-1.528-2.95-3.583-2.95-2.094 0-3.352 1.34-3.352 3.947 0 2.631 1.367 3.783 3.416 3.783s3.106-1.135 3.4-2h-2.111c-.736.855-2.893.521-2.767-1.353h5.06c.01-.634-.012-1.089-.063-1.427z" />
                </svg>
              </a>
            </li>
            <li className=" transition ease-in-out hover:scale-110 duration-200 cursor-pointer px-1">
              <a
                href="https://www.instagram.com/rawromero/"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="fill-indigo-800 hover:fill-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.233 5.488c-.843-.038-1.097-.046-3.233-.046s-2.389.008-3.232.046c-2.17.099-3.181 1.127-3.279 3.279-.039.844-.048 1.097-.048 3.233s.009 2.389.047 3.233c.099 2.148 1.106 3.18 3.279 3.279.843.038 1.097.047 3.233.047 2.137 0 2.39-.008 3.233-.046 2.17-.099 3.18-1.129 3.279-3.279.038-.844.046-1.097.046-3.233s-.008-2.389-.046-3.232c-.099-2.153-1.111-3.182-3.279-3.281zm-3.233 10.62c-2.269 0-4.108-1.839-4.108-4.108 0-2.269 1.84-4.108 4.108-4.108s4.108 1.839 4.108 4.108c0 2.269-1.839 4.108-4.108 4.108zm4.271-7.418c-.53 0-.96-.43-.96-.96s.43-.96.96-.96.96.43.96.96-.43.96-.96.96zm-1.604 3.31c0 1.473-1.194 2.667-2.667 2.667s-2.667-1.194-2.667-2.667c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667zm4.333-12h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.952 15.298c-.132 2.909-1.751 4.521-4.653 4.654-.854.039-1.126.048-3.299.048s-2.444-.009-3.298-.048c-2.908-.133-4.52-1.748-4.654-4.654-.039-.853-.048-1.125-.048-3.298 0-2.172.009-2.445.048-3.298.134-2.908 1.748-4.521 4.654-4.653.854-.04 1.125-.049 3.298-.049s2.445.009 3.299.048c2.908.133 4.523 1.751 4.653 4.653.039.854.048 1.127.048 3.299 0 2.173-.009 2.445-.048 3.298z" />
                </svg>
              </a>
            </li>
          </ul>

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
