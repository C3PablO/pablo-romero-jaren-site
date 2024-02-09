import React, { useState } from 'react';

import Image, { ImageProps } from 'next/image';

const customLoader = ({ src }: { src: string }) => {
  return src;
};

const ImageComp = (props: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const updatedProps = { ...props, 'aria-placeholder': undefined };

  return (
    // height and width are part of the props, so they get automatically passed here with {...props}
    <span
      style={{ position: 'relative', display: 'block', overflow: 'hidden' }}
      className="bg-white relative block overflow-hidden mt-10 mb-10 rounded-lg"
    >
      {loaded ? (
        ''
      ) : (
        <span
          className="block animate-pulse absolute top-0 left-0 right-0 bottom-0 w-full h-full"
          style={{
            background: props['aria-placeholder'],
          }}
        />
      )}
      <Image
        {...updatedProps}
        className="relative z-10"
        alt=""
        unoptimized={true}
        loader={customLoader}
        onLoadingComplete={() => {
          setLoaded(true);
        }}
      />
    </span>
  );
};

export default ImageComp;
