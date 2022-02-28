import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
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
  handleInput: (
    e: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
    num: number
  ) => void;
  setText: Dispatch<SetStateAction<TEXT_TYPE>>;
}

export const EditorInput = ({
  currentMeme,
  text,
  index,
  handleInput,
  setText,
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
  return (
    <InputBox>
      <MemeInput
        type='text'
        placeholder={`텍스트${index + 1} (위치 조정 가능)`}
        disabled={currentMeme === null && true}
        value={text[index]['text']}
        onChange={(e) => handleInput(e, index)}
        onKeyUp={(e) => handleInput(e, index)}
        autoComplete='off'
      />
      <OptionBox>
        <PaletteBox
          color={color}
          setColor={setColor}
          handleColor={handleColor}
          index={index}
        />
        <DeleteButton>
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
    margin-bottom: 1rem;
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
`;
