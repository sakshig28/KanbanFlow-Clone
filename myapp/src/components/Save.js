import React from 'react';
import { auth } from '../config/firebase.mjs'

const Save = ({ lists, boardID }) => {
  const getCurrentUserUid = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return currentUser.uid;
    } else {
      return null; // No user signed in
    }
  };

  const saveData = async () => {
    try {
      const userid = getCurrentUserUid();
      const response = await fetch("http://localhost:5510/save", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lists, userid, boardID }) // Include userid and boardID in the request body
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
