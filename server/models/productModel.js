import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    brand: String,
    category: String,
    imageUrl: String,
    price: String,
    countInStock: String,
    ratings: String,
    numReviews: String,
  },
  { timestamps: true }
);

const productModel = mongoose.model('products', productSchema);

export default productModel;
