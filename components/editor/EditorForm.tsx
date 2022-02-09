import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { SINGLE_API_DATA, TEXT_TYPE } from 'types';

interface Props {
  currentMeme: SINGLE_API_DATA | null;
  text: TEXT_TYPE;
  setText: Dispatch<SetStateAction<TEXT_TYPE>>;
}

function EditorForm({ currentMeme, text, setText }: Props) {
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
  return (
    <Form>
      <MemeInput
        id='topInput'
        type='text'
        placeholder='상단 메시지를 입력해주세요'
        disabled={currentMeme === null && true}
        value={text.top}
        onChange={(e) => handleInput(e, 'top')}
        onKeyUp={(e) => handleInput(e, 'top')}
      />
      <MemeInput
        id='middleInput'
        type='text'
        placeholder='중앙 메시지를 입력해주세요'
        disabled={currentMeme === null && true}
        value={text.middle}
        onChange={(e) => handleInput(e, 'middle')}
        onKeyUp={(e) => handleInput(e, 'middle')}
      />
      <MemeInput
        id='bottomInput'
        type='text'
        placeholder='하단 메시지를 입력해주세요'
        disabled={currentMeme === null && true}
        value={text.bottom}
        onChange={(e) => handleInput(e, 'bottom')}
        onKeyUp={(e) => handleInput(e, 'bottom')}
      />
      <CreateButton type='submit' value='이미지 생성' />
    </Form>
  );
}

export default EditorForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2em;
  border: 1px solid #eaeaea;
  border-radius: 5px;
`;

const MemeInput = styled.input`
  margin-bottom: 2rem;
  padding: 0 1em;
  width: calc(100% - 2em);
  height: 4rem;
  font-size: 1.1rem;
  border-radius: 5px;
  border: 1px solid #eaeaea;
`;

const CreateButton = styled.input`
  border: none;
  width: 12rem;
  height: 3.5rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;
