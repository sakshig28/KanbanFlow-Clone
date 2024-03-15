import express from 'express';
const router = express.Router();
import { collection, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../myapp/src/config/firebase.mjs';


export const deleteCollection = async (collectionPath) => {
  const querySnapshot = await getDocs(collection(db, collectionPath));
  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

router.post('/save', async (req, res) => {
  try {
    console.log('Received POST request to /save');
    const userID = req.body.userid
    try{
      await deleteCollection(`lists-${userID}`); //tries to delete existing database for user
    }catch(err){
      console.log(err)
      console.log('user does not have a board saved yet, saving now')
    }
    //await deleteCollection('lists');
    const lists = req.body.lists;
    await Promise.all(
      lists.map(async (list) => {
        await addDoc(collection(db, `lists-${userID}`), list);
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
