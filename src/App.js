import React, { useState, useRef, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import TodoList from './TodoList';
// import nextId from 'react-id-generator';
import bgImg from './bg.jpg';
import nextId from 'react-id-generator';

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
  const [toDos, setToDos] = useState(
    JSON.parse(localStorage.getItem('todosInLocalStorage')) || [],
  ); //function as initial value - checks if there is smth in the storage, if not - uses the empty array
  //"todosInLocalStorage" is the key

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todosInLocalStorage', JSON.stringify(toDos));
  }, [toDos]); //this gets run every time the value is changed, so it stores new value

  function removeCompleted() {
    const newTodos = toDos.filter((item) => {
      return item.complete === false;
    });
    setToDos(newTodos); //taking the button out of the form did the trick, it works
  }

  function checkTodo(id) {
    // this function checks and unchecks the todo
    const newTodos = [...toDos]; //creates a copy so we don't change the existing state variable directly
    const todo = newTodos.find((item) => item.id === id); //finding the todo we're trying to modify by id
    todo.complete = !todo.complete; //to switch from incomplete to complete, if i just say "true" i cant change it back
    setToDos(newTodos);
  }

  function removeTodo(id) {
    const newTodos = toDos.filter((item) => item.id !== id);
    setToDos(newTodos);
  } //the function returns the list of todos without the item with the entered id

  function clearAll() {
    setToDos([]);
  }

  const textInput = useRef(''); //the todo user enters is stored in this const, in () is initial value

  //this function adds todos to the list
  function addItem(e) {
    if (textInput.current.value !== '') {
      const newTodoName = textInput.current.value; //in this const I store the user's input

      setToDos((prevToDos) => {
        return [
          ...prevToDos, //spread the already existing todos and add the new one
          { name: newTodoName, id: nextId(), complete: false },
        ];
      });
      setFilter('all'); //sets the filter variable to "all"
      e.preventDefault(); //prevents reloading the page
      textInput.current.value = ''; //clearing the value for the next todo
    } else {
      alert('You need to enter a task!');
    }
  }

  return (
    <div css={divBg}>
      <div css={containerStyle}>
        <h1
          css={css`
            text-align: center;
            margin-top: 5px;
            text-shadow: 2px 2px grey;
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
        </form>
        <TodoList
          todos={toDos}
          crossTodo={checkTodo}
          removeTodo={removeTodo}
          filter={filter}
        />
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
          Clear completed todos
        </button>
        <button css={buttonStyle} onClick={() => setFilter('active')}>
          Show only active todos
        </button>
        <button css={buttonStyle} onClick={() => setFilter('completed')}>
          Show only completed todos
        </button>
        <button css={buttonStyle} onClick={() => setFilter('all')}>
          Show all{' '}
        </button>
        <button css={buttonStyle} onClick={clearAll}>
          Clear all
        </button>
      </div>
    </div>
  );
}

// <pre>{JSON.stringify(toDos, null, 2)}</pre> for debugging

//still says each child has a unique key prop, but they do have unique keys...???
