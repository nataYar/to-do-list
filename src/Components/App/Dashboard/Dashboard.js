import React, { useState, useEffect } from 'react';
import { storage, auth, firestore }  from '../../../firebase';
// import firebase from "firebase/app";

import './Dashboard.css';
import TaskList from '../TaskList/TaskList';
import DrawingComponent from '../DrawingComponent/DrawingComponent';

// const firebase = require('firebase');
// const auth = firebase.auth();
// const storage = firebase.storage();
// const firestore = firebase.firestore();
const storageRef = storage.ref()
console.log(storageRef)

function Dashboard({ props, user, email }) {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('blank');
  const [list, setList] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [canvaVisibility, setCanvaVisibility] = useState(false);

  const dropdown =  document.querySelector('.set-category-dropdown-content');
  const filterDropdown = document.querySelector('.filter-dropdown-content')
  
  // const taskListRef = firestore.collection(`users/${auth.currentUser.uid}/taskList`); 
  const taskListRef = firestore.collection(`users/rLoTYFSoTHQ6RRBnw9Hei9mOlc92/taskList`);

  useEffect(() => {
    taskListRef.onSnapshot(taskListsnapshot => {
      setList(taskListsnapshot.docs.map(doc => ({id: doc.id, content: doc.data()})));
    })
  }, []);

  useEffect(() => {
    toFilterTasks()
  }, [filter, list]);


  function toFilterTasks(){
    if (filter == 'work'){
      const tasks = list.filter(task => task.content.category === 'work')
      setFilteredTasks(tasks); 
    } else if(filter == 'fun') {
      const tasks = list.filter(task => task.content.category === 'fun')
      setFilteredTasks(tasks); 
    } else if(filter == 'health') {
      const tasks = list.filter(task => task.content.category === 'health')
      setFilteredTasks(tasks); 
    } else if(filter == 'travel') {
      const tasks = list.filter(task => task.content.category === 'travel')
      setFilteredTasks(tasks); 
    }  else if(filter == 'personal') {
      const tasks = list.filter(task => task.content.category === 'personal')
      setFilteredTasks(tasks); 
    } else {
      setFilteredTasks(list);
    }
  }

  function select(arg){
    setFilter(arg)
  }



  // function addCategory (arg) {
  //   setCategory(arg);
  // }

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => { dropdown.style.display = 'none' })
  });

  function showDropdown(){
    dropdown.style.display = 'flex';
  }

  function hideDropdown(){
    dropdown.style.display = 'none';
  }

  function handleInput(e) {
    setInput(e.target.value);
    document.querySelector('.cross').classList.remove('tick')
  }

  function onEnterPressed(e){
    if(e.keyCode == 13 && e.shiftKey == false){
      handleSubmit(e);
    }
  }
  
  //add task
  function handleSubmit (e) {
    e.preventDefault();
    document.querySelector('.cross').classList.add('tick');
    const inputImg = document.querySelector('.attached-pic_in-input');
    try{
      //check if input or an image attatched
    if( input.length!=0 && inputImg){
      console.log('input, img');
      
      taskListRef.add({
        text: input,
        src: inputImg.src,
        createdAt: Date.now(),
        category: category
      }) ;
      inputImg.remove();
    } else if (input.length !=0 && !inputImg){
      console.log('input , no img');
      // console.log(input.value.length);
      taskListRef.add({
        text: input,
        createdAt: Date.now(),
        category: category
      }) 
    } else if (inputImg){
      console.log('img');
      taskListRef.add({
        src: inputImg.src,
        createdAt: Date.now(),
        category: category
      }) 
    }
    setInput('');
    setCategory('blank')
    }
    catch (e) {
      console.log(input.length)
    }
  }

  return (
    <div className='app'>
      <div className='new-task-container'> 
        <div className='section-input-features'>
            <div className='features-btns'>
              <button className='feature-button canvas-button' onClick={() => setCanvaVisibility(!canvaVisibility)} >
                <span class="tooltiptext">Handwritten note</span>
              </button>
              <button className='feature-button add-list-button'>
                <span class="tooltiptext">Add list</span>
              </button>
              <button className='feature-button attach-button'>
                <span class="tooltiptext">Attach image</span>
              </button>
              <button className='feature-button text-style-button' >
                <span class="tooltiptext">Style your text</span>
              </button>
            </div>
  
            <div className="dropdown category-dropdown" 
            onMouseEnter={() => { dropdown.style.display = 'flex' }}  
            onMouseLeave={() => { dropdown.style.display = 'none' }}  >
              <div id='current-category' className={`circle ${ category == "fun" ? "fun" : category == "work" ? "work" : 
            category == "travel" ? "travel" : category == "personal" ? "personal": category == "health" ? "health" : "blank"}`} />
              <h4 onClick={showDropdown} > Choose category</h4>
              
                <div className='dropdown-content set-category-dropdown-content' id='divToHide'>
                  <div className='category-btn' onClick={() => setCategory('fun')}>
                    <div className='circle fun'/>
                    <input id='category-fun' type="button" value="Fun"/>
                    </div>
                  <div className='category-btn' onClick={() => setCategory('work')}>
                    <div className='circle work'/>
                    <input id='category-work' type="button" value="Work"/>
                    </div>
                  <div className='category-btn' onClick={() => setCategory('travel')} >
                    <div className='circle travel'/>
                    <input  id='category-travel' type="button" value="Travel"/>
                    </div>
                  <div className='category-btn' onClick={() => setCategory('personal')} >
                    <div className='circle personal'/> 
                    <input id='category-personal' type="button" value="Personal"/>
                    </div>
                  <div className='category-btn' onClick={() => setCategory('health')}>
                    <div className='circle health'/>
                    <input  id='category-health' type="button" value="Health"/>
                  </div>
                  <div className='category-btn' onClick={() => setCategory('blank')}>
                    <div className='circle blank'/>
                    <input  id='category-blank' type="button" value="None"/>
                  </div>
                </div>

              </div>
            
            <div className='dropdown filter-dropdown'
            onMouseEnter={() => { filterDropdown.style.display = 'flex' }}  
            onMouseLeave={() => { filterDropdown.style.display = 'none' }}  
            >
              <div id='filter-category' 
              className={`circle ${ filter == "fun" ? "fun" : filter == "work" ? "work" : 
            filter == "travel" ? "travel" : filter == "personal" ? "personal": filter == "health" ? "health" : "blank"}`} 
            />
             
              <div className='dropdown-content filter-dropdown-content' id='filterToHide'>
                <div className='category-btn' onClick={() => select('all')}>
                  <div className='circle blank'/>
                  <input id='category-blank' type="button" value="All"/>
                  </div>
                <div className='category-btn' onClick={() => select('fun')}>
                  <div className='circle fun'/>
                  <input id='category-fun' type="button" value="Fun"/>
                  <div className='number-of-tasks'>({list.filter(task => task.content.category === 'fun').length})</div>
                  </div>
                <div className='category-btn' onClick={() => select('work')}>
                  <div className='circle work'/>
                  <input id='category-work' type="button" value="Work"/>
                  <div className='number-of-tasks'>({list.filter(task => task.content.category === 'work').length})</div>
                  </div>
                <div className='category-btn' onClick={() => select('travel')} >
                  <div className='circle travel'/>
                  <input  id='category-travel' type="button" value="Travel"/>
                  <div className='number-of-tasks'>({list.filter(task => task.content.category === 'travel').length})</div>
                  </div>
                <div className='category-btn' onClick={() => select('personal')} >
                  <div className='circle personal'/> 
                  <input id='category-personal' type="button" value="Personal"/>
                  <div className='number-of-tasks'>({list.filter(task => task.content.category === 'personal').length})</div>
                  </div>
                <div className='category-btn' onClick={() => select('health')}><div className='circle health'/>
                  <input  id='category-health' type="button" value="Health"/>
                  <div className='number-of-tasks'>({list.filter(task => task.content.category === 'health').length})</div>
                  </div>
                <div className='category-btn' onClick={() => select('blank')}><div className='circle blank'/>
                  <input  id='category-blank' type="button" value="None"/>
                  <div className='number-of-tasks'>({list.filter(task => task.content.category === 'blank').length})</div>
                  </div>
                </div>

              <h4>Filter</h4>
            </div>

        </div>
       
          <div className='section-input'>
            <textarea className='new-task-input' type='text' rows="2"
            onChange={handleInput} value={input} placeholder="Type it here or add a drawing if feeling creative :)" 
            onKeyDown={onEnterPressed}></textarea>
            <div id='attachment-field'></div>
            <div className='cross-container' onClick={handleSubmit}>
              <div className='cross' />
            </div>
          </div>
  
        { canvaVisibility ?  <DrawingComponent canvaVisibility={canvaVisibility} setCanvaVisibility={setCanvaVisibility} /> : null}
      </div>


      <TaskList user={user} tasks={filteredTasks} setList={setList} taskListRef={taskListRef} 
      category={category} setCategory={setCategory}/>
    </div> 
  );
}




export default Dashboard;