import learnRoutes from './routes/learnRoutes.js'
import authRoutes from './routes/authRoutes.js'
import express from 'express'
import db from './db/db.js'
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 8000;


// Middleware
app.use(express.json());

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

var corsOptions = {
  origin: 'https://mindstair.com',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use("/learn", learnRoutes);
app.use("/auth", authRoutes)

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
