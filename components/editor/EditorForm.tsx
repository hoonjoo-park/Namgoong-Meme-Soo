import styled from 'styled-components';

function EditorForm() {
  return (
    <Form>
      <MemeInput
        id='topInput'
        type='text'
        placeholder='상단 메시지를 입력해주세요'
      />
      <MemeInput
        id='middleInput'
        type='text'
        placeholder='중앙 메시지를 입력해주세요'
      />
      <MemeInput
        id='bottomInput'
        type='text'
        placeholder='하단 메시지를 입력해주세요'
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
`;
