import React from 'react';

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
        <button onClick={removeItem}>X</button>
      </label>
    </div>
  );
}
