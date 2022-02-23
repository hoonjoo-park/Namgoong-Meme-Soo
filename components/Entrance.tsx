import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { EntranceBG } from 'images';
import { COLOR } from 'constants/';

interface Props {
  setIsEntered: Dispatch<SetStateAction<boolean>>;
}

function Entrance({ setIsEntered }: Props) {
  const handleClick = () => {
    setIsEntered((prev: boolean) => !prev);
  };
  return (
    <EntranceContainer>
      <WelcomeBox>
        <h3>Are You</h3>
        <h1>냄궁밈수?</h1>
      </WelcomeBox>
      <Button onClick={handleClick}>Yeah</Button>
    </EntranceContainer>
  );
}

export default Entrance;

const EntranceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url(${EntranceBG.src});
  background-size: cover;
  background-position: center;
`;

const WelcomeBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 5.5rem;
  font-weight: 900;
  margin-bottom: 5rem;
  color: #ffffff;
  & > * {
    text-align: center;
  }
  h3 {
    margin-bottom: 2rem;
  }
`;

const Button = styled.button`
  width: 8rem;
  height: 4rem;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 700;
  background-color: ${COLOR.blue};
  color: #ffffff;
  cursor: pointer;
`;
