import React, { useState } from 'react';
import { doDBOperations } from './taskOperations';


const TaskForm = () => {
    const [taskName, setTaskName] = useState('')

    const [number, setNumber] = useState(1);

    const handleNumberChange = (event) => {
        let value = event.target.value;
        if (value < 1) {
            value = 1;
        } else if (value > 5) {
            value = 5;
        }
        setNumber(value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitting');
        const titleInput = document.getElementById('title-input');
        const messageInput = document.getElementById('message');
        const categoryInput = document.getElementById('category');
        const priorityInput = document.getElementById('prio-input');
    
        const newTask = {
            title: titleInput.value,
            message: messageInput.value,
            category: categoryInput.value,
            priority: priorityInput.value
        };
    
        doDBOperations(newTask, 'add');
    
        // Clear the form
        titleInput.value = '';
        messageInput.value = '';
    };

    return (
        <div className="">
            <h1>Add New Task</h1>
            <form className='' onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="title-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Text</label>
                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select id="category" defaultValue="Choose a category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="Choose a category">Choose a category</option>
                    <option value="Work">Work</option>
                    <option value="School">School</option>
                    <option value="Home">Home</option>
                    <option value="Shopping">Shopping</option>
                </select>



                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a number:</label>
                <input type="number"
                    id="prio-input"
                    min="1" max="5"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1-5"
                    value={number}
                    onChange={handleNumberChange}
                    required />

                <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={handleSubmit}
                >Green</button>

            </form>
        </div>
    );
};

export default TaskForm;