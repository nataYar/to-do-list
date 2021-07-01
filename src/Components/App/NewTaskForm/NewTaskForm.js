import React from 'react';
import './NewTaskForm.css';

function NewTaskForm ({ input, setInput, list, setList, setStatus }) {

    const handleInput = e => {
        setInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.trim().length){
            setList([ 
                ...list,
                { text: input, id: Math.floor(Math.random() * 10000), finished: false }
            ])
        }
        
        setInput("");
    }
    
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    return (
        <form className='ntask-container'> 
            <input className='ntask-input' type='text' onChange={handleInput} value={input}/>
            <button className='ntask-button' type='submit'
            onClick={handleSubmit}>Submit</button>
            
                <select name='todos' className='ntask-filter ntask-item'
                onChange={handleStatusChange} >
                    <option value='all'>All</option>
                    <option value='to do'>To do</option>
                    <option value='done'>Done</option>
                </select>
          
        </form>
    )
}

export default NewTaskForm;
