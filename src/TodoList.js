import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Todo from './Todo';

export default function TodoList(props) {
  return props.todos.map((item) => {
    return <Todo todo={item} key={item.id} crossTodo={props.crossTodo} />; //key={Date.now()} didnt really work, after 2 todos starts returning error and duplicating entries
  });
}
