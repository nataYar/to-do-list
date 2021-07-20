import React from 'react';
import './Task.css';

function Task ({ index, task, taskListRef, finished }) {

    function dateStamp (timestamp) {  
         const date = new Date(timestamp);
         const day = date.getDate();
         const month = date.getMonth()+1;
         const  time = day + '/' + month;
         return time;
    }
    //  onClick={() => setIsOff(!isOff)}>{ isOff ? 'ON' : 'OFF' }    { merge: true }
    const toggleComplete = () => {
        taskListRef.doc(task.id).set({ finished: !finished}, { merge: true });
        toggleClass();
    }

    const toggleClass = () => {
        // get the properties of an element
        let element = document.getElementById(`${index}`);
        //  check if the element have class list
        if (element.classList) {
            // add active class if true
            element.classList.toggle('cross')} 
    } 

    const handleDelete = () => {
        taskListRef.doc(task.id).delete();
     }

    return ( 
        <div className={ finished ? 'task finished' : 'task'}  >
            <li className='task-text'>{task.content.text} <small>{dateStamp(task.content.createdAt)}</small></li>
            
            <div className='right-side-bar'>
                <div className='btn-toggle-container'>
                    <button className='btn' id={index} onClick={() => toggleComplete()} />
                </div>
                {/* <button id='btn-toggle' className='finished' onClick={toggleClass} /> */}
                <button className='btn-delete' onClick={handleDelete}></button>
            </div>
        </div>
    )
    
}

    export default Task;
