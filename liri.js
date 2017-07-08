//code to get data from keys.js
var keys = require("./keys.js");

// console.log(keys);
var myKeys = keys.twitterKeys;
// console.log(myKeys);

//get user command
var command = process.argv[2];

//function for liri
liri(command);
function liri(command) {

	if (command === 'my-tweets') {
		//code from twitter npm
		var Twitter = require('twitter');
 
		var client = new Twitter({
		  consumer_key: myKeys.consumer_key,
		  consumer_secret: myKeys.consumer_secret,
		  access_token_key: myKeys.access_token_key,
		  access_token_secret: myKeys.access_token_secret
		});
		 
		var params = {
			screen_name: 'Iwant5puppies', 
			count: 20
		};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	for (var i = 0; i < tweets.length; i++){
		    console.log(tweets[i].created_at+" "+tweets[i].text);
			}
		  }
		  else
		  	console.log(error);
		});
	} else if (command === 'spotify-this-song') {

		var Spotify = require('node-spotify-api');
 
		var spotify = new Spotify({
		  id: '959b9284a5214f33b6ebeafe3ad37ffc',
		  secret: '45088183ac0c4f3b90f9bc3d82d87568'
		});

		var userQuery = process.argv;
		//if the user didn't enter a song title, set it to 'the sign'
		if (userQuery.length < 4) {
			userQuery = 'the sign';

		} else {
			userQuery = userQuery.slice(3).toString().split(',').join(' ');
		}

		spotify.search({ type: 'track', query: userQuery}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
			}

			for (var i = 0; i < data.tracks.items.length; i++) {
				var trackInfo = data.tracks.items[i];
				if ((userQuery === 'the sign') && (trackInfo.artists[0].name !== 'Ace of Base')) {
					//do nothing - want to prevent matches from artists that are not ace of base
				} 
				else {
					console.log("Artist: "+trackInfo.artists[0].name);
					console.log("Song Name: "+trackInfo.name);
					console.log("Preview Song: "+trackInfo.preview_url);
					console.log("Album: "+trackInfo.album.name);
					console.log("_____________________________________");
				}

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
			// liri(data[0]);

		});
	};

}



