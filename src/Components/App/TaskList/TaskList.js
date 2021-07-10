import React from 'react';
import Task from '../Task/Task';
import './TaskList.css';

function TaskList({ list, filteredTasks }) {
    const sortDesc = (a, b) => {
       return a.createdAt - b.createdAt
    }

    function dateStamp (timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth()+1;
        const  time = day + '/' + month;
        return time;
    }

    return (
        <div className='list-container'>
            {filteredTasks.length !== 0 ? 
                filteredTasks
                .sort(sortDesc)
                .map(task => {
                    return (<li>{task.content} <small>{dateStamp(task.createdAt)}</small></li>)
                }) 
                :
                list
                .sort(sortDesc)
                .map(task => {
                    return (<li>{task.content} {dateStamp(task.createdAt)}</li>)
                }) 

            }     
        </div>
    )
}


export default TaskList;
