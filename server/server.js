var path = require("path");
var express    = require('express');        
var app        = express();               
var bodyParser = require('body-parser');
var socket_io = require("socket.io");

var index = require("./routes/index");
var bookings = require("./routes/bookings");
var driverLocations = require("./routes/driverLocations");

// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views",  path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

var port = process.env.PORT || 8080;        // set our port
var io = socket_io();

// Routes for APIs
app.use("/", index);
app.use('/api', bookings);
app.use('/api', driverLocations);


io.on('connection', function(socket){
  console.log('a user connected. socket.id is: ', socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// START THE SERVER
// =============================================================================
io.listen(app.listen(port, function(){
	console.log("Server running on port", port);
}));
