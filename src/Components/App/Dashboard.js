import React, { useState, useEffect } from 'react';
import './Dashboard.css';

import TaskList from './TaskList/TaskList';
import { Link } from 'react-router-dom';
import { auth, firestore}  from '/Users/nataliayarysheva/projects/toDoList/src/firebase.js';
// import { onSnapshot } from "firebase/firestore";

function Dashboard() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('On');
  const [list, setList] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const user = auth.currentUser;
  const taskListRef = firestore.collection(`users/${user.email}/taskList`); 
 
  useEffect(() => {
    taskListRef.onSnapshot(taskListsnapshot => {
      setList(taskListsnapshot.docs.map(doc => doc.data()))
    })
  }, []);

  useEffect(() => {
    toFilterTasks()
  }, [status, list]);

  function toFilterTasks(){
    switch (status) {
        case 'to do':
          const toDo = list.filter(task => task.finished === false)
          setFilteredTasks(toDo);
          break;
        case 'done':
          const done = list.filter(task => task.finished === true)
          setFilteredTasks(done);
          break;
        case 'all':
          setFilteredTasks(list);
          break;
    }
  }
  function handleStatusChange(e){
    setStatus(e.target.value);
  }
  
  //add a task
  const handleInput = e => {
    setInput(e.target.value);
  }
  function handleSubmit (e) {
    e.preventDefault();
    taskListRef.add({
      content: input,
      finished: false,
      createdAt: Date.now()
    
    });
    setInput('');
  } 

  return (
    <div className='todo-app'>
      <Link to="/">Log out</Link>
      <h1>What's next?</h1>
      <form className='ntask-container'> 
        <input className='ntask-input' type='text' onChange={handleInput} value={input}/>
        <button className='ntask-button' type='submit' onClick={handleSubmit}
        disabled={!input}>Add</button>
        <select name='todos' className='ntask-filter ntask-item'
        onChange={handleStatusChange} >
            <option value='all'>All</option>
            <option value='to do'>To do</option>
            <option value='done'>Done</option>
        </select>
      </form>
      
      <TaskList 
        list={list}
        filteredTasks={filteredTasks}
        />
    </div> 
  );
}

export default Dashboard;