"use client"
import React, {useEffect} from "react";
import {doDBOperations} from "./components/taskOperations.js";
import {getAllTasks} from "./components/taskOperations.js";
import TaskForm from "@/app/components/taskForm";
import TaskItem from "@/app/components/taskItem";
import TaskList from "@/app/components/taskList";



export default function Home() {

  useEffect(() => {
    
  }, []);

  return (
    <main className="">
     <nav>
      <h1>Task Management System</h1>
      </nav>

      <section className="flex justify-center">
        <TaskForm></TaskForm>
      </section>


      <section>
      <h1>sorting</h1> 
      </section>
      <TaskList> </TaskList>

      <section>


      <h2>Task List</h2>
      </section>
    
    </main>
  );
}
