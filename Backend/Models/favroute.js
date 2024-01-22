const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoritesSchema = new mongoose.Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  }, // Assuming there's a User model
  favorites: [
    { type: Schema.Types.Mixed, ref: 'Notes' }
  ],
});

module.exports = mongoose.model('favroute', favoritesSchema);
