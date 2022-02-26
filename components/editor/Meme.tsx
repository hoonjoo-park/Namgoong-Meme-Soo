import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { API_DATA, LOCAL_MEME } from 'types';
import { DEVICE } from 'constants/';

interface Props {
  meme: API_DATA;
  setCurrentMeme: Dispatch<SetStateAction<API_DATA | null | LOCAL_MEME>>;
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
  @media ${DEVICE.PHONE} {
    min-width: 3rem;
    height: 3rem;
  }
`;
