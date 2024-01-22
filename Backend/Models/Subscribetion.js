// Subscribe.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscribeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subscribers: [
    { type: Schema.Types.ObjectId, ref: 'User' },
  ],
  btntext:{
    type:String,
    default:"Subscribe"
  },
});

module.exports = mongoose.model('Subscribe', subscribeSchema);
