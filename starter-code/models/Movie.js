const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    celebrity: {
        type: Schema.Types.ObjectId, //foreign key
        ref: 'Celebrity' //relates to Celebrity model
    }
})

module.exports = model('Movie', movieSchema)