//var env = process.env.NODE_ENV || 'development'
//var config = require('./config')[env]
//var Pound = require('pound');
//
//var pound = Pound.create({
//    publicDir: config.root + '/public',
//    staticUrlRoot: '/'
//});
//
//var bundle = pound.defineAsset; //alias
//
//// Override default resolve function for `$js` and `$css`
//pound.resolve.js = function (filename) { return './public/javascripts/' + filename + '.js'; };
//pound.resolve.css = function (filename) { return __dirname + '/public/css/' + filename + '.css'; };
//
//// Add new resolve function for `$myCssDir` and `$appjs`
//// The resolve function's result will replace `$resolveFunctionName` for each resources
//pound.resolve.myCssDir = function (filename) { return __dirname + '/public/css/' + filename + '.css'; };
//pound.resolve.appjs = function (filename) { return '/app/' + filename + '.js'; };
//
//bundle('home', {
//    // Css assets
//    css: [
//      '$myCssDir/style'  // will resolve $js with the pound.resolve.myCssDir function
//    ],
//
//    // JS assets
//    js: [
//      '$appjs/app'  // will resolve $js with the pound.resolve.js function
//    ]
//});
//
//module.exports = pound;


// assets.js
module.exports = function (assets) {
    assets.addJs(assets.js.options.staticRoot + '/app/**');
}