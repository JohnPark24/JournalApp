const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    name: String,
    bio: String,
    location: String,
    birthDate: Date,
    image: String,
    createdAt: { type: Date, default: Date.now },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Card', cardSchema);