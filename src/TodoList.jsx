/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Todo from './Todo';

const listStyle = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
`;

//so filtering happens first, what filter function returns = is true or false, if false items will not be returned, if true they will be,
//for the final else part the filtering returns all of the items, which are then mapped over to return all of the items returned by the filter. WOWWWWWW

export default function TodoList(props) {
  return (
    <>
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
                toggleEditModal={props.toggleEditModal}
              />
            </div>
          );
        })}
    </>
  );
}
