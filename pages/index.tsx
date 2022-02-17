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
      </Head>
      {isEntered ? <Main /> : <Entrance setIsEntered={setIsEntered} />}
    </div>
  );
};

export default Home;
