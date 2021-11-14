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
const storageRef = storage.ref();

function Dashboard({ props, user, email }) {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('blank');
  const [list, setList] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [canvaVisibility, setCanvaVisibility] = useState(false);
  const [attachment, setAttachment] = useState(false);

  const dropdown =  document.querySelector('.set-category-dropdown-content');
  const filterDropdown = document.querySelector('.filter-dropdown-content')
  const inputField = document.getElementById('attachment-field');
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
    } else if(filter == 'blank') {
      const tasks = list.filter(task => task.content.category === 'blank')
      setFilteredTasks(tasks); 
    } else {
      setFilteredTasks(list);
    }
  }

  function select(arg){
    setFilter(arg)
  }

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => { dropdown.style.display = 'none' })
  });

  function showDropdown(){
    dropdown.style.display = 'flex';
  }

  function handleInput(e) {
    setInput(e.target.value);
    document.querySelector('.cross').classList.remove('tick')
  }

  function onEnterPressed(e){
    const width = window.innerWidth; 
    if(e.keyCode == 13 && e.shiftKey == false && width < 768){
      handleSubmit(e);
    }
  }
  
  //add task
  function handleSubmit (e) {
    e.preventDefault();
    
    const inputImg = document.querySelector('.attached-pic_in-input');
    try{
      //check if input or an image attatched
    if( input.length!=0 && inputImg){
      taskListRef.add({
        text: input,
        src: inputImg.src,
        createdAt: Date.now(),
        category: category
      }) ;
      // inputImg.remove();
    } else if (input.length !=0 && !inputImg){
      taskListRef.add({
        text: input,
        createdAt: Date.now(),
        category: category
      }) 
    } else if (inputImg){
      taskListRef.add({
        src: inputImg.src,
        createdAt: Date.now(),
        category: category
      }) 
    }
    setInput('');
    document.querySelector('.cross').classList.add('tick');
    document.getElementById('attachment-field').style.display = 'none';
    setCategory('blank');
    if (inputField.hasChildNodes() ){
      inputImg.remove()
    }}
    catch (e) {
      console.log(input.length)
    }
    
  }

  function filterTasks(arg){
    return list.filter(task => task.content.category === arg).length
  }

  function deleteAttachment(){
    document.querySelector('.attached-pic_in-input').remove();
    document.getElementById('attachment-field').style.display = 'none';
    console.log('remove')
  }
              

  return (
    <div className='app'>
      <div className='new-task-container'> 
        <div className='section-input-features'>
            <div className='features-btns'>
              <button className='feature-button canvas-button' onClick={() => setCanvaVisibility(!canvaVisibility)} >
                <span className="tooltiptext">Handwritten note</span>
              </button>
              <button className='feature-button add-list-button'>
                <span className="tooltiptext">Add list</span>
              </button>
              {/* <button className='feature-button attach-button'>
                <span className="tooltiptext">Attach image</span>
              </button> */}
              <button className='feature-button text-style-button' >
                <span className="tooltiptext">Style your text</span>
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
                  <input type="button" value="All"/>
                  </div>
                <div className='category-btn' onClick={() => select('fun')}>
                  <div className='circle fun'/>
                  <input type="button" value="Fun"/>
                  <div className='number-of-tasks'> ({filterTasks('fun')}) </div>
                  </div>
                <div className='category-btn' onClick={() => select('work')}>
                  <div className='circle work'/>
                  <input type="button" value="Work"/>
                  <div className='number-of-tasks'>({filterTasks('work')}) </div>
                  </div>
                <div className='category-btn' onClick={() => select('travel')} >
                  <div className='circle travel'/>
                  <input type="button" value="Travel"/>
                  <div className='number-of-tasks'>({filterTasks('travel')}) </div>
                  </div>
                <div className='category-btn' onClick={() => select('personal')} >
                  <div className='circle personal'/> 
                  <input type="button" value="Personal"/>
                  <div className='number-of-tasks'>({filterTasks('personal')}) </div>
                  </div>
                <div className='category-btn' onClick={() => select('health')}><div className='circle health'/>
                  <input type="button" value="Health"/>
                  <div className='number-of-tasks'>({filterTasks('health')}) </div>
                  </div>
                <div className='category-btn' onClick={() => select('blank')}><div className='circle blank'/>
                  <input type="button" value="None"/>
                  <div className='number-of-tasks'>({filterTasks('blank')}) </div>
                  </div>
                </div>

              <h4>Filter</h4>
            </div>

        </div>
       
          <div className='section-input'>
            <textarea className='new-task-input' type='text'
            onChange={handleInput} value={input} placeholder="Type it here or add a drawing if feeling creative :)" 
            onKeyDown={onEnterPressed}
            ></textarea>

            <div id='attachment-field' onClick={deleteAttachment}>
              <div className='attachment-field-cross-top' /> 
              <div className='attachment-field-cross-right' /> 
              <div className='attachment-field-cross-left' /> 
              <div className='attachment-field-cross-bottom' /> 
            </div>

            <div className='cross-container' onClick={handleSubmit}>
              <div className='cross' />
            </div>
          </div>
  
        { canvaVisibility ?  <DrawingComponent canvaVisibility={canvaVisibility} 
        setCanvaVisibility={setCanvaVisibility} 
        setAttachment={setAttachment} /> : null}
      </div>


      <TaskList user={user} tasks={filteredTasks} setList={setList} taskListRef={taskListRef} 
      category={category} setCategory={setCategory}/>
    </div> 
  );
}




export default Dashboard;