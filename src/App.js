import React from 'react';
import './App.css';
import NewTaskForm from './components/NewTaskForm';
// import TodoList from './components/TodoList';

function App() {
  return (
    <div className='todo-app'>
      <NewTaskForm/>
    </div>
  );
}

export default App;