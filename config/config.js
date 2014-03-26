
var path = require('path')
  , rootPath = path.join(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      service: 'postmark',
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      key: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    db: 'mongodb://localhost/test',
    //db: 'mongodb://sam:welcome1@ds029187.mongolab.com:29187/todo',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    },
    facebook: {
      clientID: "225586927649145",
      clientSecret: "f8032a10d84ee8037e610c266dd6f7e3",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)-
    },
    twitter: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/twitter/callback",
      passReqToCallback : true
    },
    github: {
      clientID: 'b15f57fd85df2b4a5f42',
      clientSecret: '617d599f8aa7c8d2570ee53f6877816150301193',
      callbackURL: 'http://localhost:3000/auth/github/callback',
      passReqToCallback : true
    },
    google: {
      clientID: "224205377459-72f1vsf1c2hmjjlq4pr8vh0o1nsbnfvm.apps.googleusercontent.com",
      clientSecret: "dM9x8YWqI_kxXAHlikpx4uVq",
      callbackURL: "http://localhost:3000/auth/google/callback",
      realm: "http://localhost:3000",
      passReqToCallback : true
    },
    linkedin: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/linkedin/callback",
      passReqToCallback : true
    }
  },
  production: {
      db: 'mongodb://sam:welcome1@ds029187.mongolab.com:29187/todo',
      root: rootPath,
      notifier: notifier,
      app: {
          name: 'Nodejs Express Mongoose Demo'
      },
      facebook: {
          clientID: "626240344115788",
          clientSecret: "d6f6b2fc5b53aa97614798fa6ca9e48d",
          callbackURL: "http://aqueous-savannah-4196.herokuapp.com/auth/facebook/callback",
          passReqToCallback : true
      },
      twitter: {
          clientID: "CONSUMER_KEY",
          clientSecret: "CONSUMER_SECRET",
          callbackURL: "http://localhost:3000/auth/twitter/callback",
          passReqToCallback : true
      },
      github: {
          clientID: '4f528995ee2120b8723d',
          clientSecret: '727bda5ba0fa70ff198bf2cb89f6d3df23a66f22',
          callbackURL: 'http://aqueous-savannah-4196.herokuapp.com/auth/github/callback',
          passReqToCallback : true
      },
      google: {
          clientID: "224205377459.apps.googleusercontent.com",
          clientSecret: "mSV7rOQ7xAQvF0uIOx3kuyH5",
          callbackURL: "http://aqueous-savannah-4196.herokuapp.com/auth/google/callback",
          realm: "http://aqueous-savannah-4196.herokuapp.com",
          passReqToCallback : true
      },
      linkedin: {
          clientID: "CONSUMER_KEY",
          clientSecret: "CONSUMER_SECRET",
          callbackURL: "http://localhost:3000/auth/linkedin/callback",
          passReqToCallback : true
      }
  }
}