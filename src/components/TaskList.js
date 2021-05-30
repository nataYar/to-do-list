import React, {useState} from 'react';
import NewTaskForm from './NewTaskForm';

function TaskList() {
    const [taskList, setTaskList] = useState([]);

    const addTask = task => {
        if(!task.text) {
            return;
        }
        const newTasks =[task, ...taskList];
        setTaskList(newTasks);
        console.log(...taskList)
    }

    return (
        <div>
            <h1>What are we doing today?</h1>
            <NewTaskForm onSubmit={addTask}/>
        </div>
    )
}

export default TaskList;
