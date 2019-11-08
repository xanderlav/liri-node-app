// Global variables definition

var dotenv = require("dotenv").config();
var keys = require("./keys");
var inquire = require("inquirer");

var spotify = new spotify(keys.spotify);

