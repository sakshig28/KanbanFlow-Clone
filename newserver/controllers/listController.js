import express from 'express';
const router = express.Router();
import { collection, getDocs, deleteDoc, addDoc, doc, query, where, getDoc } from 'firebase/firestore';
import { db } from '../../myapp/src/config/firebase.mjs';

router.post('/save', async (req, res) => {
  try {
    console.log('Received POST request to /save');
    const userID = req.body.userid;
    const boardID = req.body.boardID;

    // Create a reference to the 'lists' subcollection within the board document
    const listsCollectionRef = collection(db, `boards/${userID}/${boardID}`);

    // Delete existing documents within the 'lists' subcollection of the board
    const existingListsSnapshot = await getDocs(listsCollectionRef);
    existingListsSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    const lists = req.body.lists;
    await Promise.all(
      lists.map(async (list) => {
        // Add each list document to the 'lists' subcollection of the board
        await addDoc(listsCollectionRef, list);
      })
    );

    console.log('Data saved successfully');
    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});


export default router;
