import styled from 'styled-components';

interface Props {
  id: string;
  meme: string;
}

function Meme({ id, meme }: Props) {
  return <MemeBox src={meme} alt='meme' />;
}

export default Meme;

const MemeBox = styled.img`
  min-width: 5rem;
  height: 5rem;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;
