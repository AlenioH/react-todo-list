/** @jsxImportSource @emotion/react */
import { useRef } from 'react';
import { css } from '@emotion/react';
import Button from './Button';

const overlayStyles = css`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`;

const containerStyles = css`
  width: 80%;
  max-width: 600px;
  height: 50%;
  max-height: 100px;
  background-color: white;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const formStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const inputStyles = css`
  margin-top: auto;
  margin-right: 1rem;
  margin-left: 1rem;
  display: flex;
  border: 2px solid #5e4fa2;
  padding: 0.5rem;
  border-radius: 0.3rem;
  font-size: 1rem;
`;

const buttonsContainer = css`
  margin: auto 0.5rem 0.5rem auto;
  display: flex;
  gap: 1rem;
`;
const buttonStyles = css`
    background-color: inherit;
    padding: 5px 8px;
    border-radius: 5px;
`;

const cancelButtonStyles = css`
    border: 2px solid rgba(230, 57, 70, 0.6);
    &:hover {
      box-shadow: 0 8px 12px rgba(230, 57, 70, 0.6), 0 4px 6px rgba(230, 57, 70, 0.3);
      transform: translateY(-2px) scale(1.05);
    }
`;

const saveButtonStyles = css`
  border: 2px solid #7e7fd1;
  &:hover {
    box-shadow: 0 8px 15px rgba(106, 13, 173, 0.4), 0 4px 10px rgba(106, 13, 173, 0.2);
    transform: translateY(-2px);
  }
`;
export default function EditModal({toggleEditModal, editTodo, todo}) {

  const textInput = useRef(null);

  return (
    <div css={overlayStyles}>
      <div css={containerStyles}>
        <form css={formStyles} onSubmit={() => editTodo(todo.id, textInput.current.value)}>
          <input css={inputStyles} ref={textInput}  type="text" defaultValue={todo.name}/>
          <div css={buttonsContainer}>
            <Button label="Cancel" action={toggleEditModal} style={[buttonStyles, cancelButtonStyles]}/>
            <Button type="submit" label="Save" action={() => editTodo(todo.id, textInput.current.value)} style={[buttonStyles, saveButtonStyles]}/>
          </div>
        </form>
      </div>
    </div>
  );
}
