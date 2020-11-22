import express from 'express'
import Axios from 'axios'

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    const quote = await Axios.get('https://quotes.rest/qod', {
      params: {
        language: 'en'
      }
    });

    res.status(200).json(quote.data.contents.quotes[0]);
  } catch(err) {
    res.status(500).json(err);
  }
});

export default router;