const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');



require('dotenv').config();

//Signup
router.post('/signup', async (req, res) => {
    const { username, email, password} = req.body;
    console.log(req.body,"1")
  
    try {

      // Check if the user already exists
      // const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      // if (existingUser) {
      //   return res.status(400).json({ message: 'Email or username already exists. Please use a different email or username.' });
      // }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const findExistUser = await User.findOne({email});
      if(findExistUser){
        return res.status(400).json({ message: 'User Already Exist' });
      }
  
      // Create a new user
      // const newUser = new User({ username, email, password});
      // await newUser.save();
  
      const newUser = await User.create ({username:username,email:email,password:hashedPassword})
  
  
      // Send success response
      return res.status(201).json({ message: 'User created successfully. Please login.' });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ message: 'An error occurred during signup. Please try again later.' });
    }
  });
  

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

   
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

   
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ success: true, token, userId: user._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Logout
router.post('/logout', (req, res) => {
  try {
   
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthorized');
    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

