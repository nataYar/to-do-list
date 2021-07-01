import React from 'react';
import Task from '../Task/Task';
import './TaskList.css';

function TaskList({ list, setList, filteredTasks }) {
    
    return (
        <div className='list-container'>
            {filteredTasks.map(task => { 
                return (
                    <Task 
                    list={list}
                    setList={setList}
                    task={task}
                    text={task.text} 
                    key={task.id} 
                 />
                )
                
            })
            }
        </div>
    )
}

export default TaskList;
