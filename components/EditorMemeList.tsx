import styled from 'styled-components';

function EditorMemeList() {
  return <MemeContainer></MemeContainer>;
}

export default EditorMemeList;

const MemeContainer = styled.ul`
  width: calc(100% - 1em);
  min-width: 30rem;
  height: 10rem;
  padding: 0.5em;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-bottom: 2rem;
`;
