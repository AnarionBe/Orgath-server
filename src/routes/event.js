import express from 'express'

import Event from '../models/event'

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    res.send(await Event.find({}));
  } catch(err) {
    console.error(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      date: new Date()
    });
    res.send(await event.save());
  } catch(err) {
    console.error(err);
  }
});

export default router;