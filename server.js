// getting 'failed to load resource net connection refused' when this is run in Chrome - this is a routing problem

// always get the mongodb(running locally) invoked with mongod --smallfiles

// for testing or debugging, to manually remove the document from the database, get mongo running and then
// in a new terminal open the mongo shell with $ mongo
// $ use clementinejs
// $ db.clicks.find({})
// $ db.clicks.remove({})

// left off at http://www.clementinejs.com/tutorials/tutorial-beginner.html#SettingUptheServer-SideController

//git add -A  git commit -m "schema and mocha unhunh"  git push github master

// removed font-family: 'Roboto', sans-serif; from css body statement

'use strict';

var express = require('express'),
	routes = require('./app/routes/index.js'),
	mongo = require('mongodb').MongoClient;


var app = express();

mongo.connect('mongodb://localhost:27017/clementinejs', function (err, client) {


	if (err) {
		throw new Error('Database failed to connect!');
	} else {
		console.log('MongoDB successfully connected on port 27017.');
		var myDB=client.db('clementinejs');
	}

	app.use('/public', express.static(process.cwd() + '/public'));
	app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

	routes(app, myDB); // this is where index gets fed what app it's dealing with and what db to use

	app.listen(8080, function () {
		console.log('Listening on port 8080...');
	});

});