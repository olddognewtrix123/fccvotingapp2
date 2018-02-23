'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');

module.exports = function (app, db) {

	var clickHandler = new ClickHandler(db);

	app.route('/')
		.get(function (req, res) {
			res.sendFile(process.cwd() + '/public/index.html');
		});

	app.route('/api/clicks') // When there is an HTTP GET request to the /api/clicks route, the server will respond by running the getClicks method. Similarly, a POST and DELETE request will run the corresponding methods from the server-side controller.
		.get(clickHandler.getClicks)
		.post(clickHandler.addClick)
		.delete(clickHandler.resetClicks); 
}; 