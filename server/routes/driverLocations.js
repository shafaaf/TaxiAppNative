var path = require("path");
var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://shafaaf0:password@ds241875.mlab.com:41875/taxiappnative", ["driverLocations"]);

router.get('/driverlocations', function(req, res) {
	console.log("\nGET Request at /api/driverlocations");
	db.driverLocations.find(function(err, driverLocations){
		if(err){
			console.log("err is: ", err);
			res.send(err);
		}
		console.log("driverLocations is: ", driverLocations);
		res.json(driverLocations);
	});
});

// Update driver' details on initial connection
router.put('/driverlocations', function(req, res) {
	console.log("\nPUT Request at /api/driverlocations");
	console.log("req.body is: ", req.body);
	db.driverLocations.update({userName: req.body.userName}, 
		{$set: {socketId : req.body.socketId}}, function (err, updateDetails) {
			if(err){
				console.log("err is: ", err);
				res.send(err);
			} else {
				// console.log("updateDetails is: ", updateDetails);
				console.log("Update successful.");
				res.send(updateDetails);
			}
	})
});

// Get nearby driver. Done from passenger mobile app.
router.get("/driverlocationsnearby", function(req, res, next){
	console.log("\nGET Request at /api/driverlocationsnearby");
	db.driversLocation.ensureIndex({"coordinate":"2dsphere"});
	db.driversLocation.find({
			"coordinate":{
				"$near":{
					"$geometry":{
						"type":"Point",
						"coordinates": [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
					},
					"$maxDistance":10000
				}
			}
		}, function(err, location){
			if(err){
				console.log("err is: ", err);
				res.send(err);

			} else{
				console.log("location is: ", location);
				res.send(location);
			}
	});

});


module.exports = router;
