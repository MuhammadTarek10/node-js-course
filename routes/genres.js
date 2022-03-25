const auth = require('../middleware/auth');
const admin = require('../middleware/admins');
const validateObjectId = require('../middleware/validateObjectId');
const {Genre, validate} = require('../models/genres')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("Didn't find a genre with this id");
    res.send(genre);
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