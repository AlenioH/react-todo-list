/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import TodoList from './TodoList';
import nextId from 'react-id-generator';
import Button from './Button';

const divBg = css`
  background: linear-gradient(45deg, #ff9a8b, #ff6a88, #d4a5a5, #5e4fa2, #7e7fd1);
  width: 100%;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #333;
  padding: 2rem;
`;

const containerStyle = css`
  padding: 2rem;
  width: 80%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: auto;
  display: flex;
  flex-direction: column;
  border: 2px dotted black;
  align-items: center;
  justify-content: center;
  line-height: 2;
`;

const buttonStyle = css`
  padding: 10px;
  border-radius: 4px;
  margin: 10px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(45deg, #ff9a8b, #ff6a88);
  &:hover {
    background: #7e7fd1;
    transition: background-color 0.5s;
  }
`;

const inputContainterStyle=css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 1rem;
  height: 2rem ;

`

const inputStyle = css`
  padding: 10px;
  border-radius: 4px;
  width: 100%;
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
    setToDos(newTodos);
  }

  function checkTodo(id) {
    // this function checks and unchecks the todo
    const newTodos = [...toDos]; //creates a copy so we don't mutate the existing state variable directly
    const todo = newTodos.find((item) => item.id === id); //finding the todo we're trying to modify by id
    todo.complete = !todo.complete; //to switch from incomplete to complete
    setToDos(newTodos);
  }

  function editTodo(id) {
   //TODO:
  }

  function removeTodo(id) {
    const newTodos = toDos.filter((item) => item.id !== id);
    setToDos(newTodos);
  }

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
        <form onSubmit={addItem} css={inputContainterStyle}>
          <input
            css={inputStyle}
            type="text"
            placeholder="enter your todo here"
            ref={textInput}
          ></input>
          <button css={buttonStyle} type="submit">
            Add
          </button>
        </form>
        <TodoList
          todos={toDos}
          crossTodo={checkTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
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
        <Button style={buttonStyle} label="Clear completed TEST" action={removeCompleted} />
        <Button style={buttonStyle} label="Show only active" action={() => setFilter('active')} />
        <Button style={buttonStyle} label="Show only completed" action={() => setFilter('completed')} />
        <Button style={buttonStyle} label="Show all" action={() => setFilter('all')} />
        <Button style={buttonStyle} label="Clear all" action={clearAll} />
      </div>
    </div>
  );
}
