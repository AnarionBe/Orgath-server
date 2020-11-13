import express from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'

const router = new express.Router();

const SALTS_ROUNDS = 10;

const removeHash = (user) => {
  user = user.toObject();
  delete user.password_hash;
  return user;
}

router.post('/register', async (req, res) => {
  let errors = [];

  // Check required values
  if(!req.body.password) {
    errors.push({
      key: 'password',
      message: 'Password is required',
    });
  }

  if(!req.body.email) {
    errors.push({
      key: 'email',
      message: 'Email is required',
    });
  }

  if(errors.length > 0) return res.status(400).json({errors})

  // Create new user
  try {
    const password_hash = await bcrypt.hash(req.body.password, SALTS_ROUNDS);
    let newUser = await new User({
      email: req.body.email,
      password_hash,
      pseudo: req.body.pseudo
    });
    await newUser.save();
    return res.status(201).json(removeHash(newUser));
  } catch(err) {
    if(err.name === 'MongoError') {
      errors = Object.keys(err.keyValue).map(key => {
        switch(key) {
          case 'email':
            return {
              key,
              message: 'Email already used'
            };
        }
      });
      return res.status(400).json({errors});
    }

    return res.status(500).json(err);
  }
});

export default router;