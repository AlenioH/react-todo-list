import React, { useState, useRef } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import TodoList from './TodoList';
import nextId from 'react-id-generator';

const containerStyle = css`
  width: 100vh;
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

export default function App() {
  const [toDos, setToDos] = useState([]);

  const textInput = useRef(''); //the task user enters is stored in this const, in () is initial value

  function removeCompleted(e) {
    const newTodos = toDos.filter((item) => {
      return item.complete === false; //what it does it removes the name value from the obj and changes true to false again
    });
    setToDos(newTodos); //mb try passing this one down too
  }

  //   // const newTodos = prevToDos.filter(function (toDos) {
  //   //   return prevToDos.complete !== false;
  //   return [
  //       prevToDos.filter((obj) => {
  //         return obj.complete !== false;
  //       }),
  //     ];
  // }); doesnt work either

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
    textInput.current.value = ''; //clearing the value for the next todo, returns error
  }

  return (
    <div css={containerStyle}>
      <TodoList
        todos={toDos}
        crossTodo={crossTodo}
        removeTodo={removeTodo}
        removeCompleted={removeCompleted}
      />
      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="enter your todo here"
          ref={textInput}
        ></input>
        <button type="submit">Add a todo</button>
        <button onClick={removeCompleted}>Delete completed todos</button>
        {/* <button onClick={removeAll}>Delete all</button> */}
      </form>
      <pre>{JSON.stringify(toDos, null, 2)}</pre>
    </div>
  );
}
