const bcrypt = require('bcrypt');
const {User} = require('../models/users')
const express = require('express');
const Joi = require('joi');
const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Credintials');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Credintials');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(user){
    const schema = {
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required()
    };

    return Joi.validate(user, schema);
}


module.exports = router;
