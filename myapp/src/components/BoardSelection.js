import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from '../config/firebase.mjs';

const BoardSelection = ({ onSelectBoard }) => {
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [existingBoards, setExistingBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null); // State to store the user ID

  useEffect(() => {
    getCurrentUserUid(); // Fetch the user ID
    fetchExistingBoards()
  }, []);

  useEffect(() => {
    if (userID !== null) {
      fetchExistingBoards(userID); // Fetch existing boards only when user ID is available
    }
  }, [userID]); // Fetch boards when user ID changes

  const getCurrentUserUid = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserID(currentUser.uid); // Set the user ID state
    } else {
      setLoading(false);
    }
  };

  const fetchExistingBoards = async (userID) => {
    if (!userID) {
        console.error('Error fetching existing boards: User ID is undefined');
        return []; // Return an empty array or handle the error appropriately
    }

    console.log('Fetching existing boards...');
    try {
        // Create a reference to the user's boards subcollection
        const userBoardsRef = collection(db, 'boards');

        // Query the documents within the user's boards subcollection
        const querySnapshot = await getDocs(userBoardsRef);
        const boards = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log('Existing boards:', boards);
        return boards;
    } catch (error) {
        console.error('Error fetching existing boards:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};

  
  

  const handleCreateBoard = () => {
    // Generate a unique boardID, such as using uuidv4
    const boardID = generateBoardID(); // Assume this function generates a unique ID
    const newBoard = {
      id: boardID,
      title: newBoardTitle.trim(),
    };
    // Pass the newly created board to the parent component
    onSelectBoard(newBoard);
    // Clear the input field
    setNewBoardTitle('');
  };

  const handleSelectExistingBoard = () => {
    // Pass the selected existing board to the parent component
    onSelectBoard(existingBoards.find((board) => board.id === selectedBoard));
  };

  const generateBoardID = () => {
    // Generate a random string with a combination of letters and numbers
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8; // You can adjust the length of the ID as needed
    let boardID = '';
    for (let i = 0; i < length; i++) {
      boardID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return boardID;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <select value={selectedBoard} onChange={(e) => setSelectedBoard(e.target.value)}>
        <option value="">Select an existing board</option>
        {existingBoards.map((board) => (
          <option key={board.id} value={board.id}>{board.title}</option>
        ))}
      </select>
      <button onClick={handleSelectExistingBoard}>Select Existing Board</button>
      <hr />
      <input
        type="text"
        placeholder="Enter new board title"
        value={newBoardTitle}
        onChange={(e) => setNewBoardTitle(e.target.value)}
      />
      <button onClick={handleCreateBoard}>Create New Board</button>
    </div>
  );
};

export default BoardSelection;
