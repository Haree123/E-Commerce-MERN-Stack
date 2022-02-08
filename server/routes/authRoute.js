import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/authModel.js';

const router = express.Router();

// Register User
router.post('/signup', async (req, res) => {
  let { name, email, password, phoneNo } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.status(400).json({
      message: 'User Already exists',
    });
    return;
  }

  user = new User({
    name,
    email,
    password,
    phoneNo,
  });

  user.password = await bcrypt.hash(password, 16);
  await user.save();

  let payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    phoneNo: user.phoneNo,
  };

  let token = jwt.sign(payload, process.env.SECRET_KEY);

  res.cookie('token', token);

  res.status(200).json({
    message: 'Registered',
    email: user.email,
    name: user.name,
  });
  return;
});

//Login user
router.post('/signin', async (req, res) => {
  let { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    res.json({
      message: 'Invalid Credentials',
    });
    return;
  }

  let passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.json({
      message: 'Invalid Credentials',
    });
    return;
  }

  let payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };

  let token = jwt.sign(payload, process.env.SECRET_KEY);

  res.cookie('token', token);

  return res.json({
    message: 'Logged In',
    name: user.name,
    email: user.email,
  });
});

//Log Out User
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Logged Out',
  });
});

//verify token
router.get('/loginstatus', async (req, res) => {
  let token = req.cookies['token'];

  if (!token) {
    res.json({
      message: 'No Token',
    });
    return;
  }

  let decodeToken = jwt.verify(token, process.env.SECRET_KEY);

  if (!decodeToken) {
    res.json({
      message: 'Invalid Token',
    });
    return;
  }

  return res.status(200).json({
    message: 'Valid Token',
    name: decodeToken.name,
    email: decodeToken.email,
  });
});

export default router;
