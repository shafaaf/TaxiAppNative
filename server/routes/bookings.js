var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://shafaaf0:password@ds241875.mlab.com:41875/taxiappnative", ["bookings"]);

router.get('/bookings', function(req, res) {
	console.log("\nGET Request at /api/bookings");
	db.bookings.find(function(err, bookings){
		if(err){
			console.log("err is: ", err);
			res.send(err);
		}
		console.log("bookings is: ", bookings);
		res.json(bookings);
	});
});

router.post('/bookings', function(req, res){
	console.log("\nPOST Request at /api/bookings");
	console.log("req.body is: ", req.body);
	var booking = req.body;
	if((booking == null) || (booking == "") || (Object.keys(booking).length === 0)){
		res.status(400);
		res.json({
			"error": "Bad data!"
		});
	}
	else{
		db.bookings.save(booking, function(err, savedBooking){
			if(err){
				res.send(err);
			}
			res.json(savedBooking);
		});	
	}
});

module.exports = router;
