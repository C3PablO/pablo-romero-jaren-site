import React, { useEffect, useRef, useState } from 'react';

import { roughGradient4 } from '../lib/color';

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholderColor: string[];
  callback: () => void;
}

const BGLoader: React.FC<WrapperProps> = (props: WrapperProps) => {
  const { children, placeholderColor, callback, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const container = useRef(null);
  const images: HTMLImageElement[] = [];
  let totalImages = 0;
  let counter = 0;
  const imageLoaded = () => {
    counter += 1;
    if (totalImages === counter) {
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (container.current) {
      const bg = window.getComputedStyle(container.current).background;
      const urlArr = (bg.match(/(url\(".*?"\))/g) ?? []).map((str) => {
        return str.replace('url("', '').replace('")', '');
      });

      totalImages = urlArr.length ?? 0;

      urlArr?.forEach((src) => {
        const image = new Image();
        images.push(image);
        image.addEventListener('load', imageLoaded);
        image.src = src;
      });
    }
    return () => {
      images.forEach((i) => i.removeEventListener('load', imageLoaded));
    };
  }, []);

  useEffect(() => {
    if (loaded && callback) {
      callback();
    }
  }, [loaded]);

  return (
    <div {...rest} ref={container}>
      {loaded ? undefined : (
        <div
          style={{ background: roughGradient4(placeholderColor) }}
          className={`${
            loaded ? 'bg_loader_loaded' : ''
          } absolute top-0 left-0 right-0 bottom-0 w-full h-full`}
        />
      )}
      {children}
    </div>
  );
};

export default BGLoader;
