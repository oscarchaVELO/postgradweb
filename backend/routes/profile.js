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
    const { coordinates } = req.body; // [longitude, latitude]
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { location: { type: 'Point', coordinates } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get users nearby
router.get('/nearby', async (req, res) => {
  try {
    const { lng, lat, maxDistance = 5000 } = req.query;
    const users = await User.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
