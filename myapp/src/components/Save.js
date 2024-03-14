import React from 'react';

const Save = ({ lists }) => { // Change updatedLists to lists
  const saveData = async () => {
    try {
      const response = await fetch("http://localhost:5510/save", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lists }) // Pass the lists prop directly
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
