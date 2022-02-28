import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { API_DATA, LOCAL_MEME, TEXT_BOUNDARY, TEXT_TYPE } from 'types';
import EditorForm from './EditorForm';
import EditorImage from './EditorImage';
import EditorMemeList from './EditorMemeList';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { DEFAULT_TEXT, DEVICE, INPUTS } from 'constants/';

interface Props {
  apiData: API_DATA[];
  currentMeme: API_DATA | null | LOCAL_MEME;
  setCurrentMeme: Dispatch<SetStateAction<API_DATA | null | LOCAL_MEME>>;
}

function Editor({ apiData, currentMeme, setCurrentMeme }: Props) {
  const [textBoundary, setTextBoundary] = useState<TEXT_BOUNDARY | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<TEXT_TYPE>(DEFAULT_TEXT);
  const [inputs, setInputs] = useState<number[]>(INPUTS);
  console.log(text);
  useEffect(() => {
    setText(DEFAULT_TEXT);
    if (currentMeme) {
      const image = imageRef.current;
      const rightBoundary = image!.offsetWidth;
      const bottomBoundary = image!.offsetHeight;
      const boundary = {
        right: rightBoundary,
        bottom: bottomBoundary,
      };
      setTextBoundary(boundary);
    }
  }, [currentMeme]);

  const saveImage = async (num: number) => {
    if (!imageRef.current) {
      saveImage(0);
      return;
    }
    if (num === 0) {
      const image = imageRef.current;
      const png = await domtoimage.toBlob(image);
      saveImage(1);
      return;
    }
    const image = imageRef.current;
    const png = await domtoimage.toBlob(image);
    saveAs(png, 'meme.png');
  };

  return (
    <EditorBox>
      <EditorImage
        currentMeme={currentMeme}
        setCurrentMeme={setCurrentMeme}
        text={text}
        ref={imageRef}
        textBoundary={textBoundary}
        inputs={inputs}
      />
      <RightBox>
        <EditorMemeList
          apiData={apiData}
          currentMeme={currentMeme}
          setCurrentMeme={setCurrentMeme}
        />
        <EditorForm
          currentMeme={currentMeme}
          text={text}
          setText={setText}
          saveImage={saveImage}
          inputs={inputs}
          setInputs={setInputs}
        />
      </RightBox>
    </EditorBox>
  );
}

export default Editor;

const EditorBox = styled.div`
  display: flex;
  max-height: 650px;
  height: 70vh;
  max-width: 1200px;
  width: 70vw;
  padding: 1.5em;
  border-radius: 5px;
  box-shadow: 0px 3px 14px -1px rgba(0, 0, 0, 0.75);
  overflow: scroll;
  @media ${DEVICE.TABLET} {
    width: 100vw;
  }
  @media ${DEVICE.PHONE} {
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    padding: 0 0.5em;
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(60% - 1em);
  @media ${DEVICE.PHONE} {
    width: 100%;
  }
`;
