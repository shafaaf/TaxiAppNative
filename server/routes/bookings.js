// var express = require("express");
// var router = express.Router();
// var mongojs = require("mongojs");

// var db = mongojs("mongodb://shafaaf0:password@ds241875.mlab.com:41875/taxiappnative", ["bookings"]);

// router.get("/bookings", function(req, res, next){
// 	db.bookings.find(function(err, bookings){
// 		if(err){
// 			res.send(err);
// 		}
// 		res.json(bookings);
// 	})
// }); 

// module.exports = router;

var express = require("express");
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'test works' });   
});

module.exports = router;
