import React, {useState} from 'react';
import Task from '../Task/Task';
import './TaskList.css';

function TaskList( { list }) {
    

    return (
        <div className='list-container'>
            {list.map(item => {
                return (
                    <Task key={item.id} text={item.text} finished={item.finished}/>
                )
                
            })
            }
        </div>
    )
}

export default TaskList;
