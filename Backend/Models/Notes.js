const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    classValue: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    pdf: {
        type: String,
        require: true,
    },
    likes: [
        { type: Schema.Types.ObjectId, ref: 'Likes' }, // Assuming Likes model
    ],

});


module.exports = mongoose.model("Notes", NotesSchema)