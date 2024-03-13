import express from 'express';
import listController from './controllers/listController'
 // Import the saveData function from the listController

const app = express();
const port = process.env.PORT || 5510;

app.use(express.json());

// Use the saveData function in the /save route handler
app.post('/save', listController.saveData);

app.listen(port, () => console.log(`Server listening on port ${port}`));
