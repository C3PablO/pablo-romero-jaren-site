import React from 'react';

import LayoutPost, { IPostProps } from '../../../components/layout/post';
import { Meta } from '../../../layout/Meta';
import { Main } from '../../../templates/Main';
import { locales } from '../../../utils/lang';
import { getPostStaticPaths, getPostStaticProps } from '../../../utils/Post';

const getStaticProps = getPostStaticProps(locales.en);
const getStaticPaths = getPostStaticPaths();

export { getStaticProps, getStaticPaths };

const DisplayPost = (props: IPostProps) => {
  return (
    <>
      <Main
        style={{ background: props.background }}
        meta={
          <Meta
            title={props.title}
            description={props.description}
            post={{
              image: props.image,
              date: props.date,
              modified_date: props.modified_date,
            }}
          />
        }
      >
        <LayoutPost {...props} />
      </Main>
    </>
  );
};

export default DisplayPost;
