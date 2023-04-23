import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const db = mongoose.connection;

db.once('open', () => {
  console.log('MongoDB connection established successfully!');
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

export default db;
