"use client"
import React, {useEffect, useState} from "react";
import TaskForm from "@/app/components/taskForm";
import TaskList from "@/app/components/taskList";
import { getTasks } from "./components/taskOperations.js";
import SearchComponent from "@/app/components/SearchComponent";


export default function Home() {
  const [buttonPressed, setButtonPressed] = useState(false);
  const [tasks, setTasks] = useState([]);

  // update the tasks when the button is pressed
    useEffect(() => {
        console.log("buttonPressed", buttonPressed);
        const fetchTasks = async () => {
            try {
                const newTasks = await getTasks();
                setTasks(newTasks);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };
        fetchTasks().catch(error => console.error("Failed to fetch tasks:", error));
        setButtonPressed(false);
    }, [buttonPressed]);
    
// fetch the tasks when the page loads
useEffect(() => {
  const fetchTasks = async () => {
    const newTasks = await getTasks();
    setTasks(newTasks);
};
fetchTasks();
}, []);



  return (
    <main>
     <nav>
      <h1 className="flex justify-center my-10 text-2xl">Task Management System</h1>
      </nav>

      <section className="flex justify-center font-bold">
      <TaskForm onFormSubmit={formData => {
          setButtonPressed(true);
      }} />
      </section>

       
        
      <div>
        <TaskList allTasks={tasks} setButtonPressed={setButtonPressed} />
      </div>

    </main>
  );
}
