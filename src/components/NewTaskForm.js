import React, { useState } from 'react';

function NewTaskForm() {
    const [input, setInput] = useState('');

    const handleChange = e => {
        setInput(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault();
        
        props.onSubmit({
            id: Math.floor(Math.random() * 1000),
            text: input
        });
        setInput('');
    };

    return (
        <form className='main-form' onSubmit={handleSubmit}>
            <input 
            className='task-input'
            type='text'
            placeholder='add a task' 
            value={input}
            name='text'
            onChange={handleChange}
            />
            <button className='add-task-btn'>Add</button>

        </form>
    )
}

export default NewTaskForm;
