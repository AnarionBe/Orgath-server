import express from 'express'

import Event from '../models/event'

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    const listEvents = await Event.find({});
    return res.status(200).json(listEvents);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    return res.status(200).json(event);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newEvent = (new Event(req.body));
    newEvent.save();
    return res.status(200).json(newEvent);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return res.status(200).json(updatedEvent);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedEvent);
  } catch(err) {
    return res.status(500).json(err);
  }
});

export default router;