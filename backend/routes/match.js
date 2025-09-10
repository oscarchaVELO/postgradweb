const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Group = require('../models/Group');

// Swipe on a user
router.post('/:id/swipe', async (req, res) => {
  try {
    const { swiperId } = req.body;
    const swipedUser = await User.findById(req.params.id);
    const swiper = await User.findById(swiperId);
    if (!swipedUser || !swiper) return res.status(404).json({ error: 'User not found' });
    // Add swiped user to swiper's swipes
    if (!swiper.swipes.includes(swipedUser._id)) {
      swiper.swipes.push(swipedUser._id);
      await swiper.save();
    }
    // If swiped user has also swiped on swiper, create a match
    if (swipedUser.swipes.includes(swiper._id)) {
      swiper.matches.push(swipedUser._id);
      swipedUser.matches.push(swiper._id);
      await swiper.save();
      await swipedUser.save();
      return res.json({ match: true });
    }
    res.json({ match: false });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a group from mutual matches
router.post('/:id/groups', async (req, res) => {
  try {
    const { memberIds, name } = req.body;
    const group = new Group({ name, members: memberIds, createdBy: req.params.id });
    await group.save();
    // Add group to each member's groups
    await User.updateMany({ _id: { $in: memberIds } }, { $push: { groups: group._id } });
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get one-on-one matches for a user
router.get('/:id/matches', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('matches', 'name email bio location interests');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.matches);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
