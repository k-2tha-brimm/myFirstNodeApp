const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    
    User.findOne( { handle: req.body.handle } )
    .then(user => {
        if(user) {
            return res.status(400).json({handle: "A user is already registered with that handle"})
        } else {
            const newUser = new User({
                handle: req.body.handle,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                })
            })
        }
    })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    
    const handle = req.body.handle;
    const password = req.body.password;

    User.findOne({ handle })
        .then(user => {
            if(!user) {
                return res.status(404).json({ handle: 'This user does not exist' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            handle: user.handle,
                        }
                        jwt.sign(
                            payload, 
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        )
                    } else {
                        return res.status(400).json( { password: 'Password was incorrect.' } )
                    }
                })
        })
})

module.exports = router;