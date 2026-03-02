import express from 'express';
import Role from '../models/Role.js';

const router = express.Router();

// Create Role
router.post('/', async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Role by ID
router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Role
router.put('/:id', async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
