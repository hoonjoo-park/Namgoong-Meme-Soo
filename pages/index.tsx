import Entrance from 'components/Entrance';
import Main from 'components/Main';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Home: NextPage = () => {
  const [isEntered, setIsEntered] = useState(false);
  return (
    <div>
      <Head>
        <title>Meme Generator</title>
        <meta name='og:type' content='website' />
        <meta name='og:title' content='Meme-Generator' />
        <meta
          name='og:image'
          content='https://p4.wallpaperbetter.com/wallpaper/343/333/198/feelsbadman-memes-pepe-meme-wallpaper-preview.jpg'
        />
        <meta name='og:description' content='Make your own Meme!' />
        <meta name='description' content='Make youre own Meme!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {isEntered ? <Main /> : <Entrance setIsEntered={setIsEntered} />}
    </div>
  );
};

export default Home;
