const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create user profile
router.post('/', async (req, res) => {
  try {
    const { name, email, bio, location, interests } = req.body;
    const user = new User({ name, email, bio, location, interests });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user location
router.put('/:id/location', async (req, res) => {
  try {
    const { city, state, country } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { location: { city, state, country } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get users nearby (by city, state, country)
router.get('/nearby', async (req, res) => {
  try {
    const { city, state, country } = req.query;
    const users = await User.find({
      'location.city': city,
      'location.state': state,
      'location.country': country
    });
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
