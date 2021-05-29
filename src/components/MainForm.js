import React, { useState } from 'react';

function MainForm() {
    const [task, setTask] = useState('');

    const handleChange = (txt) => {
        setTask(txt.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault();
        // props.onSubmit({
        //     id: Math.floor(Math.random() * 1000),
        //     text: task
        // });
        setTask('');
    };

    return (
        <form className='main-form' onSubmit={handleSubmit}>
            <input 
            className='task-input'
            type='text'
            placeholder='add a task' 
            value={task}
            name='text'
            onChange={handleChange}
            />
            <button className='add-task-btn'>Add</button>

        </form>
    )
}

export default MainForm;
