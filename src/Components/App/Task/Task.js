import React , { useState } from 'react';
import './Task.css';


function Task ({ task, taskListRef, category, setCategory }) {
    const [catOptionsBar, setCatOptionsBar] = useState(false);
    // const dropdownContainer = document.querySelector('.dropdown')  
    

    // dropdownContent.style.display = 'none'; 
    function dateStamp (timestamp) {  
         const date = new Date(timestamp);
         const day = date.getDate();
         const month = date.getMonth()+1;
        //  let year = date.getFullYear();
        //  year = year.toString().substr(-2);
         const  time = month + '.' + day;
         return time;
    }

   

    function changeCategory (e) {
        const cat = e.target.value;
        taskListRef.doc(task.id).set({ category: cat}, { merge: true });
    }

    // const toggleClass = () => {
    //     // get the properties of an element
    //     let element = document.getElementById(`${index}`);
    //     //  check if the element have class list
    //     if (element.classList) {
    //         // add active class if true
    //         element.classList.toggle('cross')} 
    // } 
    function fullSizeImgFun(){
        const getImgClass = '.task-img-container-'+`${task.id}`;
        const img = document.querySelector(getImgClass);
        img.classList.toggle('task-img-container_full');
        const app = document.querySelector('.app')
        img.style.top = app.scrollTop + 'px';
    }
    function dropdownVisible(){
        setCatOptionsBar(true)
        // const dropdownContentClass = '.dropdown-from-task-'+`${task.id}`;
        // const dropdownContent =  document.querySelector(dropdownContentClass);
        // console.log('options')
        // dropdownContent.style.display = 'flex';
    }

    function dropdownHidden(){
    const dropdownContentClass = '.dropdown-from-task-'+`${task.id}`;
    const dropdownContent =  document.querySelector(dropdownContentClass);
    dropdownContent.style.display = 'none';
    }
    

    function handleDelete() {
        taskListRef.doc(task.id).delete();
     }

    return ( 
        // <div className={`${task.content.src}` ? 'grid-img' : 'task'}  ></div>
        <div className='task' >
            <div className='task-text'>{task.content.text} </div> 
            {task.content.src ? 
            <div className={'task-img-container task-img-container-'+`${task.id}`}>
                <img className='task-img' src={task.content.src} alt='attached image' 
                onClick={fullSizeImgFun}/>
            </div> : null}
             
            <div className='right-side-bar'>
                <p>{dateStamp(task.content.createdAt)}</p>

                <div  className={`circle-from-task ${ task.content.category == "fun" ? "fun" : task.content.category == "work" ? "work" : 
                    task.content.category == "travel" ? "travel" : task.content.category == "personal" ? "personal": task.content.category == "health" ? "health" : "blank"}`} 
                    onClick={() => setCatOptionsBar(!catOptionsBar)}
                    ></div>
                
                    {catOptionsBar ? 
                        <div className={'dropdown-from-task dropdown-from-task-'+`${task.id}`}>
                        <div className='category-btn' >
                            <div className='circle fun'/>
                            <input type="button" value="Fun"/>
                        </div>
                        <div className='category-btn' >
                            <div className='circle work'/>
                            <input type="button" value="Work"/>
                        </div>
                        <div className='category-btn'  >
                            <div className='circle travel'/>
                            <input  type="button" value="Travel"/>
                        </div>
                        <div className='category-btn'  >
                            <div className='circle personal'/> 
                            <input type="button" value="Personal"/>
                        </div>
                        <div className='category-btn' >
                            <div className='circle health'/>
                            <input type="button" value="Health"/>
                        </div>
                        <div className='category-btn' >
                            <div className='circle blank'/>
                            <input type="button" value="None"/>
                        </div>
                    </div>
                    : null
                    }

                <button className='delete-task-btn' onClick={handleDelete}></button>
             </div>
        </div>
    )
}

    export default Task;
