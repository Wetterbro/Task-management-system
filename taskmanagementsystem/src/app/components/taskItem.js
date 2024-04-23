import React from 'react';


export default function TaskItem({task}){
    return(
        <li key={task.id}>
            <label>
                <input type="checkbox"
                checked={task.completed}
                onChange={e => toggleTask (task.id, e.target.checked)}
                />
                {task.title}
            </label>
            <button
            onClick={() => deleteTask(task.id)}
            className="btn btn-danger">Delete</button>
        </li>
    )
}