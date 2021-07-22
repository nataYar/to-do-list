import React, { useState, useEffect } from 'react';
import './Dashboard.css';

import TaskList from './TaskList/TaskList';
import { Link } from 'react-router-dom';
import { auth, firestore }  from '../../firebase';
import { BrowserRouter as Router, Route } from "react-router-dom";


function Dashboard({ props, user, email }) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('all');
  const [list, setList] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
 
  const taskListRef = firestore.collection(`users/${auth.currentUser.uid}/taskList`); 
  // const taskListRef = firestore.collection(`users/8BGdCIwf1WUzJhywcaS60dvb7aG2/taskList`);
  useEffect(() => {
    taskListRef.onSnapshot(taskListsnapshot => {
      setList(taskListsnapshot.docs.map(doc => ({id: doc.id, content: doc.data()})))
    })
  }, []);

  useEffect(() => {
    toFilterTasks()
  }, [status, list]);

  function toFilterTasks(){
    switch (status) {
      case 'to do':
        const toDo = list.filter(task => task.content.finished === false)
        setFilteredTasks(toDo);
        break;
      case 'done':
        const done = list.filter(task => task.content.finished === true)
        setFilteredTasks(done);
        break;
      default:
        setFilteredTasks(list);
    }
  }
  function handleStatusChange(e){
    setStatus(e.target.value);
    console.log(status);
  }
  
  //add a task
  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    taskListRef.add({
      text: input,
      finished: false,
      createdAt: Date.now()
    });
    setInput('');
  } 
  
  return (
    <div className='app'>
      <form className='new-task-container'> 
        {/* <Link to="/" style={{ position: 'absolute', fontFamily: 'Open Sans', textDecoration: 'none',  */}
        {/* color: '#08f7fe', top: '4%' }}>Sign out</Link> */}
        <h1>What are you up to?</h1>

        <section className='section-input'>
          <input className='new-task-input' type='text' onChange={handleInput} value={input}/>
          <button className='new-task-button' type='submit' onClick={handleSubmit}
          disabled={!input}></button>
        </section>
        <section className='section-filter'>
          <h3>Filter</h3>
          <select name='todos' className='new-task-filter'
          onChange={handleStatusChange} > 
              <option value='all'>All</option>
              <option value='to do'>To do</option>
              <option value='done'>Done</option>
          </select>
        </section>
      </form>
      
      <TaskList tasks={filteredTasks} setList={setList} taskListRef={taskListRef} />
    </div> 
  );
}

export default Dashboard;