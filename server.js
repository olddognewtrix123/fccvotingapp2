// always get the mongodb(running locally) invoked with mongod --smallfiles

// left off at http://www.clementinejs.com/tutorials/tutorial-beginner.html#SettingUptheServer-SideController

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

	routes(app, myDB);

	app.listen(8080, function () {
		console.log('Listening on port 8080...');
	});

});