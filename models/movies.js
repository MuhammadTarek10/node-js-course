const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genres')


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
    },
    numberInStock: {
        type: Number,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = new mongoose.model('Movie', movieSchema);

function validateMovie(movie){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };

    return Joi.validate(movie, schema);
}



exports.Movie = Movie;
exports.validateMovie = validateMovie;
exports.movieSchema = movieSchema;