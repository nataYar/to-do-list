import React, { useState, useEffect } from 'react';
import './App.css';

import NewTaskForm from './NewTaskForm/NewTaskForm';
import TaskList from './TaskList/TaskList';

function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);

  const toFilterTasks = () => {
    switch (status) {
        case 'to do':
          setFilteredTasks(list.filter(t => t.finished === false));
          break;
        case 'done':
          setFilteredTasks(list.filter(t => t.finished ===  true));
          break;
        default:
          setFilteredTasks(list);
          break;
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem("list", JSON.stringify(list));
  }
  
  const getLocalStorage = () => {
    if (localStorage.getItem("list") === null) {
        localStorage.setItem("list", JSON.stringify([]));
    } else {
        const localList = JSON.parse(localStorage.getItem("list"));
        setList(localList);
    }
  }

//  will run once!
  useEffect(() => {
    getLocalStorage()}, []
  );

  //will run every time the list changes
  useEffect(() => {
    toFilterTasks();
    saveToLocalStorage();
    }, [list, status]
  );


  return (
    <div className='todo-app'>
      <header>What are we doing today?</header>
      <NewTaskForm 
        input={input} 
        setInput={setInput} 
        list={list} setList={setList} 
        setStatus={setStatus} />

      <TaskList 
        filteredTasks={filteredTasks} 
        list={list} 
        setList={setList}/>
    </div>
  );
}

export default App;