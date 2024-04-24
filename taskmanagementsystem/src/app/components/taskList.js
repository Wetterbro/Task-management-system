import { useEffect, useState } from 'react';
import TaskItem from './taskItem.js';
import useTasks from "./useTasks.js";
import cookies from 'js-cookie';


export default function TaskList({ allTasks, setButtonPressed }) {

    const [category, setCategory] = useState(() => {
        const saved = cookies.get('Category');
        const initialValue = saved || 'All';
        console.log('category', initialValue);
        return initialValue;
    });

    const [isChecked, setIsChecked] = useState(() => {
        const saved = cookies.get('Prio');
        const initialValue = saved === 'true' ? true : false;
        return initialValue;
    });

    const handleCheckboxChange = (event) => {
        cookies.set("Prio", !isChecked, { expires: 1 }) ;
        setIsChecked(event.target.checked);
        setButtonPressed(true);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        cookies.set("Category", event.target.value, { expires: 1 });
    };

    return (
        <>
            <hr className=" border-t-2 border-gray-200 my-7" />
            <div className="mt-11 w-1/4 mx-auto">
                <label className="block mb-5 text-sm font-medium text-gray-900">Select an filter option</label>
                <select id="category" onChange={handleCategoryChange} defaultValue={category} value={category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="All">Choose a category</option>
                    <option value="All">All</option>
                    <option value="Work">Work</option>
                    <option value="School">School</option>
                    <option value="Home">Home</option>
                    <option value="Shopping">Shopping</option>
                </select>

                <label className="inline-flex items-center cursor-pointer mt-5">
                    <input type="checkbox" defaultValue={isChecked} checked={isChecked} onChange={handleCheckboxChange} className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show tasks with high priority first</span>
                </label>

            </div>


            <div className="flex items-center justify-center">
                <ul className="list flex-col">
                    {allTasks.length === 0 && 'No Tasks'}
                    {allTasks
                        .filter(task => category === 'All' || task.category === category)
                        .sort((a, b) => isChecked ? b.priority - a.priority : a.id - b.id)
                        .map(task => {
                            if (task.title === undefined || task.id === undefined) {
                                return
                            }
                            return (
                                <TaskItem
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    message={task.message}
                                    completed={task.completed}
                                    priority={task.priority}
                                    category={task.category}
                                    deleteTask={setButtonPressed}
                                />
                            )
                        })}
                </ul>
            </div>
        </>
    );

};

