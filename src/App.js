import React from 'react';
import './App.css';
// import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
// import TodoList from './components/TodoList';

function App() {
  return (
    <div className='todo-app'>
      <TaskList/>
    </div>
  );
}

export default App;