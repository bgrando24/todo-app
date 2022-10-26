import './App.css';
import { Fragment, useEffect } from 'react';

// Components
import { InputTodo } from './todo-components/InputTodo';
import { ListTodos } from './todo-components/ListTodos';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Todos } from './app-components/Todo';
import { Login } from './login-components/Login.js';
import { Register } from './login-components/Register';
import { Home } from './app-components/Home';
import { Navbar } from './app-components/Navbar';
import { Logout } from './app-components/Logout';
import { About } from './app-components/About';


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

        <Route exact path={'/logout'} element={
          <div className='container'>
            <Logout />
          </div>
        } />

        <Route exact path='/todos' element={<Todos />} />

        <Route exact path='/about' element={<About />} />

      </Routes>

      </Router>
     

    </Fragment>
  );
}

export default App;
