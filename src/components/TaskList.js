import React, {useState} from 'react';
import NewTaskForm from './NewTaskForm';

function TaskList() {
    const [tasks, setTasks] = useState([])
    
    return (
        <div>
            <h1>What are we doing today?</h1>
            <NewTaskForm/>
        </div>
    )
}

export default TaskList;
