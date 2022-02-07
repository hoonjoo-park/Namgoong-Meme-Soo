import styled from 'styled-components';
import EditorForm from './EditorForm';
import EditorImage from './EditorImage';
import EditorMemeList from './EditorMemeList';

function Editor() {
  return (
    <EditorBox>
      <EditorImage />
      <RightBox>
        <EditorMemeList />
        <EditorForm />
      </RightBox>
    </EditorBox>
  );
}

export default Editor;

const EditorBox = styled.div`
  display: flex;
  min-width: 80vw;
  height: 47rem;
  padding: 1.5em;
  border-radius: 5px;
  box-shadow: 0px 3px 14px -1px rgba(0, 0, 0, 0.75);
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
