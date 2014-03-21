
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
      clientID: "1455496368015771",
      clientSecret: "3db5fefd1d3cc14526f34826bba092a7",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    linkedin: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/linkedin/callback"
    }
  },
  test: {
    db: 'mongodb://localhost/noobjs_test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    },
    facebook: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    linkedin: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/linkedin/callback"
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
          clientID: "1455496368015771",
          clientSecret: "3db5fefd1d3cc14526f34826bba092a7",
          callbackURL: "http://serene-peak-7443.herokuapp.com/auth/facebook/callback"
      },
      twitter: {
          clientID: "CONSUMER_KEY",
          clientSecret: "CONSUMER_SECRET",
          callbackURL: "http://localhost:3000/auth/twitter/callback"
      },
      github: {
          clientID: 'APP_ID',
          clientSecret: 'APP_SECRET',
          callbackURL: 'http://localhost:3000/auth/github/callback'
      },
      google: {
          clientID: "APP_ID",
          clientSecret: "APP_SECRET",
          callbackURL: "http://localhost:3000/auth/google/callback"
      },
      linkedin: {
          clientID: "CONSUMER_KEY",
          clientSecret: "CONSUMER_SECRET",
          callbackURL: "http://localhost:3000/auth/linkedin/callback"
      }
  }
}