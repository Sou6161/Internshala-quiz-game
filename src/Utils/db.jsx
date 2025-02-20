import { openDB } from 'idb';

const dbName = 'quizDB';
const storeName = 'attempts';

const initDB = async () => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

export const saveAttempt = async (attempt) => {
  const db = await initDB();
  await db.add(storeName, attempt);
};

export const getAttempts = async () => {
  const db = await initDB();
  return db.getAll(storeName);
};