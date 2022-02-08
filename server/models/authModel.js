import mongoose from 'mongoose';

const authSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phoneNo: String,
    cart: [
      {
        pid: String,
        qty: Number,
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const authModel = mongoose.model('users', authSchema);

export default authModel;
