// src/utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'users-database';
const DB_VERSION = 1;
const STORE_NAME = 'shopping-cart';

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addUser = async (item) => {
  const db = await initDB();
  return db.add(STORE_NAME, item);
};

export const getUsers = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteUser = async () => {
    const db = await initDB();
    return db.clear(STORE_NAME);
  };
