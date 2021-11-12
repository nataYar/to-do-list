import React , { useState } from 'react';
import './Task.css';
import firebase from "firebase/app";

function Task ({ task, taskListRef, category, setCategory }) {
    const [catOptionsBar, setCatOptionsBar] = useState(false);
    
    

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

   

    function changeCategory (arg) {
        //image + text
        task.content.src && task.content.text ? 
            taskListRef.doc(task.id).set({ 
            category: arg,
            text: task.content.text,
            createdAt: task.content.createdAt,
            src: task.content.src
            }): task.content.text ?
        //only text
        taskListRef.doc(task.id).set({ 
            category: arg,
            text: task.content.text,
            createdAt: task.content.createdAt
        }) :
        //only img
        taskListRef.doc(task.id).set({ 
            category: arg,
            src: task.content.src,
            createdAt: task.content.createdAt
            }) 
        setCatOptionsBar(false);
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
        const app = document.querySelector('.app')
        // const getImgContainerId = 'task-img-container-'+`${task.id}`;
        // const container = document.getElementById(getImgContainerId);
        // container.classList.toggle('task-img-container_full');
        // container.style.top = app.scrollTop + 'px';
        // const imgFullId = 'task-img-'+`${task.id}`;
        // const imgFull = document.getElementById(imgFullId);
        // imgFull.classList.toggle('task-img_small');
        // imgFull.classList.toggle('task-img_full');
        // const background = document.getElementById('img-bkg');
        // background.classList.toggle('img-background');
        // background.style.top = app.scrollTop + 'px';

        const getImgContainerId = 'task-img-container-'+`${task.id}`;
        const container = document.getElementById(getImgContainerId);
        container.classList.toggle('task-img-container_full');
        container.style.top = app.scrollTop + 'px';

        const imgFullId = 'task-img-'+`${task.id}`;
        const imgFull = document.getElementById(imgFullId);
        imgFull.classList.toggle('task-img_small');
        imgFull.classList.toggle('task-img_full');

        // const background = document.getElementById('img-bkg');
        // background.classList.toggle('img-background');
        // background.style.top = app.scrollTop + 'px';
    }
    
    function handleDelete() {
        taskListRef.doc(task.id).delete();
     }

    return ( 
        // <div className={`${task.content.src}` ? 'grid-img' : 'task'}  ></div>
        <div className='task' >
            { task.content.text ? 
            <div className='task-text'>{ task.content.text  }</div> : null } 
            
            {task.content.src ? 
            // <div id='img-bkg' >
                <div id={ 'task-img-container-'+`${task.id}`} className='task-img-container' >
                    <img id={ 'task-img-'+`${task.id}`} className='task-img_small' src={task.content.src} alt='attached image' 
                    onClick={fullSizeImgFun}/>
                </div> 
            // </div>
            : null}
             
            <div className='right-side-bar'>
                <p>{dateStamp(task.content.createdAt)}</p>

                <div  className={`circle-from-task ${ task.content.category == "fun" ? "fun" : task.content.category == "work" ? "work" : 
                    task.content.category == "travel" ? "travel" : task.content.category == "personal" ? "personal": task.content.category == "health" ? "health" : "blank"}`} 
                    onClick={() => setCatOptionsBar(!catOptionsBar)}
                    >
                        <span className="tooltiptext-task">Category</span>
                    </div>
                
                    {catOptionsBar ? 
                        <div className={'dropdown-from-task dropdown-from-task-'+`${task.id}`}>
                        <div className='category-btn' onClick={ () => changeCategory('fun') } >
                            <div className='circle fun'/>
                            <input type="button" value="Fun"/>
                        </div>
                        <div className='category-btn' onClick={ () => changeCategory('work') } >
                            <div className='circle work'/>
                            <input type="button" value="Work"/>
                        </div>
                        <div className='category-btn'  onClick={ () => changeCategory('travel') } >
                            <div className='circle travel'/>
                            <input  type="button" value="Travel"/>
                        </div>
                        <div className='category-btn'  onClick={ () => changeCategory('personal') } >
                            <div className='circle personal'/> 
                            <input type="button" value="Personal"/>
                        </div>
                        <div className='category-btn' onClick={ () => changeCategory('health') } >
                            <div className='circle health'/>
                            <input type="button" value="Health"/>
                        </div>
                        <div className='category-btn' onClick={ () => changeCategory('blank') } >
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
