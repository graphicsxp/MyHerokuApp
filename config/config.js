
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
      returnURL: "http://aqueous-savannah-4196.herokuapp.com/auth/google/callback",
      realm: "http://aqueous-savannah-4196.herokuapp.com"
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
          clientID: "626240344115788",
          clientSecret: "d6f6b2fc5b53aa97614798fa6ca9e48d",
          callbackURL: "http://aqueous-savannah-4196.herokuapp.com/auth/facebook/callback"
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
          clientID: "224205377459.apps.googleusercontent.com",
          clientSecret: "224205377459@developer.gserviceaccount.com",
          returnURL: "http://aqueous-savannah-4196.herokuapp.com/auth/google/callback",
          realm: "http://aqueous-savannah-4196.herokuapp.com"
      },
      linkedin: {
          clientID: "CONSUMER_KEY",
          clientSecret: "CONSUMER_SECRET",
          callbackURL: "http://localhost:3000/auth/linkedin/callback"
      }
  }
}