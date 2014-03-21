/**
 * Created by sam on 3/21/14.
 */
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy
    , User = require('../models/user')

module.exports = function (config) {

    passport.use(new FacebookStrategy(config.facebook,
        function (accessToken, refreshToken, profile, done) {
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
    ));
}