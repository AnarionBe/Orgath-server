import "core-js/stable"
import "regenerator-runtime/runtime"

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

import eventRouter from './routes/event'
import todoRouter from './routes/todo'
import weatherRouter from './routes/weather'
import userRouter from './routes/user'

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(_ => console.log('connected to MongoDb'))
  .catch(err => console.error(err));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/event', eventRouter);
app.use('/todo', todoRouter);
app.use('/weather', weatherRouter);

app.use('/', userRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server running...');
});
