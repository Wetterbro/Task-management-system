import React, { useState } from 'react';
import { doDBOperations } from './taskOperations';


const TaskForm = ({ onFormSubmit }) => {

    const [number, setNumber] = useState(1);
    // clamp the number between 1 and 5
    const handleNumberChange = (event) => {
        let value = event.target.value;
        if (value < 1) {
            value = 1;
        } else if (value > 5) {
            value = 5;
        }
        setNumber(value);
    };

    // Function to handle the form submission and add a new task
    const handleSubmit = (event) => {
        event.preventDefault();
        const titleInput = document.getElementById('title-input');
        const messageInput = document.getElementById('message');
        const categoryInput = document.getElementById('category');
        const priorityInput = document.getElementById('prio-input');

        console.log(titleInput.value.trim());


        if (titleInput.value.trim() === '' || messageInput.value === '' || categoryInput.value === 'Choose a category' | priorityInput.value === '') {
            alert('Please fill in all fields');
            return;
        }

        const newTask = {
            title: titleInput.value,
            message: messageInput.value,
            category: categoryInput.value,
            priority: priorityInput.value,
            completed: false
        };

        doDBOperations(newTask, 'add');

        // Clear the form
        titleInput.value = '';
        messageInput.value = '';

        onFormSubmit(true);
    };

    return (
        <div className="w-3/4 :w-1/4">
            <h1 className='text-2xl'>Add New Task</h1>
            <form className='' onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                    <input type="text" id="title-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>

                <label className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a description..."></textarea>

                <label className="block mb-5 text-sm font-medium text-gray-900 ">Select an option</label>
                <select id="category" defaultValue="Choose a category" className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option value="Choose a category">Choose a category</option>
                    <option value="Work">Work</option>
                    <option value="School">School</option>
                    <option value="Home">Home</option>
                    <option value="Shopping">Shopping</option>
                </select>

                <label className="block mb-2 text-sm font-medium text-gray-900 mt-4">Select a priority number:</label>
                <input type="number"
                    id="prio-input"
                    min="1" max="5"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="1-5"
                    value={number}
                    onChange={handleNumberChange}
                    required />

                <div className="text-right">
                    <button type="submit" className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        onClick={handleSubmit}
                    >Add</button>
                </div>

            </form>
        </div>
    );
};

export default TaskForm;