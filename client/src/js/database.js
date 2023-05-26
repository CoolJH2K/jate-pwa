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
  console.log("PUT to the database");
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({id: 1, value: content});
  const result = await request;
  console.log("Data saved to database", result.value);
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

  const request = store.get(1);

  // Get confirmation of the request
  const result = await request;
  result
    ? console.log("Data retrieved from the database", result.value)
    : console.log("Data not found in the database");
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return result?.value;
};

// Start database
initdb();