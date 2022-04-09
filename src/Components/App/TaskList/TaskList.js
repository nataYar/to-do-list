import React from 'react';
import './TaskList.css';
import Task from '../Task/Task';
import Masonry from 'react-masonry-css'


function TaskList({ user, tasks, taskListRef, setList, category, setCategory}) {
    const sortDesc = (a, b) => {
        return b.content.createdAt - a.content.createdAt
    }

    const breakpoints = {
        default: 4,
        1024: 3, 
        767: 2,
        600: 1
    }
   
    return (
        <div className='list'>
            <Masonry 
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
                {tasks
                .sort(sortDesc)
                .map((task) => {
                    return (
                    <div className={`${task.content.category}`} key={task.id}>
                        <Task user={user} list={tasks} task={task} setList={setList} 
                        taskListRef={taskListRef} 
                        category={category} setCategory={setCategory} />
                    </div>
                    )})
                    }   
            </Masonry>
        </div>
    )
}



export default TaskList;
