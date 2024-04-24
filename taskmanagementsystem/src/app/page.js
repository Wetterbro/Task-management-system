"use client"
import React, {useEffect, useState} from "react";
import TaskForm from "@/app/components/taskForm";
import TaskList from "@/app/components/taskList";
import { getTasks } from "./components/taskOperations.js";


export default function Home() {
  const [buttonPressed, setButtonPressed] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const newTasks = await getTasks();
      setTasks(newTasks);
  };
    if (buttonPressed) {
      fetchTasks();
      console.log('tasks', tasks);
    }
    setButtonPressed(false);
}, [buttonPressed]);

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
      <h1 className="flex justify-center my-10">Task Management System</h1>
      </nav>

      <section className="flex justify-center font-bold">
      <TaskForm onFormSubmit={formData => {
          setButtonPressed(true);
      }} />
      </section>

      <div>
      <TaskList
        allTasks={tasks}
      ></TaskList>
      </div>

    </main>
  );
}
