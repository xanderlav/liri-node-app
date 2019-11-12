// My Siri like application global vars
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var request = require("request");
var qryURL = "";

// This prompt ask for an user option
inquirer
.prompt([
    {
        type: "list",
        message: "Select a fun activity!",
        choices: ["Concert: ", "Spotify this song: ", "Movie-this: ", "Do What it says: "],
        name: "usrOpt"
    },
    {
        type: "activity",
        message: "So, what do you want I search for: ",
        name: "usrSerch"
    }
]).then(function(resp){
    switch (resp.usrOpt){
        case 'Concert: ':
            concert_this(resp.usrSerch);
            break;
        case 'Spotify this song: ':
            spotify_this(resp.usrSerch);
            break;
        case 'Movie-this: ':
            movie_this(resp.usrSerch);
            break;
        case 'Do what it says: ':
            console.log(` Your option was: ${resp.usrOpt}`);
            break;
        case 'default':
            console.log(` No selection was made `);
            break;
    }
});

// Execution function in order to get info desired

function concert_this(arg){
    qryURL = "https://rest.bandsintown.com/artist/" + arg + "/events?app_id=codingbootcamp";
    console.log(qryURL);
}

function spotify_this(arg){
    var spotify = new Spotify(keys.spotify);
    console.log(keys.spotify);
    spotify.search({type: 'track', query: arg}, function(err, data){
        if(err){
            return console.log("An error happens " + err);
        }
        var myTrack = data.tracks.items[5];
        var mySong = "Song title: " + arg + "\r\n" + 
                     "Artist: " + myTrack.artist[0].name + "\r\n" +
                     "Album: " + myTrack.album + "\r\n" +
                     "Link: " + myTrack.preview.url + "\r\n";
        console.log(mySong);
    });
}

function movie_this(arg){
    qryURL = "http://www.omdbapi.com/?t=" + arg + "&apikey=trilogy&plot=short&tomatoes=true";
    request(qryURL, function(error, response, body){
        if(!error && response.statusCode == 200){
            var jsonData = JSON.parse(body);
            // console.log(jsonData);
            console.log(` *--------- MOVIE'S INFORMATION ---------* ` + "\n");
            console.log(` Title:  ${jsonData.Title} ` + "\n");
            console.log(` Year : ${jsonData.Year} ` + "\n");
            console.log(` IMBD rating : ${jsonData.imdbRating} ` + "\n");
            console.log(` Rotten tomatoes rating : ${jsonData.tomatoRating}` + "\n");
            console.log(` Country : ${jsonData.Country}` + "\n");
            console.log(` Language : ${jsonData.Language}` + "\n");
            console.log(` Plot : ${jsonData.Plot}` + "\n");
            console.log(` Cast : ${jsonData.Actors}` + "\n");
            console.log(` *---------------------------------------* ` + "\n");
        }else{
            console.log("Error : " + error.message);
        }
    })
}