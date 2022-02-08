import mongoose from 'mongoose';

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo DB connected');
  } catch (err) {
    console.log(err);
  }
};

export default db;
