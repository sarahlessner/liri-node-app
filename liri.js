
var fs = require("fs");
var keys = require("./keys.js");

var myTwitterKeys = keys.twitterKeys;
var mySpotifyKeys = keys.spotifyKeys;

//get user command
var selection = process.argv[2];
//get query to search (if applicable - for spotify and movie search)
var userQuery = process.argv.slice(3).toString().split(',').join(' ');

//function for liri
liri(selection);
function liri(command) {
	//write selection & userQuery variables to log.txt here
	logData(selection+": "+userQuery+'\n');

	//if selection = my-tweets, etc
	if (command === 'my-tweets') {
		//code from twitter npm
		var Twitter = require('twitter');
 		//twitter keys
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
				//loop through the 20 tweets returned
			  	for (var i = 0; i < tweets.length; i++){
			  		//display only when tweet was created and text of tweet
				    var myTweets = (tweets[i].created_at+" "+tweets[i].text+'\n');
					//display tweets to console and call function to log them to log.txt
					console.log(myTweets);
					logData(myTweets);
				}
			} else
				console.log(error);
		});
	} else if (command === 'spotify-this-song') {
		//code to search spotify from npm
		var Spotify = require('node-spotify-api');
 		//spotify keys
		var spotify = new Spotify({
		  id: mySpotifyKeys.id,
		  secret: mySpotifyKeys.secret
		});

		//if the user didn't enter a song title, set it to 'the sign'
		if (userQuery === '')  {
			userQuery = 'the sign';
		}
		//search spotify by track using info from command
		spotify.search({ type: 'track', query: userQuery}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
			}
			//loop through track data returned from API
			for (var i = 0; i < data.tracks.items.length; i++) {
				var trackInfo = data.tracks.items[i];
				if ((userQuery === 'the sign') && (trackInfo.artists[0].name !== 'Ace of Base')) {
					//do nothing - want to prevent matches from artists that are not ace of base
				}
				else {
					//store track info from search
					var artist = ("Artist: "+trackInfo.artists[0].name);
					var song = ("Song Name: "+trackInfo.name);
					var preview = ("Preview Song: "+trackInfo.preview_url);
					var album = ("Album: "+trackInfo.album.name);
					//variable for logging data to console and log.txt
					var songLog = (artist+'\n'+song+'\n'+preview+'\n'+album+'\n'+'---'+'\n');
					//display to console and call function to log to log.txt
					console.log(songLog);
					logData(songLog);
				}
			}
		});

	} else if (command === 'movie-this') {

		var omdbUrl = "http://www.omdbapi.com/?&t="+userQuery+"&apikey=40e9cece";
		//code from request npm to access omdb API
		var request = require('request');
			request(omdbUrl, function (error, response, body) {
				console.log('error:', error); // Print the error if one occurred
			  //store relevant movie info returned from search
				var movieInfo = JSON.parse(body);
				var title = ("Title: "+movieInfo.Title);
				var year = ("Year: "+movieInfo.Year);
				var imdb = ("IMDB Rating: "+movieInfo.Ratings[0].Value);
				var rotten = ("Rotten Tomatoes Rating: "+movieInfo.Ratings[1].Value);
				var country = ("Country: "+movieInfo.Country);
				var language = ("Language: "+movieInfo.Language);
				var plot = ("Plot: "+movieInfo.Plot);
				var actors = ("Actors: "+movieInfo.Actors);
				//store log of movie data for console and text
				var movieLog = (title+'\n'+year+'\n'+imdb+'\n' +rotten+'\n'+country+'\n'+
					language+'\n'+plot+'\n'+actors+'\n'+'---'+'\n');
				//display to console and call function to log to log.txt
				console.log(movieLog);
				logData(movieLog);
			});

	  //runs pre written command from text file
	} else if (command === 'do-what-it-says') {
		//reads command from text file to run spotify search
		fs.readFile("random.txt", "utf8", function(error, data) {
			if (error) {
			return console.log(error);
			}

		console.log(data);
		var dataArray = data.split(",");
		//store song to search from the file
		userQuery = dataArray[1];
			//command 'spotify-this-song' from text file passed to execute liri function
			liri(dataArray[0]);

		});
	} else {
		console.log("invalid search");
		logData("invalid search"+'\n');
	};

};
//function to append data to log.txt
function logData(x) {
	fs.appendFile("log.txt",x, function(err) {
		if (err) {
			return console.log(err);
			}
		});
}
