import React from 'react';
import Task from '../Task/Task';
import './TaskList.css';

function TaskList({ list, setList }) {
    
    return (
        <div className='list-container'>
            {list.map(task => { 
                return (
                    <Task 
                    list={list}
                    setList={setList}
                    task={task}
                    
                    text={task.text} 
                    key={task.id} 
                    finished={task.finished} />
                )
                
            })
            }
        </div>
    )
}

export default TaskList;
