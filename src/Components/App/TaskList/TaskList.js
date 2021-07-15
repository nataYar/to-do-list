import React from 'react';
import './TaskList.css';
import Task from '../Task/Task';

function TaskList({ tasks, taskListRef, setList}) {
    const sortDesc = (a, b) => {
        return b.content.createdAt - a.content.createdAt
    }

    return (
        <div className='list-container'>
            {tasks
            .sort(sortDesc)
            .map(task => {
                return (
                    <Task key={task.id} task={task} setList={setList} finished={task.content.finished} taskListRef={taskListRef} />
                )})}     
        </div>
    )
}


export default TaskList;
