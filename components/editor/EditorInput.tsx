import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { COLOR, DEVICE } from 'constants/';
import { API_DATA, LOCAL_MEME, TEXT_TYPE } from 'types';
import { BiMinus } from 'react-icons/bi';
import { PaletteBox } from 'components/palette/PaletteBox';

interface Props {
  currentMeme: API_DATA | null | LOCAL_MEME;
  text: TEXT_TYPE;
  index: number;
  handleInput: (value: string, num: number) => void;
  setText: Dispatch<SetStateAction<TEXT_TYPE>>;
  setInputs: Dispatch<SetStateAction<number[]>>;
  inputs: number[];
}

export const EditorInput = ({
  currentMeme,
  text,
  index,
  handleInput,
  setText,
  setInputs,
  inputs,
}: Props) => {
  const [color, setColor] = useState<string>('#000000');
  const handleColor = (color: string, number: number) => {
    switch (number) {
      case 0:
        setText({
          ...text,
          '0': { text: text[0]['text'], color },
        });
        break;
      case 1:
        setText({
          ...text,
          '1': { text: text[1]['text'], color },
        });
        break;
      case 2:
        setText({
          ...text,
          '2': { text: text[2]['text'], color },
        });
        break;
      case 3:
        setText({
          ...text,
          '3': { text: text[3]['text'], color },
        });
        break;
      case 4:
        setText({
          ...text,
          '4': { text: text[4]['text'], color },
        });
        break;
      case 5:
        setText({
          ...text,
          '5': { text: text[5]['text'], color },
        });
        break;
      default:
        text;
    }
  };
  const handleDelete = () => {
    const lastIndex = inputs.length - 1;
    // 끝의 인풋을 삭제한 것이 아니라면?
    const newInputs = inputs.filter((input, i) => i !== index);
    setInputs(newInputs);
    if (index < inputs.length - 1) {
      let newText = text;
      for (let i = index; i < inputs.length - 1; i++) {
        newText = {
          ...newText,
          [i]: { text: newText[i + 1]['text'], color: newText[i + 1]['text'] },
        };
      }
      newText = {
        ...newText,
        [lastIndex]: { text: '', color: newText[lastIndex].color },
      };
      setText(newText);
      return;
    }
    handleInput('', lastIndex);
  };
  return (
    <InputBox>
      <MemeInput
        type='text'
        placeholder={`텍스트${index + 1} (위치 조정 가능)`}
        disabled={currentMeme === null && true}
        value={text[index]['text']}
        onChange={(e) => handleInput(e.target.value, index)}
        onKeyUp={(e) => handleInput(e.currentTarget.value, index)}
        autoComplete='off'
      />
      <OptionBox>
        <PaletteBox
          color={color}
          setColor={setColor}
          handleColor={handleColor}
          index={index}
        />
        <DeleteButton onClick={handleDelete}>
          <BiMinus />
        </DeleteButton>
      </OptionBox>
    </InputBox>
  );
};

const InputBox = styled.div`
  position: relative;
  margin-bottom: 1rem;
  width: 100%;
  @media ${DEVICE.PHONE} {
    margin-bottom: 1rem;
  }
`;

const MemeInput = styled.input`
  padding: 0 1em;
  width: 80%;
  height: 3rem;
  flex-shrink: 0;
  font-size: 1.1rem;
  border-radius: 5px 0 0 5px;
  border: 1px solid #eaeaea;
  @media ${DEVICE.PHONE} {
    height: 2.5rem;
    font-size: 1rem;
  }
`;

const OptionBox = styled.ul`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 20%;
  height: 100%;
  top: 0;
  right: 0;
  border-radius: 0 5px 5px 0;
  background-color: #d1d1d1;
`;
const DeleteButton = styled.button`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  margin-right: 10%;
  padding: 0;
  background-color: transparent;
  border: 2px solid ${COLOR.red};
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  svg {
    font-size: 1.2rem;
    color: ${COLOR.red};
  }
  @media ${DEVICE.PHONE} {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
