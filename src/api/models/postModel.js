const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: 'Le contenu est requis'
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
     }
    },
    {
     timestamps: true,
    });

module.exports = mongoose.model('Post', postSchema);