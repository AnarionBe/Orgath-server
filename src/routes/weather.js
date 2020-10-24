import express from 'express'
import Axios from 'axios'

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    const {data} = await Axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: req.query.city,
        appid: process.env.REACT_APP_WEATHER_API_KEY,
        units: 'metric'
      }
    });
    return res.status(200).json(data);
  } catch(err) {
    res.status(500).json(err);
  }
});

export default router;