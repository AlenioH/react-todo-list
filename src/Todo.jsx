/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from './Button';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";


export default function Todo({todo, crossTodo, removeTodo, editTodo}) {
  const itemStyle = () => css`
    text-decoration: ${todo.complete === true ? 'line-through' : 'none'};
    color: ${todo.complete === true ? '#636e72' : 'inherit'};
    border-bottom: 2px solid #7e7fd1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `;

  const buttonStyles = css`
    background-color: inherit;
    padding: 5px 8px;
    margin: 10px;
    border-radius: 5px;
  `;

  const editButtonStyles = css`
    border: 2px solid #7e7fd1;
    &:hover {
      box-shadow: 0 8px 15px rgba(106, 13, 173, 0.4), 0 4px 10px rgba(106, 13, 173, 0.2);
      transform: translateY(-2px);
    }
  `;

  const deleteButtonStyles = css`
    border: 2px solid rgba(230, 57, 70, 0.6);
    &:hover {
      box-shadow: 0 8px 12px rgba(230, 57, 70, 0.6), 0 4px 6px rgba(230, 57, 70, 0.3);
      transform: translateY(-2px) scale(1.05);
    }
  `;

  return (
    <div css={itemStyle}>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => crossTodo(todo.id)}
        />
        {todo.name}
      </label>
      <div>
        <Button style={[buttonStyles, editButtonStyles]} label={<MdOutlineEdit size={18}/>} action={() => crossTodo(todo.id)} />
        <Button style={[buttonStyles, deleteButtonStyles]} label={<MdDeleteOutline size={18} />} action={()=> removeTodo(todo.id)} />
      </div>
    </div>
  );
}
