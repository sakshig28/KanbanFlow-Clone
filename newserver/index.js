import express from 'express';
import router from './controllers/listController.js';
import cors from 'cors'; // Import the cors middleware

const app = express();
const port = process.env.PORT || 5510;

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

// Use cors middleware
app.use(cors());

app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log(`Server listening on port ${port}`));
