const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: 'Le message est requis'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
      },
});

module.exports = mongoose.model('Comment', commentSchema);