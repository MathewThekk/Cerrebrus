import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = process.env.NODE_ENV === 'production' ? process.env.DB_PROD_URI : process.env.DB_URI;

console.log(uri)

mongoose
  .connect(uri, {
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
