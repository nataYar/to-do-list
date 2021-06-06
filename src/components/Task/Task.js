import React from 'react';
import './Task.css';

function Task({ text, id, finished }) {
    return (
        <div className='task-container' key={id}>
         
                <li className='task-text'>{text}</li>
            
            {/* text can be edited  when clicked */}
            
          
                {/* хочу анимацию как в codecademy, c фигней, летящей сверху*/}
                <button className='task-complete task-btns'></button>

                {/* text-decoration: line-through; */}
                <button className='task-delete task-btns'></button>
            
        </div>
    )
}

export default Task;
