import React, { useState } from 'react';
import './NewTask.css';

function NewTask ({ input, setInput, list, setList }) {
    
    const handleInput = e => {
        setInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        input.trim().length ? 
        setList([ 
            ...list,
            { text: input, id: Math.floor(Math.random() * 10000), finished: false }
        ]) : setList([...list]); 
        setInput("");
    }

    return (
        <form className='ntask-container'> 
            <input className='ntask-input' type='text' onChange={handleInput} value={input}/>
            <button className='ntask-button' type='submit'
            onClick={handleSubmit}>Submit</button>
            
                <select name='todos' className='ntask-filter ntask-item'>
                    <option value='all'>All</option>
                    <option value='finished'>To do</option>
                    <option value='unfinished'>Done</option>
                </select>
          
        </form>
    )
}

export default NewTask;
