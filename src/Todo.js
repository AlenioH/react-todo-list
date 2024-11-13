/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function Todo(props) {
  const itemStyle = () => css`
    text-decoration: ${props.todo.complete === true ? 'line-through' : 'none'};
    color: ${props.todo.complete === true ? '#636e72' : 'inherit'};
    border-bottom: 2px solid #7e7fd1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `;

  function handleTodoClick() {
    props.crossTodo(props.todo.id); // this function calls the fucntion that checks and unchecks the checkbox
  }

  function removeItem() {
    props.removeTodo(props.todo.id); //this function calls the function that removes items
  }

  return (
    <div css={itemStyle}>
      <label>
        <input
          type="checkbox"
          checked={props.todo.complete}
          onChange={handleTodoClick}
        />
        {props.todo.name}
      </label>
        <button
          css={css`
            background-color: #e17055;
            font-weight: bold;
            padding: 5px;
            margin: 10px;
            &:hover {
              background-color: #d63031;
              transition: background-color 0.3ms;
            }
          `}
          onClick={removeItem}
        >
          x
        </button>
    </div>
  );
}
