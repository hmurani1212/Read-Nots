// subscribeRoute.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Subscribe = require("../Models/Subscribetion")
const fetchUser = require('../middleware/fetchUser');


// Subscribe to a user's channel
router.post('/subscribe', fetchUser, async (req, res) => {
  const subscriberId = req.user.id;
  const userId = req.user.id;

  try {
    const userToSubscribe = await User.findById(userId);
    if (!userToSubscribe) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is already subscribed
    // const existingSubscription = await Subscribe.findOne({
    //   user: subscriberId,
    //   subscribers: userId,
    // });

    // if (existingSubscription) {
    //   return res.status(400).json({ error: 'You are already subscribed to this user' });
    // }

    // Create a new subscription
    const newSubscription = new Subscribe({
      user: subscriberId,
      subscribers: userId,
      btntext: "Subscribed",
    });

    // Save the new subscription
    const savedSubscription = await newSubscription.save();

    // Update the user's subscriptions array
    userToSubscribe.subscriptions.push(savedSubscription._id);
    await userToSubscribe.save();

    // Update the user being subscribed to's subscribers array
    userToSubscribe.subscribers.push(subscriberId);
    await userToSubscribe.save();

    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Get the subscribers of a user's channel
router.get('/subscribers', fetchUser, async (req, res) => {
  try {
    const userWithSubscribers = await User.findById(req.user.id)
      .populate({
        path: 'subscribers',
        select: 'username',
      });

    if (!userWithSubscribers) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ subscribers: userWithSubscribers.subscribers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});


module.exports = router;
