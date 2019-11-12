// My Siri like application global vars
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var request = require("request");
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");
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

        case 'Do What it says: ':
            doIt();
            break;

        case 'default':
            console.log(` No selection was made `);
            break;
    }
});

// Execution function in order to get info desired
function concert_this(arg){
    qryURL = "https://rest.bandsintown.com/artist/" + arg + "/events?app_id=codingbootcamp";
        axios.get(qryURL).then( function(response) {
            console.log(response);
            console.log(` Name: ${response.data[0].venue.name} \r\n ` );
            console.log(` Location: ${response.data[0].venue.city} \r\n `);
            console.log(` Date: ` + moment(response.data[0].datetime).format("DD/MM/YYYY") + "\r\n");
    }).catch((error) => {
        console.log(error, 'Promise error');
    })
};

function spotify_this(arg){
    var spotify = new Spotify(keys.spotify);
    // Default value
    if(!arg) { arg = "The Sign"; } 
    
    // Execute API according to arguments sent
    spotify.search({ type: 'track', query: arg}, function (err, data) {
        if(err){
            return console.log("An error happens " + err);
        }
        var spotifyArr = data.tracks.items;

        // Read each result in the query returned & show them 
        for (var i = 0; i < spotifyArr.length; i++ ){
            console.log(` <<<<< Here's your result # ${i + 1} : >>>>>` + "\n");
            console.log(` Artist: ${data.tracks.items[i].album.artists[0].name}`);
            console.log(` Album: ${data.tracks.items[i].album.name}`);
            console.log(` Song: ${data.tracks.items[i].name}`);
            console.log(` Spotify Link: ${data.tracks.items[i].external_urls.spotify}` + "\n");
        }
    });
};

// Gets movie information according to user's input
function movie_this(arg){
    // Default value
    if(!arg){ arg = "Mr. Nobody"; }

    // Executes OMDb API according to argument sent
    qryURL = "http://www.omdbapi.com/?t=" + arg + "&apikey=trilogy&plot=short&tomatoes=true";
    request(qryURL, function(error, response, body){
        if(!error && response.statusCode == 200){
            var jsonData = JSON.parse(body);
            // Gets movie's info and show it 
            console.log("\n" + ` *-*-*-*-*- MOVIE'S INFORMATION -*-*-*-*-* ` + "\n");
            console.log(` Title:  ${jsonData.Title} ` + "\n");
            console.log(` Year : ${jsonData.Year} ` + "\n");
            console.log(` IMBD rating : ${jsonData.imdbRating} ` + "\n");
            console.log(` Rotten tomatoes rating : ${jsonData.tomatoRating}` + "\n");
            console.log(` Country : ${jsonData.Country}` + "\n");
            console.log(` Language : ${jsonData.Language}` + "\n");
            console.log(` Plot : ${jsonData.Plot}` + "\n");
            console.log(` Cast : ${jsonData.Actors}` + "\n");
            console.log(` *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* ` + "\n");
        }else{
            console.log("Error : " + error.message);
        }
    })
}

// Final function to handle other activities
function doIt(){
    // Read text file and executes activity
    fs.readFile("random.txt", "utf8", function(error, data){
        let fileArr = data.split(",");
        if(fileArr[0] === "spotify-this-song"){
            spotify_this(fileArr[1]);
        }
    });
};