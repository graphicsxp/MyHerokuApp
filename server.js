/**
 * Module dependencies.
 */

var express = require('express');
var helpers = require('express-helpers');
var http = require('http');
var path = require('path');

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config')[env]
    , mongoose = require('mongoose')

// Bootstrap db connection
// Connect to mongodb
var connect = function () {
    var options = { server: { socketOptions: { keepAlive: 1 } } }
    mongoose.connect(config.db, options)
}
connect()

// Error handler
mongoose.connection.on('error', function (err) {
    console.log(err)
})

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
    connect()
})

var app = express();

require('express-helpers')(app);

// express settings
require('./config/express')(app, config);

// Bootstrap routes
require('./config/routes')(app)

require('./config/authentication')(config);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Start the app by listening on <port>
var port = process.env.PORT || 3000
app.listen(port)
console.log('Express app started on port ' + port)

// expose app
exports = module.exports = app