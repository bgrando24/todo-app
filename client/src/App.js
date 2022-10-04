import './App.css';
import { Fragment } from 'react';

// Components
import { InputTodo } from './todo-components/InputTodo';
import { ListTodos } from './todo-components/ListTodos';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Todos } from './Todo';
import { Login } from './login-components/Login.js';
import { Register } from './login-components/Register';
import { Home } from './Home';
import { Navbar } from './Navbar';

function App() {
  return (
    <Fragment>

      <Navbar />

      <Router>

      <Routes>

        <Route exact path='/' element={<Home />} />

        <Route exact path={'/login'} element={
        <div className='container'>
          <Login />
        </div>
        } />

        <Route exact path={'/register'} element={
          <div className='container'>
            <Register />
          </div>
        } />

        <Route exact path='/todos' element={<Todos />} />

      </Routes>

      </Router>
     

    </Fragment>
  );
}

export default App;
