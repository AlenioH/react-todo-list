import React, { useState, useRef, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import TodoList from './TodoList';
import nextId from 'react-id-generator';
import bgImg from './bg.jpg';

const divBg = css`
  background-image: url(${bgImg});
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  font-family: 'Poppins', sans-serif;
  font-family: 'Work Sans', sans-serif;
`;

const containerStyle = css`
  width: 50vh;
  font-family: inherit;
  margin: auto;
  display: flex;
  flex-direction: column;
  border: 2px dotted black;
  padding: 20px;
  align-items: center;
  justify-content: center;
  line-height: 2;
`;

const buttonStyle = css`
  font-family: inherit;
  padding: 10px;
  border-radius: 4px;
  margin: 10px;
  font-weight: bold;
  background-color: #dfe6e9;
  &:hover {
    background-color: #b2bec3;
    transition: background-color 0.3s;
  }
`;

const inputStyle = css`
  font-family: inherit;
  padding: 10px;
  border-radius: 4px;
`;

export default function App() {
  // const [toDos, setToDos] = useState([]);
  const [toDos, setToDos] = useState(
    JSON.parse(localStorage.getItem('todosInLocalStorage')) || [],
  ); //function as initial state - checks if there is smth in the storage, if not - uses the empty array
  //"todosInLocalStorage" is the key
  //it saves the stuff but clicking the button crashes everything

  useEffect(() => {
    localStorage.setItem('todosInLocalStorage', JSON.stringify(toDos));
  }, [toDos]); //this gets run every time the value is changed, so it stores new value

  function showAll(toDos) {
    //   if (toDos.complete === true) {
    //     //not sure about this line thats supposed to go like: if the items displayed have complete set to true, then do this
    //     setToDos((prevToDos) => {
    //       return [...prevToDos, toDos.filter((item) => item.complete === false)];
    //     });
    //   } else {
    //     setToDos((prevToDos) => {
    //       return [...prevToDos, toDos.filter((item) => item.complete === true)];
    //     });
    //   }
    // } //looks impressive but returns only NaNs....

    // setToDos((prevToDos) => {
    //   return [
    //     ...prevToDos, //spread the already existing todos
    //   ];
    // }); //returns NaN

    // const newTodos = removeCompleted() + showCompleted(); //doesnt do the trick either

    const newTodos = JSON.parse(localStorage.getItem('todosInLocalStorage'));
    // console.log(toDos); //doesnt really get back in time somehow....
    setToDos(newTodos);
    console.log(newTodos);
  } //the function is supposed to extract again ALL of the todos and return them

  function removeCompleted() {
    const newTodos = toDos.filter((item) => {
      return item.complete === false;
    });
    // const notCompl =toDos.filter((item) => {
    //   return item.complete === true;
    // }) mb one more state var

    setToDos(newTodos); //taking the button out of the form did the trick, it works
  }

  //this function shows only completed todos but there must be a way to switch to the full list again
  function showCompleted() {
    const newTodos = toDos.filter((item) => {
      return item.complete === true;
    });
    setToDos(newTodos);
  }

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

  const textInput = useRef(''); //the task user enters is stored in this const, in () is initial value

  function addItem(e) {
    if (textInput.current.value !== '') {
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
  }
  return (
    <div css={divBg}>
      <div css={containerStyle}>
        <h1
          css={css`
            text-align: center;
            margin-top: 5px;
          `}
        >
          Getting sh** done with Alenio
        </h1>
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
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          position: fixed;
          bottom: 40%;
          right: 0;
        `}
      >
        <button css={buttonStyle} onClick={removeCompleted}>
          Delete completed todos
        </button>
        <button css={buttonStyle} onClick={removeCompleted}>
          Show only active todos
        </button>
        <button css={buttonStyle} onClick={showCompleted}>
          Show only completed todos
        </button>
        {/* <button css={buttonStyle} onClick={showAll}>
          Show all todos
        </button> */}
      </div>
    </div>
  );
}

// <pre>{JSON.stringify(toDos, null, 2)}</pre> for debugging
