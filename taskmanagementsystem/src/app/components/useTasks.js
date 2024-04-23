import { useState, useEffect } from 'react';
import { getAllTasks } from "./taskOperations.js";

export default function useTasks() {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const tasks = await getAllTasks('all');
      setAllTasks(tasks);
    })();
  }, []);

  return allTasks;
}