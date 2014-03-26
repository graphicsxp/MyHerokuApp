/**
 * Created by sam on 3/21/14.
 */
var passport = require('passport')
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


                    user[profile.provider].id = profile.id;
                    user[profile.provider].token = accessToken;
                    user[profile.provider].name = profile.name.givenName + ' ' + profile.name.familyName;
                    user[profile.provider].email = profile.emails[0].value;

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

    passport.use(new FacebookStrategy(config.facebook, authenticationCallback));
    passport.use(new GoogleStrategy(config.google, authenticationCallback));
//    passport.use(new GithubStrategy(config.github, authenticationCallback));
}
