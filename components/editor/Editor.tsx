import styled from 'styled-components';
import { API_DATA } from 'types';
import EditorForm from './EditorForm';
import EditorImage from './EditorImage';
import EditorMemeList from './EditorMemeList';

interface Props {
  apiData: API_DATA;
}

function Editor({ apiData }: Props) {
  return (
    <EditorBox>
      <EditorImage />
      <RightBox>
        <EditorMemeList apiData={apiData} />
        <EditorForm />
      </RightBox>
    </EditorBox>
  );
}

export default Editor;

const EditorBox = styled.div`
  display: flex;
  height: 47rem;
  padding: 1.5em;
  border-radius: 5px;
  box-shadow: 0px 3px 14px -1px rgba(0, 0, 0, 0.75);
  overflow: hidden;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
