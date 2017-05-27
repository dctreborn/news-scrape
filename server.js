//npm tools
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

mongoose.Promise = Promise;

var app = express();

//handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

//mongoose bd config
mongoose.connect("mongodb://heroku_gd74mtjd:llgqohpn2pqd8dh4dbc4qrg63e@ds155811.mlab.com:55811/heroku_gd74mtjd");
var db = mongoose.connection;

//show mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

//routes
require("./routes/api-routes.js")(app);

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});