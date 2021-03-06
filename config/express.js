/*
***************************************************************
./config/express.js
***************************************************************


- configures the Express server application module
***************************************************************
*/


var config     = require('./config'),
express        = require('express'),
morgan         = require('morgan'),
compress       = require('compression'),
bodyParser     = require('body-parser'),
methodOverride = require('method-override'),
session        = require('express-session'),
flash          = require('connect-flash'),
passport       = require('passport');


module.exports = function() {
    var app = express();

    if( process.env.NODE_ENV==='development' ){
        // Concise output colored by response status for development use.
        // The :status token will be colored red for server error codes,
        // yellow for client error codes, cyan for redirection codes, and
        // uncolored for all other codes.
        app.use(morgan('dev'));

    } else if( process.env.NODE_ENV==='production' ){
        app.use(compress());
    }

    // Parse incoming request bodies in a middleware before your handlers,
    // availabe under the req.body property.
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    // Lets you use HTTP verbs such as PUT or DELETE in places where the
    // client doesn't support it.
    app.use(methodOverride());

    // MUST add to package.json
    app.use(session({
        saveUninitialized: true,
        resave           : true,
        // secret           : config.sessionSecret
        secret           : 'taco is my creature'
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    // the routing module function in 'index.server.routes.js' accepts app as argument
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);

    app.use(express.static('./public'));

    return app;
};
