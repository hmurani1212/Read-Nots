const mongoose = require('mongoose');
const { Schema } = mongoose;
const commentsSchema = new mongoose.Schema({
    user: [{
        type: Schema.Types.Mixed,
        ref: 'User',
        required: true
    }], 
    comments: {
        type: String,
        require: String,
    }
});

module.exports = mongoose.model('comments', commentsSchema);