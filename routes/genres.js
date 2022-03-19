const auth = require('../middleware/auth');
const admin = require('../middleware/admins');
const {Genre, validate} = require('../models/genres')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    if(!genre) return res.status(400).send('Not found a genre for this id');

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(400).send('Not found a genre for this id');

    res.send("Deleted");
});


module.exports = router;