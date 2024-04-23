import TaskItem from './taskItem.js';
import useTasks from "./useTasks.js";


export default function TaskList(){
    
    const allTasks = useTasks();

    console.log("allTasks", allTasks);
  

    return (
        <>
        <h1>Task List comp</h1>
       
        
       <ul className='list'>
    { allTasks.length === 0 && 'No Tasks'}
    { allTasks.map(task => {
        if (task === undefined || task.title === undefined || task.id === undefined || task.completed === undefined) {
            return 
        }

        return (
            <>
            <TaskItem {...task} key={task.id}/>
            </>
        )
    })}

        </ul>
        </>
    );
    
};

