import React from 'react';
import './Task.css';
import { getAuth } from "firebase/auth";

function Task({ task, text, key}) {
   

        const handleComplete = () => {

            // setList(list.map((t) => {
            //     if(t.id === task.id) {
            //         return {...t,  finished: !t.finished};
            //     }
            //     return t;
            // }))
        }

        const handleDelete = () => {
            // setList(list.filter(obj => obj.id !== task.id));
        }

        return (
            <div className='task-container' key={key}>
                <li className={`task-text ${task.finished ? 'finishedClass' : ''}`}>{text}</li>
                {/* хочу анимацию как в codecademy, c фигней, летящей сверху*/}
                <button className='task-complete task-btns' onClick={handleComplete}></button>

                {/* text-decoration: line-through; */}
                <button className='task-delete task-btns' onClick={handleDelete}></button>
                
            </div>
        )
    }

export default Task;
