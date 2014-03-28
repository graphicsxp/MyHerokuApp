/**
 * Module dependencies.
 */

var express = require('express')
    , mongoStore = require('connect-mongo')(express)
    , flash = require('connect-flash')
    , winston = require('winston')
    , helpers = require('view-helpers')
    , pkg = require('../package.json')
    , assets = require('./assets')
    , passport = require('passport')
    , User = require('../models/user');

var env = process.env.NODE_ENV || 'development'

module.exports = function (app, config) {

    app.set('showStackError', true)

    // should be placed before express.static
    app.use(express.compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
        },
        level: 9
    }))

    // Logging
    // Use winston on production
    var log
    if (env !== 'development') {
        log = {
            stream: {
                write: function (message, encoding) {
                    winston.info(message)
                }
            }
        }
    } else {
        log = 'dev'
    }
    // Don't log during tests
    if (env !== 'test') app.use(express.logger(log))

    app.configure(function () {
        // expose package.json to views
        app.use(function (req, res, next) {
            res.locals.pkg = pkg
            next()
        })

        app.use(express.favicon())

        app.use(express.static(config.root + '/public'))  // set the static files location /public/img will be /img for users

        // cookieParser should be above session
        app.use(express.cookieParser())

        // bodyParser should be above methodOverride
        app.use(express.bodyParser())     //for parsing request body
        app.use(express.methodOverride()) //for using app.put and app.delete instead of app.post all the time (simulates DELETE and PUT)

        // Assets automatic configuration thanks to Pound
        //assets.configure(app);

        // express/mongo session storage
        app.use(express.session({
            secret: pkg.name,
            store: new mongoStore({
                url: config.db,
                collection: 'sessions'
            })
        }));

        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });

        // use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        // connect flash for flash messages - should be declared after sessions
        app.use(flash())

        // should be declared after session and flash
        app.use(helpers(pkg.name))

      // adds CSRF support
//    if (process.env.NODE_ENV !== 'test') {
//      app.use(express.csrf())
//
//      // This could be moved to view-helpers :-)
//      app.csrf = function(req, res, next){
//        res.locals.csrf_token = req.session._csrf;
//        next()
//      };
//    }

        // routes should be at the last
        app.use(app.router)

        // assume "not found" in the error msgs
        // is a 404. this is somewhat silly, but
        // valid, you can do whatever you like, set
        // properties, use instanceof etc.
        app.use(function (err, req, res, next) {
            // treat as 404
            if (err.message
                && (~err.message.indexOf('not found')
                || (~err.message.indexOf('Cast to ObjectId failed')))) {
                return next()
            }

            // log it
            // send emails if you want
            console.error(err.stack)

            // error page
            res.status(500).render('500', { error: err.stack })
        })

        // assume 404 since no middleware responded
        app.use(function (req, res, next) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            })
        })
    })

    // set views path, template engine and default layout
    app.set('views', config.root + '/views')
    app.set('view engine', 'ejs');

    // development env config
    app.configure('development', function () {
        app.locals.pretty = true
    })
}