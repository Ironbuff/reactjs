const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defined post schema
const PostSchema = new Schema(
    {
        title: String,
        summary: String,
        content: String,
        img: String,
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true, // Returns values such as createdAt and updatedAt
    }
);

module.exports = mongoose.model('Post', PostSchema);