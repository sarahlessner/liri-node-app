//code to get data from keys.js
var keys = require("./keys.js");

// console.log(keys);
var myTwitterKeys = keys.twitterKeys;
// console.log(myTwitterKeys);
var mySpotifyKeys = keys.spotifyKeys;

//get user command
var selection = process.argv;
var userQuery = selection.slice(3).toString().split(',').join(' ');
console.log(userQuery);

//function for liri
liri(selection[2]);
function liri(command) {

	if (command === 'my-tweets') {
		//code from twitter npm
		var Twitter = require('twitter');
 
		var client = new Twitter({
		  consumer_key: myTwitterKeys.consumer_key,
		  consumer_secret: myTwitterKeys.consumer_secret,
		  access_token_key: myTwitterKeys.access_token_key,
		  access_token_secret: myTwitterKeys.access_token_secret
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
		  id: mySpotifyKeys.id,
		  secret: mySpotifyKeys.secret
		});

		//if the user didn't enter a song title, set it to 'the sign'
		if (userQuery === '')  {
			userQuery = 'the sign';
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

		// var userQuery = process.argv.slice(3).toString().split(',').join(' ');

		var omdbUrl = "http://www.omdbapi.com/?&t="+userQuery+"&apikey=40e9cece";

		var request = require('request');
			request(omdbUrl, function (error, response, body) {
			  console.log('error:', error); // Print the error if one occurred 
			  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
			  // console.log('body:', JSON.parse(body)); 
			  var movieInfo = JSON.parse(body);
			  console.log("Title: "+movieInfo.Title);
			  console.log("Year: "+movieInfo.Year);
			  console.log("IMDB Rating: "+movieInfo.Ratings[0].Value);
			  console.log("Rotten Tomatoes Rating: "+movieInfo.Ratings[1].Value);
			  console.log("Country: "+movieInfo.Country);
			  console.log("Language: "+movieInfo.Language);
			  console.log("Plot: "+movieInfo.Plot);
			  console.log("Actors: "+movieInfo.Actors);
			});
		
	} else if (command === 'do-what-it-says') {
		
		var fs = require("fs");

		fs.readFile("random.txt", "utf8", function(error, data) {
			if (error) {
			return console.log(error);
			}
		console.log(data);
		var dataArray = data.split(",");
		userQuery = dataArray[1];
		console.log(dataArray);
		console.log(userQuery);
			liri(dataArray[0]);

		});
	};

}



