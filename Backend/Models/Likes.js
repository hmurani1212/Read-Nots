const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true,
  },
});

module.exports  = mongoose.model('Likes', likesSchema);


