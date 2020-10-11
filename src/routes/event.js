import express from 'express'

import Event from '../models/event'

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    const listEvents = await Event.find({});
    res.status(200).json(listEvents);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newEvent = (new Event(req.body));
    newEvent.save();
    res.status(200).json(newEvent);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedEvent);
  } catch(err) {
    res.status(500).json(err);
  }
});

export default router;