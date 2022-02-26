import { PaletteBox } from 'components/palette/PaletteBox';
import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { API_DATA, LOCAL_MEME, TEXT_TYPE } from 'types';
import { COLOR, DEVICE } from 'constants/';

interface Props {
  currentMeme: API_DATA | null | LOCAL_MEME;
  text: TEXT_TYPE;
  setText: Dispatch<SetStateAction<TEXT_TYPE>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  saveImage: (num: number) => void;
}

function EditorForm({
  currentMeme,
  text,
  setText,
  color,
  setColor,
  saveImage,
}: Props) {
  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === 'top') return setText({ ...text, top: e.currentTarget.value });
    if (type === 'middle')
      return setText({ ...text, middle: e.currentTarget.value });
    if (type === 'bottom')
      return setText({ ...text, bottom: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return;
  };

  const handleSave = () => {
    saveImage(0);
  };
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <PaletteBox color={color} setColor={setColor} />
      <MemeInput
        id='topInput'
        type='text'
        placeholder='텍스트1 (텍스트 위치 조정 가능)'
        disabled={currentMeme === null && true}
        value={text.top}
        onChange={(e) => handleInput(e, 'top')}
        onKeyUp={(e) => handleInput(e, 'top')}
        autoComplete='off'
      />
      <MemeInput
        id='middleInput'
        type='text'
        placeholder='텍스트2 (텍스트 위치 조정 가능)'
        disabled={currentMeme === null && true}
        value={text.middle}
        onChange={(e) => handleInput(e, 'middle')}
        onKeyUp={(e) => handleInput(e, 'middle')}
        autoComplete='off'
      />
      <MemeInput
        id='bottomInput'
        type='text'
        placeholder='텍스트3 (텍스트 위치 조정 가능)'
        disabled={currentMeme === null && true}
        value={text.bottom}
        onChange={(e) => handleInput(e, 'bottom')}
        onKeyUp={(e) => handleInput(e, 'bottom')}
        autoComplete='off'
      />
      <CreateButton type='submit' value='이미지 저장' onClick={handleSave} />
    </Form>
  );
}

export default EditorForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100%-2em);
  height: 100%;
  padding: 2em;
  border: 1px solid #eaeaea;
  border-radius: 5px;
`;

const MemeInput = styled.input`
  margin-bottom: 2rem;
  padding: 0 1em;
  width: calc(100% - 2em);
  height: 3.5rem;
  font-size: 1.1rem;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  @media ${DEVICE.PHONE} {
    height: 2.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
`;

const CreateButton = styled.input`
  border: none;
  width: 9rem;
  height: 3rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 700;
  background-color: ${COLOR.blue};
  color: ${COLOR.white};
  cursor: pointer;
  @media ${DEVICE.PHONE} {
    width: 100%;
    height: 2.5rem;
    font-size: 1rem;
  }
`;
