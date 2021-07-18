import React from 'react';
import './Task.css';

function Task ({ list, index, task, setList, taskListRef, finished }) {
    function dateStamp (timestamp) {  
         const date = new Date(timestamp);
         const day = date.getDate();
         const month = date.getMonth()+1;
         const  time = day + '/' + month;
         return time;
    }
    //  onClick={() => setIsOff(!isOff)}>{ isOff ? 'ON' : 'OFF' }    { merge: true }
     const toggleComplete = () => {
        taskListRef.doc(task.id).set({ finished: !finished}, { merge: true } )
     }

     const handleDelete = () => {
        taskListRef.doc(task.id).delete();
     }

    function toggleClass(){
    // get the properties of an element
    const element = document.getElementById("btn-toggle");
    //  check if the element have class list
    if (element.classList) {
        // add active class if true
    element.classList.toggle("finished")
    //ADD A LINE TO SET TASK TO STATE: FINISHED!!!!!!!!!!!!!!!!!!!!!!
    } 
    } 

    // const colors = ['#80ff00', '#ff0080', '#80ff00', '#80ff00', '#80ff00']; 
    const colors = ['#80ff00', '#ff0080', '#149fff'];
    let colorArray = [];
    const changeColor = () => {
        
        let ind = colors[index];
        //loop through tasks, stops when all tasks are allocated colours
        for (let task = 0; task < list.length; task++) {
            for(let color=0; color < colors.length; color++){
                colorArray.push(colors[color]);
            }
        }
        console.log(colorArray);
        return colorArray;
    }
    changeColor();




    return (
    // <main className={`${index}`}>    
        <div className={finished ? 'task done' : 'task to-do'}  style={{ backgroundColor: colorArray[index]}}  >
            <li className='task-text'>{task.content.text} <small>{dateStamp(task.content.createdAt)}</small></li>
            
            <div className='right-side-bar'>
                <div className='btn-toggle-container'>
                    <button id='btn-toggle' onClick={() => toggleClass()} />
                </div>
                <button className='btn-delete' onClick={handleDelete}></button>
            </div>
        </div>
        
    // </main>
        
    )

}

    export default Task;
