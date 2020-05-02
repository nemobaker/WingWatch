var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var $ = require("jquery");
var app = express(); //we can use functions from express module!!
//connect to mongo db named myFlights
mongoose.connect('mongodb://localhost/myFlights');

var db = mongoose.connection;

var myFlightsSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: String,
    price: String
});
			
var Flights = mongoose.model('Flights', myFlightsSchema);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

	app.use(express.static(__dirname + '/public'));
		//look for static files (html/js/image)
		//look in the public folder
	app.use(bodyParser.json());

	app.get('/myFlights', function(req,res){
		Flights.find(function (err, flights) {
			if (err) return console.error('TRY AGAIN WHOMP!',err);
			// console.log('here are the flights buddy boy',flights);
			res.json(flights);
		});
	});

	app.post('/myFlights', function(req,res){
		db.collection('flights').insert(req.body);
	});


	app.delete('/myFlights/:id', function (req, res) {
		var id = req.params.id
		var idToDelete = 'ObjectId'

		Flights.find({
			"_id": id
		}).remove(function(err){
			if(err){
				console.log(err);
			} else {
				console.log('success!');
				res.end();
			}
		});




	});

});

app.listen(3000);
console.log('server running on port 3000');
