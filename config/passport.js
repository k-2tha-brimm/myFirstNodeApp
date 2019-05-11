const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJWT;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require ('./keys');

const options = {};
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JWTStrategy(options, (jwt_payload, done) => {
        console.log(jwt_payload);
        done();
    }))
}