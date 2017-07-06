//code to get data from keys.js

var keys = require("./keys.js");

console.log(keys);
var myKeys = keys.twitterKeys;

//get user command
var command = process.argv[2];

if (command === 'my-tweets') {

	var twitterUrl = "";

	request(twitterUrl, function(error, response, body){
		// If the request is successful
		if(!error && response.statusCode === 200) {
		//log last 20 tweets

		}

	});

} else if (command === 'spotify-this-song') {

	var spotifyUrl = "";

	request(spotifyUrl, function(error, response, body){
		// If the request is successful
		if(!error && response.statusCode === 200) {
		//log artist, song name, preview link, album song is from

		//if no song entered default to 'the sign' by ace of base

		}
	});

} else if (command === 'movie-this') {

	var omdbUrl = "";

	request(omdbUrl, function(error, response, body){
		// If the request is successful
		if(!error && response.statusCode === 200) {

		// Title, IMDB, Rotten Tomatoes Rating, Country produced, language, plot, actors

		// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

		}
	});
	
} else if (command === 'do-what-it-says') {
	
	var fs = require("fs");

	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
		return console.log(error);
		}
	console.log(data);
	});
};

