import {deleteTask} from './taskOperations';
import TaskForm from './taskForm';
import { useState } from 'react';
import { doDBOperations } from './taskOperations';

export default function TaskItem({ id, title, priority, category, message, deleteTask, completed }) {

    const [isChecked, setIsChecked] = useState(completed || false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        doDBOperations({ id, title, priority, category, message, completed: event.target.checked }, 'update');
    };

    const handleDelete = (id) => {
        console.log('deleting task with id', id);
        doDBOperations({ id }, 'delete');
        deleteTask(true); 
    }


    return (

        <div className=" flex justify-center border max-w-[1/4] rounded-lg bg-white text-center text-surface shadow-secondary-1 mt-5">
            <div className="p-6">
                <h5 className="mb-1 text-xl font-medium leading-tight overflow-ellipsis  break-words ">
                    {title}
                </h5>
                <h6
                    className="mb-2 text-base font-medium leading-tight text-surface/75 ">
                    {category}
                </h6>
                <p className="mb-4 text-base leading-normal overflow-ellipsis break-words ">
                    {message}
                </p>
                <p className="mb-4 text-base leading-normal overflow-ellipsis break-words ">
                   Priority: {priority}
                </p>
                
                <button
                    onClick={() => handleDelete(id)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
                    Delete
                    </button>
                    
                    <input checked={isChecked} onChange={handleCheckboxChange}  id="green-checkbox" type="checkbox" value="" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500" />
                    <label className="ms-2 text-sm font-medium text-gray-900">Done!</label>
                    
            </div>
        </div>
    )
}