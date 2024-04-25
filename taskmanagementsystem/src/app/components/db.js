import { openDB } from 'idb';

// indexedDB database creation
async function createDatabase() {
  const db = await openDB('TaskDatabase', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
      }
    },
  });

  return db;
}

export default createDatabase;