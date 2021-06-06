import React, {useState} from 'react';
import './App.css';
import NewTask from './components/NewTask/NewTask';
import TaskList from './components/TaskList/TaskList';

function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  return (
    <div className='todo-app'>
      <header>What are we doing today?</header>
      <NewTask input={input} setInput={setInput} list={list} setList={setList} />
      <TaskList list={list}/>
    </div>
  );
}

export default App;