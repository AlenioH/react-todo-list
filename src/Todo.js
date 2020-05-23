import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export default function Todo(props) {
  function handleTodoClick() {
    props.crossTodo(props.todo.id); // this function calls the fucntion that checks and unchecks the checkbox
  }

  function removeItem() {
    props.removeTodo(props.todo.id); //this function calls the function that removes items
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={props.todo.complete}
          onChange={handleTodoClick}
        />
        {props.todo.name}
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
      </label>
    </div>
  );
}

//still says each child has a unique key prop, but they do have unique keys...???
