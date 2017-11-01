var express    = require('express');        
var app        = express();               
var bodyParser = require('body-parser');
var bookings = require("./routes/bookings");

// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// Routes for API
app.use('/api', bookings);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
