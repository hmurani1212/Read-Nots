const express = require('express');
const Comments = require('../Models/Comments');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
router.post('/comments', fetchUser, async (req, res) => {
  const userId= req.user.id;
  try {
    const {  comments } = req.body;
    // Check if the user exists
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Create a new comment
    const newComment = new Comments({
      user:user,
      comments: comments,
    });
    // Save the new comment and populate the 'user' field with user data
    const savedComment = await newComment.save();
    const populatedComment = await Comments.populate(savedComment, { path: 'user' });

    return res.json(populatedComment);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});
router.get('/getComments', async (req, res) => {
    try {
      const allComments = await Comments.find();
      if (!allComments) {
        return res.status(404).json({ error: 'No Comments Avilable in your. Be first Commentator' });
      }
      res.json({ allComments });
    } catch (error) {
      console.error('Error fetching favorites:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
  });

module.exports = router;
