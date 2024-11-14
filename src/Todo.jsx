/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function Todo({todo, crossTodo, removeTodo}) {
  const itemStyle = () => css`
    text-decoration: ${todo.complete === true ? 'line-through' : 'none'};
    color: ${todo.complete === true ? '#636e72' : 'inherit'};
    border-bottom: 2px solid #7e7fd1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `;

  function handleTodoClick() {
    crossTodo(todo.id); // this function calls the fucntion that checks and unchecks the checkbox
  }

  function removeItem() {
    removeTodo(todo.id); //this function calls the function that removes items
  }

  return (
    <div css={itemStyle}>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        {todo.name}
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
