import express from 'express'
import Todo from '../models/todo'

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    const listTodos = await Todo.find({...req.query, owner: req.token.id});
    return res.status(200).json(listTodos);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({_id: req.params.id, owner: req.token.id});
    return res.status(200).json(todo);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTodo = await new Todo({...req.body, owner: req.token.id});
    await newTodo.save();
    return res.status(201).json(newTodo);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate({_id: req.params.id, owner: req.token.id}, req.body, {new: true});
    return res.status(200).json(updatedTodo);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({_id: req.params.id, owner: req.token.id});
    return res.status(200).json(deletedTodo);
  } catch(err) {
    return req.status(500).json(err);
  }
});

export default router;