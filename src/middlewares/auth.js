import jwt from 'jsonwebtoken'
import InvalidToken from '../models/invalidToken'

export const checkAuth = async (req, res, next) => {
  try {
    const invalidToken = await InvalidToken.findOne({token: req.cookies.access_token});

    if(invalidToken) return res.status(401).json({message: 'Invalid token'})

    await jwt.verify(req.cookies.access_token, process.env.ACCESS_TOKEN_SECRET || 'superSecret');
    next();
  } catch(err) {
    return res.status(401).json(err);
  }
}