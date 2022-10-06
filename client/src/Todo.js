import { Fragment, useEffect, useState } from 'react';

// Components
import { InputTodo } from './todo-components/InputTodo';
import { ListTodos } from './todo-components/ListTodos';

import { checkLogin } from './Utilities';

export function Todos() {

  // state to determine whether to load the Todos or not depending on login status
  const [loadTodos, setLoadTodos] = useState(false);

  // handles checking if the user is logged in before allowing access
  const handleCheckLogin = async() => {
    try {
      
        const result = await checkLogin('http://localhost:5000/login');

        if (result.status == 'ok') {
          setLoadTodos(true);
          return;

        } else {
          console.log(result);
          window.location = '/login';
        }

      } catch (err) {
        console.error(err.message);
      }
  }

  useEffect( () => {
    handleCheckLogin();
  }, []);

  return (
    loadTodos ? <LoadTodos /> : <NotLoadedTodos />
  );
  
}


function LoadTodos() {
  return (
    <Fragment>

      <div className='container'>
        <InputTodo />
        <ListTodos />
      </div>

    </Fragment>
  );
}

function NotLoadedTodos() {
  return (
    <div className='container'>
      <h1 className='text-center'>You do not have access to this page</h1>
    </div>
  )
}