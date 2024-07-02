// src/db.js
import { openDB } from "idb";

const dbPromise = openDB("MyDatabase", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("MyObjectStore")) {
      db.createObjectStore("MyObjectStore", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  },
});

export async function addDataLocal(data) {
  const db = await dbPromise;
  return db.add("MyObjectStore", data);
}

export async function getDataLocal() {
  const db = await dbPromise;
  return db.getAll("MyObjectStore");
}

export async function deleteDataByPostId(postId) {
  const db = await dbPromise;
  const tx = db.transaction("MyObjectStore", "readwrite");
  const store = tx.objectStore("MyObjectStore");
  const allItems = await store.getAll();

  for (const item of allItems) {
    if (item.postId === postId) {
      await store.delete(item.id);
    }
  }

  await tx.done;
}
