const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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