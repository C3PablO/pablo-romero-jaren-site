import React, { useEffect, useRef, useState } from 'react';

import { roughGradient4 } from '../lib/color';

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholderColor: string[];
}

const BGLoader: React.FC<WrapperProps> = (props: WrapperProps) => {
  const { children, placeholderColor, ...rest } = props;
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
      const result = bg
        .match(/\bhttps?:\/\/\S+/gi)
        ?.map((url) => url.replace('")', ''));

      totalImages = result?.length ?? 0;

      result?.forEach((src) => {
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
  return (
    <div {...rest} ref={container}>
      {loaded ? undefined : (
        <div
          style={{ background: roughGradient4(placeholderColor) }}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
        />
      )}
      {children}
    </div>
  );
};

export default BGLoader;
