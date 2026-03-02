import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create User
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Users (không lấy user đã xóa mềm)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ deleted: false }).populate('role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, deleted: false }).populate('role');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update User
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      req.body,
      { new: true }
    ).populate('role');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Soft Delete User
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enable User
router.post('/enable', async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOneAndUpdate(
      { email, username, deleted: false },
      { status: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User enabled', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Disable User
router.post('/disable', async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOneAndUpdate(
      { email, username, deleted: false },
      { status: false },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User disabled', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
