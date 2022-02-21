import type { NextPage } from 'next';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Entrance from 'components/Entrance';
import Main from 'components/Main';
import { useState } from 'react';
import { API_DATA } from 'types';
import { fetcher } from 'utils/fetcher';

interface Props {
  memes: API_DATA[];
}

const Home = ({ memes }: Props) => {
  const [isEntered, setIsEntered] = useState(false);
  return (
    <div>
      <Head>
        <title>Meme Generator</title>
      </Head>
      {isEntered ? (
        <Main memes={memes} />
      ) : (
        <Entrance setIsEntered={setIsEntered} />
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { memes },
  } = await fetcher();
  if (!memes) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      memes,
    },
  };
};

export default Home;
