import learnRoutes from './routes/learnRoutes.js'
import userRoutes from './routes/userRoutes.js'
import express from 'express'
import db from './db/db.js'
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 8000;


// Middleware
app.use(express.json());

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/learn", learnRoutes);
app.use("/user", userRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
