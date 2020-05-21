import React, { useState, useRef } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import TodoList from './TodoList';
import nextId from 'react-id-generator';

export default function App() {
  const [toDos, setToDos] = useState([]);

  const textInput = useRef(''); //the task user enters is stored in this const, in () is initial value

  function crossTodo(id) {
    const newTodos = [...toDos]; //creates a copy so we don't change the existing state variable directly
    const todos = newTodos.find((item) => item.id === id); //finding the todo we're trying to modify by id
    todos.complete = !todos.complete; //to switch from incomplete to complete, if i just say "true" i cant change it back
    setToDos(newTodos); //error: Cannot access 'toDos' before initialization// ok fixed that, was the naming issue
  }

  function handleAdd(e) {
    const newTodoName = textInput.current.value; //in this const I store the user's input

    setToDos((prevToDos) => {
      return [
        ...prevToDos, //spread the already existing todos and add the new one
        { name: newTodoName, id: nextId(), complete: false },
      ];
    });

    e.preventDefault(); //prevents reloading the page
    textInput.current.value = ''; //clearing the value for the next todo, returns error
  }

  return (
    <div>
      <TodoList todos={toDos} crossTodo={crossTodo} />
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="enter your todo here"
          ref={textInput}
        ></input>
        <button type="submit">Add a todo</button>
        <button>Delete completed todos</button>
      </form>
    </div>
  );
}
