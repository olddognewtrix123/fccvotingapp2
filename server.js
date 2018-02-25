

// getting 'failed to load resource net connection refused' when this is run in Chrome - this is a routing problem

// always get the mongodb(running locally) invoked with mongod --smallfiles

// for testing or debugging, to manually remove the document from the database, get mongo running and then
// in a new terminal open the mongo shell with $ mongo
// $ use clementinejs
// $ db.clicks.find({})
// $ db.clicks.remove({})

// left off at http://www.clementinejs.com/tutorials/tutorial-beginner.html#SettingUptheServer-SideController

//git add -A  git commit -m "schema and mocha unhunh"  git push github original

// removed font-family: 'Roboto', sans-serif; from css body statement

'use strict';

var express = require('express'),
	routes = require('./app/routes/index.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session');

var cors = require('cors');
var app = express();

require('dotenv').load();
require('./app/config/passport')(passport);

app.use(cors({
	origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
	}));
	


//mongoose.connect('mongodb://localhost:27017/clementinejs');
mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

//var port = 8080;
var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});