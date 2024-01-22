const express = require('express');
const Likes = require('../Models/Likes');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser');
const Note = require("../Models/Notes")
const router = express.Router();

router.post('/like/:noteId', fetchUser, async (req, res) => {
  try {
    const noteId = req.params.noteId;

    // Check if the note exists
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    const newLike = new Likes({
      user: req.user.id,
      note: noteId,
    });

    // Save the new like
    const savedLike = await newLike.save();
    // Add the like to the note's likes array
    note.likes.push(savedLike._id);
    const mynext = await note.save();
    // Add the note to the user's likedNotes array
    const user = await User.findById(req.user.id);
    user.likedNotes.push(noteId);
    await user.save();
    res.json({ Likes: note.likes.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
