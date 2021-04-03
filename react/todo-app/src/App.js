import React, { useState, useRef, useCallback } from 'react';
import Todotemplate from './component/TodoTemplate';
import TodoInsert from './component/TodoInsert';
import TodoList from './component/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,  
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    }
  ])

  //고유 값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );

  return (
    <Todotemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos}/>
    </Todotemplate>
  );
}

export default App;