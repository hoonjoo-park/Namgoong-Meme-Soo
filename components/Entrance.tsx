import { Dispatch, SetStateAction } from 'react';

interface Props {
  setIsEntered: Dispatch<SetStateAction<boolean>>;
}

function Entrance({ setIsEntered }: Props) {
  const handleClick = () => {
    setIsEntered((prev: boolean) => !prev);
    // setIsEntered();
  };
  return <button onClick={handleClick}>Enter</button>;
}

export default Entrance;
