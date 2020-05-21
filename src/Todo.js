import React from 'react';

export default function Todo(props) {
  function handleTodoClick() {
    props.crossTodo(props.todo.id);
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
      </label>
    </div> //doesnt work but at least its not broken anymore
  );
}
//need to add an onchange handler to the checked part
