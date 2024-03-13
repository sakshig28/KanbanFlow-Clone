const express = require('express');
const router = express.Router();

// Assuming you have imported your Firestore database instance as db
const { collection, getDocs, deleteDoc, addDoc } = require('firebase/firestore');
const { db } = require('.../src/config/firebase');

// Delete all documents in the specified collection
const deleteCollection = async (collectionPath) => {
  const querySnapshot = await getDocs(collection(db, collectionPath));
  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

// Route handler for saving data
router.post('/save', async (req, res) => {
  try {
    // Delete existing data
    await deleteCollection('lists');

    // Save new data
    const lists = req.body.lists;
    await Promise.all(
      lists.map(async (list) => {
        await addDoc(collection(db, 'lists'), list);
      })
    );

    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});

module.exports = router;
