const {Rental, validateRental} = require('../models/rentals');
const express = require('express');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customers');
const router = express.Router();



router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const {error} = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('MovieId is Required');

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('CustomerId is Required');

    if (movie.numberInStock === 0) return res.status(400).send('Movie Out of Stock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = await rental.save();
    movie.numberInStock--;
    movie.save()
    
    res.send(rental);
});

module.exports = router;