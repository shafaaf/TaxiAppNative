var express    = require('express');        
var app        = express();               
var bodyParser = require('body-parser');
var test = require("./routes/bookings");

// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

//Test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/api2', test);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

