import React from 'react';
import './Task.css';

function Task ({ task, setList, taskListRef, finished }) {
     function dateStamp (timestamp) {
         const date = new Date(timestamp);
         const day = date.getDate();
         const month = date.getMonth()+1;
         const  time = day + '/' + month;
         return time;
     }
    //  onClick={() => setIsOff(!isOff)}>{ isOff ? 'ON' : 'OFF' }    { merge: true }
     const toggleComplete = () => {
        taskListRef.doc(task.id).set({ finished: !finished}, { merge: true } )
     }

     const handleDelete = () => {
        taskListRef.doc(task.id).delete();
     }

    return (
        <div>
            <li className={finished ? 'green' : 'red'}>{task.content.text} <small>{dateStamp(task.content.createdAt)}</small></li>
            <button className='task-complete task-btns' onClick={toggleComplete}></button>
            <button className='task-delete task-btns' onClick={handleDelete}></button>
        </div>
    )
    }

export default Task;
