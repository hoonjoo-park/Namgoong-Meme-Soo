import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';

interface Props {
  setIsEntered: Dispatch<SetStateAction<boolean>>;
}

function Entrance({ setIsEntered }: Props) {
  const handleClick = () => {
    setIsEntered((prev: boolean) => !prev);
  };
  return (
    <EntranceContainer>
      <Button onClick={handleClick}>Enter</Button>
    </EntranceContainer>
  );
}

export default Entrance;

const EntranceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Button = styled.button`
  width: 8rem;
  height: 4rem;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
`;
