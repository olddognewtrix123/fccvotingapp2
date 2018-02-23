'use strict';

function clickHandler (db) {

	var clicks = db.collection('clicks');

	this.getClicks = function (req, res) { // uses the findOne() argument to find and returns the number of clicks in the 'clicks' collection

	//	var clickProjection = { '_id': false }; // we don't want the default _id value included in the results
		
	//	var clickProjection = { _id: 0 };

		clicks.findOne({}, { _id: 0 }, function (err, result) { //finds the first document (analgous to record or row in relational databases) that meet the query criteria
		                                                             // defining three arguments here: the query, the projection, and the callback function once the query results are complete
		                                                             // '{}' is the query argument - specifically, this will return all documents
	
			if (err) {
			   console.log('Hey, the findOne() threw an error!');
				throw err;
			}

			if (result) {
			        var whatamI = result;
			        var trtrtr = typeof whatamI;
			        console.log(trtrtr);
                    res.json(result);
     } else {
        clicks.insert({ 'clicks': 0 }, function (err) {
           if (err) {
                  throw err;
           }

                  clicks.findOne({}, { _id: 0 }, function (err, doc) {

                     if (err) {
                        throw err;
                     }
                        var whatamI = result;
			        var trtrtr = typeof whatamI;
			        console.log(trtrtr);
                     res.json(doc);
                  });
               });
            }
		});
	};
	
	this.addClick = function (req, res) { // uses the findAndModify() argument
		clicks.findAndModify(
				{}, // returns all documents
				{ '_id': 1 }, // the sort order in which the results should be arranged
				{ $inc: { 'clicks': 1 } }, // $inc takes the property to modify (clicks) and the number to increment by (1)
				function (err, result) { // cb func that throw error or updates res and sends res back to browser
					if (err) { throw err; }

					res.json(result);
				}
			);
	};

	this.resetClicks = function (req, res) { //uses the update() argument
		clicks.update(
				{}, // returns all documents
				{ 'clicks': 0 }, // updated value for any records found ( in this case needs to reset to 0)
				function (err, result) { 
					if (err) { throw err; }

					res.json(result);
				}
			);
	};
}

module.exports = clickHandler;