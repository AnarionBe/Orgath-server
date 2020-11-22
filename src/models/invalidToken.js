import mongoose from 'mongoose'

export default mongoose.model('InvalidToken', new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  }
}));