var Todo = require('../models/todo')
    , passport = require('passport');


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function (err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    //authentication ------------------------------------------------------------
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    );

    //authorization ------------------------------------------------------------
    app.get('/auth/facebook', passport.authorize('facebook', { scope: 'email' }));

    app.get('/auth/facebook/callback',
        passport.authorize('facebook', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    );

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }),
        function (req, res) {
        });

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function (req, res) {
            res.redirect('/');
        }
    );

    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/login',
        failureFlash: true
    }),
        function (req, res) {
            res.redirect('/');
        }
    );

    app.get('/auth/github/callback',
        passport.authenticate('github', {
            failureRedirect: '/login',
            failureFlash: true
        }),
        function (req, res) {
            res.redirect('/');
        }
    );

    // =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/github', function(req, res) {
        var user           = req.user;
        user.github.token = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                return res.json(err);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.json(err);
                }
                return res.json(200, user);
            });
        })(req, res, next);
    });

    app.post('/signin', function (req, res, next) {
        passport.authenticate('local-signin', function (err, user, info) {
            if (err) {
                return res.json(err);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.json(err);
                }
                return res.json(200, user);
            });
        })(req, res, next);
    });

    app.get('/login', function (req, res) {
        res.send({'isAuthenticated': req.isAuthenticated(), 'user': req.user});
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.render('index', { title: "TODO", user: req.user})

    });
}