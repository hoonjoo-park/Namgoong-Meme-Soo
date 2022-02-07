import styled from 'styled-components';

function EditorImage() {
  return (
    <Img
      src='https://www.lifeofpix.com/wp-content/uploads/2022/01/boat-1-1600x2062.png'
      alt='meme'
    />
  );
}

export default EditorImage;

const Img = styled.img`
  width: 32rem;
  height: 100%;
  border-radius: 5px;
  margin-right: 1rem;
`;
