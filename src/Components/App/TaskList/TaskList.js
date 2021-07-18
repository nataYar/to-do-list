import React from 'react';
import './TaskList.css';
import Task from '../Task/Task';

function TaskList({ tasks, taskListRef, setList}) {
    const sortDesc = (a, b) => {
        return b.content.createdAt - a.content.createdAt
    }
  

// document.getElementsByClassName('list').style.


    return (
        <div className='list'>
            {tasks
            .sort(sortDesc)
            .map((task, index) => {
                return (
                    <Task list={tasks} index={index} key={task.id} task={task} setList={setList} finished={task.content.finished} taskListRef={taskListRef} />
                )})}     
        </div>
    )
}



export default TaskList;
