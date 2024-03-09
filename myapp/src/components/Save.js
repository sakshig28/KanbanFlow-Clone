// Save.js

import { collection, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from "../config/firebase"; // Assuming you have a db instance exported from your firebase.js file


const deleteCollection = async (db, collectionPath) => {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };


const Save = ({ lists }) => {
    const saveData = async () => {
      try {
        // Delete all existing documents in the "lists" collection
        await deleteCollection(db, "lists");
  
        // Add the updated lists to the "lists" collection
        await Promise.all(
          lists.map(async (list) => {
            await addDoc(collection(db, "lists"), list);
          })
        );
        
        console.log("Data saved successfully!");
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };
  
    return (
      <button onClick={saveData}>Save</button>
    );
  };

export default Save;
