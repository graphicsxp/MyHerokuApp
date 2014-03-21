/**
 * Created by sam on 3/21/14.
 */
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google').Strategy
    , GithubStrategy = require('passport-github').Strategy
    , User = require('../models/user')

module.exports = function (config) {

    var authenticationCallback = function (accessToken, refreshToken, profile, done) {
        User.findOne({ oauthID: profile.id }, function (err, user) {
            if (err) {
                console.log(err);
            }
            if (!err && user != null) {
                done(null, user);
            } else {
                var user = new User({
                    oauthID: profile.id,
                    name: profile.displayName,
                    created: Date.now()
                });
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("saving user ...");
                        done(null, user);
                    }
                    ;
                });
            }
            ;
        });
    }

    passport.use(new FacebookStrategy(config.facebook, authenticationCallback));
    passport.use(new GoogleStrategy(config.google, authenticationCallback));
    passport.use(new GithubStrategy(config.github, authenticationCallback));
};