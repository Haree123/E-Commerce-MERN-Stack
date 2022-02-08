import express from 'express';

import Products from '../models/productModel.js';
import User from '../models/authModel.js';

const router = express.Router();

//Get All Products
//For Home Screen
router.get('/getAllProducts', async (req, res) => {
  const products = await Products.find({});
  if (!products) {
    res.status(404).json({
      status: 'Fail',
      message: 'No Products',
    });
    return;
  }

  res.status(200).json(products);
  return;
});

//Get Single Product by Id
//For ProductScreen
router.get('/getProduct/:id/:email?', async (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  let existsBool = false;

  // * * email is optional because if not authenticated email will be undefined
  //In here we are checking that the particular product is
  //in the cart database and if exists we are changing the existsBool object to true
  //else false
  if (email !== undefined) {
    let exists = await User.findOne(
      { email },
      { cart: { $elemMatch: { pid: id } } }
    ).select('-_id');

    //if the product is not in the cart database, it will return a global ObjectId and
    //an empty cart array, so in here we are checking the id is includes in the exists.cart
    try {
      let checkItem = exists.cart.find((item) => item.pid === id);
      if (checkItem) {
        existsBool = true;
      } else {
        existsBool = false;
      }
    } catch (e) {
      console.log(e);
    }
  }
  const product = await Products.findById(id);
  if (!product || !id) {
    res.status(404).json({
      status: 'Fail',
      message: 'No Products',
    });
    return;
  }

  res.status(200).json({
    cart: existsBool,
    product,
  });
  return;
});

export default router;
