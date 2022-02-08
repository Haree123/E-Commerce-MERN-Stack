import express from 'express';

import User from '../models/authModel.js';
import Products from '../models/productModel.js';

const router = express.Router();

router.get('/api/cartIds', async (req, res) => {
  let items = await User.find({}).select('cart -_id');
  let id = [];

  //Reduce function used to remove outer array (extra array)
  let data = items.reduce((acc, item) => acc + item);

  //we are adding all the id to id array to find products based on id
  for (let i = 0; i < data.cart.length; i++) {
    id.push(data.cart[i].pid);
  }
  res.json({
    status: 'Success',
    id,
  });
});

//Get Cart Items
router.get('/api/cart/:email', async (req, res) => {
  const email = req.params.email;
  let items = await User.find({ email }).select('cart -_id');
  let id = [];

  if (email) {
    //we are adding all the id to id array to find products based on id
    for (let i = 0; i < items[0].cart.length; i++) {
      id.push(items[0].cart[i].pid);
    }

    let totalPrice = items[0].cart.reduce((a, b) => a + b.price * b.qty, 0);

    let carts = await User.find({ email }).select('cart.pid cart.qty -_id');

    let products = await Products.find({ _id: { $in: id } });

    if (!items) {
      res.json({
        message: 'No Items',
      });
      return;
    }
    let cart = carts[0].cart;

    res.json({
      products,
      cart,
      totalPrice,
    });
    return;
  }
});

//add to Cart
router.post('/api/addToCart', async (req, res) => {
  const { id, email, price } = req.body;

  let exists = await User.findOne({ cart: { $elemMatch: { pid: id } } });

  if (exists) {
    res.send('Item Exists');
    return;
  } else {
    await User.findOneAndUpdate(
      { email }, // condition
      {
        // add
        $push: {
          cart: {
            pid: id,
            qty: 1,
            price: price,
          },
        },
      }
    );
    res.json({ status: 'Success' });
  }
});

//update cart qty
router.put('/api/updateQty/:email/:id/:qty', async (req, res) => {
  const email = req.params.email;
  const id = req.params.id;
  const qty = req.params.qty;

  await User.findOneAndUpdate(
    {
      email,
      'cart.pid': id,
    },
    {
      $inc: {
        'cart.$.qty': qty,
      },
    }
  );

  //items is used for calculating totalPrice
  let items = await User.find({}).select('cart -_id');
  //carts is used for to know the cart(qty) to render in frontend
  let carts = await User.find({ email }).select('cart.pid cart.qty -_id');
  //Reduce function used to remove outer array (extra array)
  let array = items.reduce((acc, item) => acc + item);
  let totalPrice = array.cart.reduce((a, b) => a + b.price * b.qty, 0);

  let cart = carts[0].cart;

  res.json({
    status: 'Success',
    cart,
    totalPrice,
  });
});

//delete cart item by id
router.delete('/api/deleteCart/:email/:id', async (req, res) => {
  const email = req.params.email;
  const id = req.params.id;

  await User.findOneAndUpdate(
    { email }, // condition
    {
      //delete all values in array by id
      $pull: {
        cart: {
          pid: id,
        },
      },
    }
  );

  res.json('Success');
});

export default router;
