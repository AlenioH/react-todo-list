import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Todo from './Todo';

const listStyle = css`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: auto;
  > * {
    padding: 10px;
  }
`;

export default function TodoList(props) {
  return props.todos.map((item) => {
    return (
      <div css={listStyle}>
        <Todo
          todo={item}
          key={item.id}
          crossTodo={props.crossTodo}
          removeTodo={props.removeTodo}
        />
      </div>
    ); //key={Date.now()} didnt really work, after 2 todos starts returning error and duplicating entries
  });
}
