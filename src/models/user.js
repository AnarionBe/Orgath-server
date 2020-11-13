import mongoose from 'mongoose'

export default mongoose.model('User', new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  pseudo: {
    type: String,
    default: ''
  }
}));