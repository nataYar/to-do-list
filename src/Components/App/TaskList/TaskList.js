import React, { useState } from 'react';
import './TaskList.css';
import Task from '../Task/Task';

function TaskList({ user, tasks, taskListRef, setList}) {
    const sortDesc = (a, b) => {
        return b.content.createdAt - a.content.createdAt
    }

    return (
        <div className='list'>
            {tasks
            .sort(sortDesc)
            .map((task, index) => {
                return (
                    <Task user={user} index={index} list={tasks} key={task.id} task={task} setList={setList} finished={task.content.finished} taskListRef={taskListRef} />
                )})}     
        </div>
    )
}



export default TaskList;
