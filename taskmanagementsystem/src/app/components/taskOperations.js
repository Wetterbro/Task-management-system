import createDatabase from './db';

// Function to initialize the database
async function initDB() {
  return await createDatabase();
}


// Function to add a task to the database, takes a task object as input
async function updateTask(task) {
  const db = await initDB();
  await db.put('tasks', task);
}


// Function to add a task to the database, takes a task object as input
async function addTask(task) {
  const db = await initDB();

  if (task === undefined) {
    throw new Error('Task is required');
    alert('Task is required');
  }
  await db.add('tasks', task);
}


// Function to delete a task from the database, takes a task object as input
async function deleteTask(task) {
   const db = await initDB();
  await db.delete('tasks', task.id);
}

// Function to get all tasks from the database
export async function getTasks() {
  const db = await initDB();
  const allTasks = await db.getAll('tasks');
  return allTasks;
}


// Function to add or delete a task from the database
// task if a task object with a task propertys
// operation is a string with the value 'add' or 'delete' or 'get' or 'drop' or 'update'
export function doDBOperations(task, operation) {
  switch (operation) {
    case 'add':
      console.log("task", task);
      return addTask(task);
    case 'delete':
      return deleteTask(task);
    case 'get':
      return getTasks();
    case "update":
      return updateTask(task);
    default:
      throw new Error(`Invalid operation: ${operation}`);
  }
}

