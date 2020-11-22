import mongoose from 'mongoose'

export default mongoose.model('Todo', new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}));