import { PaletteBox } from 'components/palette/PaletteBox';
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { API_DATA, LOCAL_MEME, TEXT_TYPE } from 'types';
import { COLOR, DEVICE } from 'constants/';
import { EditorInput } from './EditorInput';

interface Props {
  currentMeme: API_DATA | null | LOCAL_MEME;
  text: TEXT_TYPE;
  setText: Dispatch<SetStateAction<TEXT_TYPE>>;
  saveImage: (num: number) => void;
  setInputs: Dispatch<SetStateAction<number[]>>;
  inputs: number[];
}

function EditorForm({
  currentMeme,
  text,
  setText,
  saveImage,
  setInputs,
  inputs,
}: Props) {
  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
    num: number
  ) => {
    switch (num) {
      case 0:
        setText({
          ...text,
          '0': { text: e.currentTarget.value, color: text[0]['color'] },
        });
        break;
      case 1:
        setText({
          ...text,
          '1': { text: e.currentTarget.value, color: text[1]['color'] },
        });
        break;
      case 2:
        setText({
          ...text,
          '2': { text: e.currentTarget.value, color: text[2]['color'] },
        });
        break;
      case 3:
        setText({
          ...text,
          '3': { text: e.currentTarget.value, color: text[3]['color'] },
        });
        break;
      case 4:
        setText({
          ...text,
          '4': { text: e.currentTarget.value, color: text[4]['color'] },
        });
        break;
      case 5:
        setText({
          ...text,
          '5': { text: e.currentTarget.value, color: text[5]['color'] },
        });
        break;
      default:
        text;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return;
  };

  const handleSave = () => {
    saveImage(0);
  };

  const handleAdd = () => {
    if (inputs.length === 6) {
      window.alert('최대 6개 까지 추가 가능합니다.');
      return;
    }
    const newInputs = [...inputs, inputs.length];
    setInputs(newInputs);
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <AddButton onClick={handleAdd}>텍스트 추가</AddButton>
        {inputs.map((input, i) => (
          <EditorInput
            key={`input-${i}`}
            index={i}
            currentMeme={currentMeme}
            text={text}
            handleInput={handleInput}
            setText={setText}
          />
        ))}
        <CreateButton type='submit' value='이미지 저장' onClick={handleSave} />
      </Form>
    </>
  );
}

export default EditorForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100%-2em);
  height: 100%;
  overflow-y: scroll;
  padding: 2em;
  border: 1px solid #eaeaea;
  border-radius: 5px;
`;

const AddButton = styled.button`
  margin-left: auto;
  margin-bottom: 1rem;
  width: 6rem;
  height: 2rem;
  flex-shrink: 0;
  background-color: ${COLOR.green};
  color: ${COLOR.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CreateButton = styled.input`
  border: none;
  width: 9rem;
  height: 3rem;
  margin-top: 1rem;
  flex-shrink: 0;
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
