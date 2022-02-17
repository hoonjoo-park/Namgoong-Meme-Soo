import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { API_DATA, SINGLE_API_DATA } from 'types';

interface Props {
  meme: SINGLE_API_DATA;
  setCurrentMeme: Dispatch<SetStateAction<SINGLE_API_DATA | null>>;
}

function Meme({ meme, setCurrentMeme }: Props) {
  const handleClick = () => {
    setCurrentMeme(meme);
  };
  return <MemeBox src={meme.url} alt='meme' onClick={handleClick} />;
}

export default Meme;

const MemeBox = styled.img`
  min-width: 5rem;
  height: 5rem;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.75);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 1rem;
  }
  &:hover {
    transform: scale(1.05);
  }
`;
