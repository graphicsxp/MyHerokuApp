/**
 * Created by sam on 3/21/14.
 */
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    , GithubStrategy = require('passport-github').Strategy
    , User = require('../models/user')

module.exports = function (config) {

    var authenticationCallback = function (req, accessToken, refreshToken, profile, done) {

        var criteria = new Object();
        criteria[profile.provider + '.id'] = profile.id;

        User.findOne(criteria, function (err, user) {
            if (err) {
                console.log(err);
            }
            if (!err && user != null) {
                done(null, user);
            } else {
                var user = new User({created: Date.now()});
                user[profile.provider] = {
                    id: profile.id,
                    token: accessToken,
                    name: profile.name ? profile.name.givenName + ' ' + profile.name.familyName : profile.username,
                    email: profile.emails[0].value
                }

                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("saving user ...");
                        done(null, user);
                    }
                });
            }
        });
    }

    var localAuthenticationSignUpCallback = function (req, email, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email': email }, function (err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.local.email = email;
                newUser.local.password = password;

                // save the user
                newUser.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    };

    var localAuthenticationSignInCallback = function (req, email, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email': email }, function (err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });
    };
    passport.use('local-signin', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, localAuthenticationSignInCallback));

    passport.use('local-signup', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, localAuthenticationSignUpCallback));
    passport.use(new FacebookStrategy(config.facebook, authenticationCallback));
    passport.use(new GoogleStrategy(config.google, authenticationCallback));
    passport.use(new GithubStrategy(config.github, authenticationCallback));
}
