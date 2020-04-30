/*
 * breedUpload.js
 * Author: Emil Polakiewicz
 * Date: Spring 2020
 * 
 * Purpose: Reads a csv and inserts contents into a mongodb database 
*/

//Set up mongodb
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dog_webpage:tygrUg-fenrac-qibby3@cluster0-ug0jz.mongodb.net/test?retryWrites=true&w=majority";

//Connect to our database
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("final_project");

    //Read csv file and convert to json object
    var csv = require('csvtojson')
    var tojson = csv()
        .fromFile('./dogBreeds.csv')
        .then((json) => {
            //Insert json object into database
            dbo.collection("dogBreeds").insertMany(json, function (err, res) {
                if (err) throw err;
                db.close();
            });
        })
});