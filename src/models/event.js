import mongoose from 'mongoose'

export default mongoose.model('Event', new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}));