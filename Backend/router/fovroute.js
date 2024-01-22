const express = require('express');
const mongoose = require('mongoose');
const favroute = require('../models/favroute');
const User = require('../models/User');
const Notes = require("../Models/Notes")
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
router.post('/addFavorite', fetchUser, async (req, res) => {
  try {
    const { notesId } = req.body;

    // Find the note by ID
    const notes = await Notes.findById(notesId);

    // Check if the note exists
    if (!notes) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Find the user's favorite
    const existingFavorite = await favroute.findOne({ user: req.user.id });

    if (existingFavorite) {
      // Check if the note is already in the favorite's notes array
      const existingNote = existingFavorite.favorites.find(note => note._id.equals(notes._id));

      if (existingNote) {
        return res.status(400).json({ error: 'Note is already a favorite' });
      }

      // Add the new note to the existing favorite's notes array
      existingFavorite.favorites.push(notes);

      // Save the updated favorite
      const updatedFavorite = await existingFavorite.save();

      return res.json(updatedFavorite);
    } else {
      // Create a new favorite and push the first note data
      const newFavorite = new favroute({
        user: req.user.id,
        favorites: [notes.toObject()], // Convert the Mongoose document to a plain JavaScript object
      });

      // Save the new favorite
      const savedFavorite = await newFavorite.save();

      return res.json(savedFavorite);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/getfavourit', fetchUser, async (req, res) => {
  try {
    // Find the user in the database
    const allfavroute = await favroute.find({ user: req.user.id });
    if (!allfavroute) {
      return res.status(404).json({ error: 'No Notes Avilable in your favourite' });
    }
    res.json({ allfavroute });
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});


module.exports = router