import React, { useState, useRef, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import TodoList from './TodoList';
import nextId from 'react-id-generator';

const containerStyle = css`
  width: 50vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  border: 2px dotted black;
  padding: 20px;
  align-items: center;
  justify-content: center;
  line-height: 2;
  margin-top: 40px;
`;

const buttonStyle = css`
  padding: 10px;
  border-radius: 4px;
  margin: 10px;
`;

const inputStyle = css`
  padding: 10px;
  border-radius: 4px;
`;

export default function App() {
  const [toDos, setToDos] = useState([]);

  const textInput = useRef(''); //the task user enters is stored in this const, in () is initial value

  function removeCompleted() {
    const newTodos = toDos.filter((item) => {
      return item.complete === false;
    });
    setToDos(newTodos); //taking the button out of the form did the trick, it works
  }

  //this function shows only completed todos but there must be a way to switch to the full list again
  function showCompleted() {
    const newTodos = toDos.filter((item) => {
      return item.complete === true;
    });
    setToDos(newTodos);
  }

  function showAll() {}

  function crossTodo(id) {
    // this function checks and unchecks the todo
    const newTodos = [...toDos]; //creates a copy so we don't change the existing state variable directly
    const todos = newTodos.find((item) => item.id === id); //finding the todo we're trying to modify by id
    todos.complete = !todos.complete; //to switch from incomplete to complete, if i just say "true" i cant change it back
    setToDos(newTodos);
  }

  function removeTodo(id) {
    const newTodos = toDos.filter((item) => item.id !== id);
    setToDos(newTodos);
  } //the function returns the list of todos without the item with the entered id

  function addItem(e) {
    //this function adds todos to the list
    const newTodoName = textInput.current.value; //in this const I store the user's input

    setToDos((prevToDos) => {
      return [
        ...prevToDos, //spread the already existing todos and add the new one
        { name: newTodoName, id: nextId(), complete: false },
      ];
    });

    e.preventDefault(); //prevents reloading the page
    textInput.current.value = ''; //clearing the value for the next todo
  }

  return (
    <div css={containerStyle}>
      <form onSubmit={addItem}>
        <input
          css={inputStyle}
          type="text"
          placeholder="enter your todo here"
          ref={textInput}
        ></input>
        <button css={buttonStyle} type="submit">
          Add a todo
        </button>

        {/* <button onClick={removeAll}>Delete all</button> */}
      </form>
      <TodoList todos={toDos} crossTodo={crossTodo} removeTodo={removeTodo} />
      <button css={buttonStyle} onClick={removeCompleted}>
        Delete completed todos
      </button>
      <button css={buttonStyle} onClick={removeCompleted}>
        Show only active todos
      </button>
      <button css={buttonStyle} onClick={showCompleted}>
        Show only completed todos
      </button>
      <button css={buttonStyle} onClick={showAll}>
        Show all todos
      </button>
      <pre>{JSON.stringify(toDos, null, 2)}</pre>
    </div> //taking the remove completed button out of the form did the trick
  );
}
