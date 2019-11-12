// My Siri like application
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");

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
            console.log(`opcion fue ${resp.usrOpt}`);
        break;
        case 'Spotify this song: ':
                console.log(`opcion fue ${resp.usrOpt}`);
            break;
        case 'default':
                console.log(`No seleccionó nada`);
            break;
    }
})