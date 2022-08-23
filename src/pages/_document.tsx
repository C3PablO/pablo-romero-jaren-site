/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { DEFAULT_LOCALE } from '../utils/lang';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    const currentLocale =
      // eslint-disable-next-line no-underscore-dangle
      this.props.__NEXT_DATA__.query.locale || DEFAULT_LOCALE;
    return (
      <Html lang={currentLocale as string}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
