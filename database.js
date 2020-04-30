/*
 * database.js
 * Author: Emil Polakiewicz
 * Date: Spring 2020
 *
 * Purpose: Search a mongodb database for dog breeds to match users preferences
*/

var http = require('http');
var url = require('url');
var alg = require("./algorithm");
var port = process.env.PORT || 3000;

http.createServer(function (req, res) {
    //Parse the server request
    var q = url.parse(req.url, true).query;
    var attribute = q.att;

    var MongoClient = require('mongodb').MongoClient;
    var mongourl = "mongodb+srv://dog_webpage:tygrUg-fenrac-qibby3@cluster0-ug0jz.mongodb.net/test?retryWrites=true&w=majority";
    console.log("Not yet in db")

    //Connect to our database
    MongoClient.connect(mongourl, function (err, db) {
        if (err) throw err;
        console.log("in db")
        var dbo = db.db("final_project");

        
        // Queries database using most important attribute
        var query = { };
        query[attribute] = q[attribute]
        dbo.collection("dogBreeds").find(query).toArray(function (err, result) {
            if (err) throw err;
            // if no dog breeds are found
            if (result.length == 0) {
                res.writeHead(301, { Location: 'https://epolak01.github.io/comp20_final_test/result.html?dog=none'});
                return res.end()
            } else {
                // calculate scores for each breed
                res.writeHead(301, { Location: 'https://epolak01.github.io/comp20_final_test/result.html?dog=' +
                alg.dog_rating(JSON.stringify(q), JSON.stringify(result))});
                return res.end()
            }
        });
    });
}).listen(port);
