import "core-js/stable"
import "regenerator-runtime/runtime"

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import eventRouter from './routes/event'
import todoRouter from './routes/todo'
import weatherRouter from './routes/weather'
import userRouter from './routes/user'

import {checkAuth} from './middlewares/auth'

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(_ => console.log('connected to MongoDb'))
  .catch(err => console.error(err));

app.use(cors({
  origin: [
    'http://localhost:8888',
    'https://localhost:8888',
    'https://anarionbe.github.io/Orgath/'
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"]
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/event', checkAuth, eventRouter);
app.use('/todo', checkAuth, todoRouter);
app.use('/weather', checkAuth, weatherRouter);

app.use('/', userRouter);

app.get('/ping', checkAuth, (req, res) => {
  return res.status(200).json({message: 'pong'});
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});


app.listen(process.env.PORT || 8000, () => {
  console.log('Server running...');
});
