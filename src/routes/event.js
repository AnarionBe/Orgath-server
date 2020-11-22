import express from 'express'
import Event from '../models/event'
import dayjs from 'dayjs'

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    let listEvents = await Event.find({owner: req.token.id});
    if(req.query.date) {
      const date = dayjs(req.query.date);
      listEvents = listEvents.filter(evt => dayjs(evt.date).date() === date.date())
    }
    return res.status(200).json(listEvents);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({_id: req.params.id, owner: req.token.id});
    return res.status(200).json(event);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newEvent = new Event({...req.body, owner: req.token.id});
    await newEvent.save();
    return res.status(201).json(newEvent);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate({_id: req.params.id, owner: req.token.id}, req.body, {new: true});
    return res.status(200).json(updatedEvent);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({_id: req.params.id, owner: req.token.id});
    return res.status(200).json(deletedEvent);
  } catch(err) {
    return res.status(500).json(err);
  }
});

export default router;