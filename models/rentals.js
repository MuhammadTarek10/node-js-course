const mongoose = require('mongoose');
const Joi = require('joi');
const {customerSchema} = require('./customers');
const {movieSchema} = require('./movies');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

async function validateRental(rental){
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    };

    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validateRental = validateRental;