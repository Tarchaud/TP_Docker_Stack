const bcrypt=require('bcryptjs');
const User= require('../models/users');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

exports.signup = (req, res, next) => {
    console.log("teste incripstion de " , req.body); //TODO :clear
    bcrypt.hash(req.body.password,10).then(hash => {
        const user = new User({
            last_name : req.body.last_name,
            first_name : req.body.first_name,
            email: req.body.email,
            password: hash,
        });
        console.log(user); //TODO :clear
        user.save()
            .then(() => res.status(201).json(user))
            .catch(error => next(createHttpError(400, error)));
    }).catch(error => next(createHttpError(400, error)));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
        if (!user) {
            next(createHttpError(401, 'User not found!'));
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    next(createHttpError(401, 'Incorrect password!'));
                }
                res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
                });
            })
            .catch(error => next(createHttpError(400, error)));
        })
        .catch(error => next(createHttpError(400, error)));
};