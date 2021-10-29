import React from 'react';
import './Task.css';


function Task ({ index, task, taskListRef, finished, category, setCategory }) {

    function dateStamp (timestamp) {  
         const date = new Date(timestamp);
         const day = date.getDate();
         const month = date.getMonth()+1;
         const  time = day + '/' + month;
         return time;
    }
    // const toggleComplete = () => {
    //     taskListRef.doc(task.id).set({ finished: !finished}, { merge: true });
    //     toggleClass();
    // }

    // const toggleClass = () => {
    //     // get the properties of an element
    //     let element = document.getElementById(`${index}`);
    //     //  check if the element have class list
    //     if (element.classList) {
    //         // add active class if true
    //         element.classList.toggle('cross')} 
    // } 

    const handleDelete = () => {
        taskListRef.doc(task.id).delete();
     }

    return ( 
        <div className={ 'task category-'+`${task.content.category}`}>
            
            {/* </div><div className='grid-item' >  */}
            <div className='task-text'>{task.content.text} <p>{dateStamp(task.content.createdAt)}</p></div>
            <div className='right-side-bar'>
                {/* <div className='btn-toggle-container'>
                    <button className={ finished ? 'btn ' : 'btn cross'}  id={index} onClick={() => toggleComplete()} />
                </div> */}
                <div>{task.content.category}</div>
                <button className='btn-delete' onClick={handleDelete}></button>
             </div>
        </div>
    )
}

    export default Task;
