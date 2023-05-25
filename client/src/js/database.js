import { openDB } from 'idb';

// Create a database called "jate" (Just Another Text Editor) using version 1 of the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // If statement for if the database already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create object storage for the database
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Export a function we will use to UPDATE the database
export const putDb = async (content) => {
  // Database/Version
  const jateDB = await openDB("jate", 1);
  // Transaction
  const tx = jateDB.transaction("jate", "readwrite");
  // Object store
  const store = tx.objectStore("jate");
  const request = store.put({id: 1, value: content});
  const result = await request;
  // If data was successfully saved to database
  console.log("Data saved to database", result);
  // If data was not successfully saved to database
  console.error('putDb not implemented');
};

// Export a function we will use to GET to the database
export const getDb = async () => {
  console.log("GET from the database");

  // Create a connection to the database with the version we want to use
  const jateDB = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privliges
  const tx = jateDB.transaction("jate", "readwrite");

  // Open up the desired object store
  const store = tx.objectStore("jate");

  // Use the .delete() method to get all data in the database
  const request = store.delete(id);

  // Get confirmation of the request
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

// Start database
initdb();