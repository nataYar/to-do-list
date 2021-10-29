import React, { useState, useEffect } from 'react';
import {  firestore }  from '../../../firebase';
import './Dashboard.css';
import TaskList from '../TaskList/TaskList';
import DrawingComponent from '../DrawingComponent/DrawingComponent';


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



  function addCategory (arg) {
    setCategory(arg);
  }

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
    console.log(category + 'from input')
    setInput(e.target.value);
    document.querySelector('.cross').classList.remove('tick')
  }

  //add task
  function handleSubmit (e) {
    e.preventDefault();
    if (input.trim() != 0){
      document.querySelector('.cross').classList.add('tick')
      taskListRef.add({
        text: input,
        finished: false,
        createdAt: Date.now(),
        category: category
      });
      setInput('');
      setCategory('blank')
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
              <div id='current-category' className={`circle ${ category == "fun" ? "category-fun" : category == "work" ? "category-work" : 
            category == "travel" ? "category-travel" : category == "personal" ? "category-personal": category == "health" ? "category-health" : ""}`} />
              <h4 onClick={showDropdown} > Choose category</h4>


                <div className='dropdown-content set-category-dropdown-content' id='divToHide'>
                      <div className='category-btn' onClick={() => addCategory('fun')}>
                        <div className='circle category-fun'/>
                        <input id='category-fun' type="button" value="Fun"/>
                        </div>
                      <div className='category-btn' onClick={() => setCategory('work')}>
                        <div className='circle category-work'/>
                        <input id='category-work' type="button" value="Work"/>
                        </div>
                      <div className='category-btn' onClick={() => setCategory('travel')} >
                        <div className='circle category-travel'/>
                        <input  id='category-travel' type="button" value="Travel"/>
                        </div>
                      <div className='category-btn' onClick={() => setCategory('personal')} >
                        <div className='circle category-personal'/> 
                        <input id='category-personal' type="button" value="Personal"/>
                        </div>
                      <div className='category-btn' onClick={() => setCategory('health')}>
                        <div className='circle category-health'/>
                        <input  id='category-health' type="button" value="Health"/>
                        </div>
                </div>

              </div>
            
            <div className="dropdown filter-dropdown" 
            onMouseEnter={() => { filterDropdown.style.display = 'flex' }}  
            onMouseLeave={() => { filterDropdown.style.display = 'none' }}  
            >
              <div id='filter-category' 
              className={`circle ${ filter == "fun" ? "circle-fun" : filter == "work" ? "category-work" : 
            filter == "travel" ? "category-travel" : filter == "personal" ? "category-personal": filter == "health" ? "category-health" : "category-blank"}`} 
            />
             
              <div className='dropdown-content filter-dropdown-content' id='filterToHide'>
                <div className='category-btn' onClick={() => select('all')}>
                  <div className='circle category-blank'/>
                  <input id='category-blank' type="button" value="All"/>
                  </div>
                <div className='category-btn' onClick={() => select('fun')}>
                  <div className='circle category-fun'/>
                  <input id='category-fun' type="button" value="Fun"/>
                  <div className='number-of-tasks'>({list.filter(task => task.content.category === 'fun').length})</div>
                  </div>
                <div className='category-btn' onClick={() => select('work')}>
                  <div className='circle category-work'/>
                  <input id='category-work' type="button" value="Work"/>
                  <div className='number-of-tasks'>({list.filter(task => task.content.category === 'work').length})</div>
                  </div>
                <div className='category-btn' onClick={() => select('travel')} >
                  <div className='circle category-travel'/>
                  <input  id='category-travel' type="button" value="Travel"/>
                  <div className='number-of-tasks'>({list.filter(task => task.content.category === 'travel').length})</div>
                  </div>
                <div className='category-btn' onClick={() => select('personal')} >
                  <div className='circle category-personal'/> 
                  <input id='category-personal' type="button" value="Personal"/>
                  <div className='number-of-tasks'>({list.filter(task => task.content.category === 'personal').length})</div>
                  </div>
                <div className='category-btn' onClick={() => select('health')}><div className='circle category-health'/>
                  <input  id='category-health' type="button" value="Health"/>
                  <div className='number-of-tasks'>({list.filter(task => task.content.category === 'health').length})</div>
                  </div>
                </div>

              <h4>Filter</h4>
            </div>

        </div>
        <form className='section-input'>
          <textarea className='new-task-input' type='text' rows="2"
          onChange={handleInput} value={input} placeholder="Type it here or add a drawing if feeling creative :)" ></textarea>
          <div className='cross-container' onClick={handleSubmit}>
            <div className='cross' />
        </div>
          
        </form>
        { canvaVisibility ?  <DrawingComponent /> : null}
      </div>

      <TaskList user={user} tasks={filteredTasks} setList={setList} taskListRef={taskListRef} 
      category={category} setCategory={setCategory}/>
    </div> 
  );
}




export default Dashboard;