import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import eventRouter from './routes/event'

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(_ => console.log('connected to MongoDb'))
  .catch(err => console.error(err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/event', eventRouter);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
