// Save.js

//import { collection, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
//import { db } from "../config/firebase"; // Assuming you have a db instance exported from your firebase.js file


const Save = ({ updatedLists }) => {
    const saveData = async () => {
      try {
        const response = await fetch('/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ lists: updatedLists }) // Pass the updated lists to be saved
        });
        const data = await response.json();
        console.log(data.message); // Log the success message
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
  
    return (
      <button onClick={saveData}>Save</button>
    );
  };

export default Save;
