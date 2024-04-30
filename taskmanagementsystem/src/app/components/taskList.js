import {useEffect, useState} from 'react';
import TaskItem from './taskItem.js';
import cookies from 'js-cookie';
import SearchComponent from "@/app/components/SearchComponent";


export default function TaskList({ allTasks, setButtonPressed }) {
    
    
    // keeps track of the category filter
    const [category, setCategory] = useState(() => {
        const saved = cookies.get('Category');
        const initialValue = saved || 'All';
        return initialValue;
    });

    // keeps track of the priority filter
    const [isChecked, setIsChecked] = useState(() => {
        const saved = cookies.get('Prio');
        const initialValue = saved === 'true' ? true : false;
        return initialValue;
    });

    // Function to handle the checkbox change
    const handleCheckboxChange = (event) => {
        cookies.set("Prio", !isChecked, { expires: 1 });
        setIsChecked(event.target.checked);
        setButtonPressed(true);
    };

    // Function to handle the category change
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        cookies.set("Category", event.target.value, { expires: 1 });
    };

    return (
        <>
            <hr className=" border-t-2 border-gray-200 my-7" />
            <div className="mt-11 w-3/4 md:w-1/4 mx-auto">
                <label className="block mb-5 text-sm font-medium text-gray-900">Select an filter option</label>
                <select id="category" onChange={handleCategoryChange} value={category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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

                <SearchComponent tasks={allTasks} tasksUpdate={setButtonPressed} setButtonPressed={setButtonPressed} />

            </div>


            <div className="flex justify-center mb-28 px-5">
                {Array.isArray(allTasks) ? (
                    allTasks.length === 0 ? (
                        'No Tasks'
                    ) : (
                        (() => {
                            const filteredAndSortedTasks = allTasks
                                .filter(task => category === 'All' || task.category === category)
                                .sort((a, b) => isChecked ? b.priority - a.priority : a.id - b.id);

                            const gridLayout = filteredAndSortedTasks.length > 1 ? 'grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4' : '';
                            const noTasksMessage = filteredAndSortedTasks.length === 0 ? `No Tasks with selected filter option: ${category}` : null;

                            return (
                                <div className={`flex items-center justify-center ${gridLayout}`}>
                                    {noTasksMessage || filteredAndSortedTasks.map(task => {
                                        if (!task || typeof task !== 'object' || !task.id || !task.title) {
                                            return <div>Error: Invalid task object</div>;
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
                                                updateTasks={setButtonPressed}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })()
                    )
                ) : (
                    <div>Error: loaded data is not of the correct form</div>
                )}
            </div>
        </>
    );

};

