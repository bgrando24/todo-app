import { Fragment } from 'react';

// Components
import { InputTodo } from './todo-components/InputTodo';
import { ListTodos } from './todo-components/ListTodos';

export function Todos() {
  return (
    <Fragment>

      <div className='container'>
        <InputTodo />
        <ListTodos />
      </div>
     

    </Fragment>
  );
}