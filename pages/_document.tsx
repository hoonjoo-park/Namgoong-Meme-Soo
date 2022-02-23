import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta property='og:type' content='website' />
          <meta property='og:title' content='냄궁밈수' />
          <meta
            property='og:image'
            content='https://p4.wallpaperbetter.com/wallpaper/343/333/198/feelsbadman-memes-pepe-meme-wallpaper-preview.jpg'
          />
          <meta
            property='og:description'
            content='냄궁밈수에서 자신만의 밈을 제작해보세요!'
          />
          <meta
            property='description'
            content='냄궁밈수에서 자신만의 밈을 제작해보세요!'
          />
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
