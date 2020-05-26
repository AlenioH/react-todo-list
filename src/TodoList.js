import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Todo from './Todo';
import nextId from 'react-id-generator';

const listStyle = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  width: 200px;
  margin: auto;
`;

//so filtering happens first, what filter function returns = is true or false, if false items will not be returned, if true they will be,
//for the final else part the filtering returns all of the items, which are then mapped over to return all of the items returned by the filter. WOWWWWWW

export default function TodoList(props) {
  return (
    <div>
      {props.todos
        .filter((item) => {
          if (props.filter === 'active') {
            return item.complete !== true;
          } else if (props.filter === 'completed') {
            return item.complete === true;
          } else {
            return true;
          }
        })

        .map((item) => {
          return (
            <div css={listStyle} key={item.id}>
              <Todo
                todo={item}
                crossTodo={props.crossTodo}
                removeTodo={props.removeTodo}
              />
            </div>
          );
        })}
    </div>
  );
}
