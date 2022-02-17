import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Meme-Generator' />
          <meta
            property='og:image'
            content='https://p4.wallpaperbetter.com/wallpaper/343/333/198/feelsbadman-memes-pepe-meme-wallpaper-preview.jpg'
          />
          <meta property='og:description' content='Make your own Meme!' />
          <meta property='description' content='Make youre own Meme!' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
