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
    var value = q.val

    var MongoClient = require('mongodb').MongoClient;
    var mongourl = "mongodb+srv://dog_webpage:tygrUg-fenrac-qibby3@cluster0-ug0jz.mongodb.net/test?retryWrites=true&w=majority";
    //console.log("Not yet in db")

    //Connect to our database
    MongoClient.connect(mongourl, function (err, db) {
        if (err) throw err;
        //console.log("in db")
        var dbo = db.db("final_project");

        if (q.val == "idc") {
            dbo.collection("dogBreeds").find().toArray(function (err, result) {
                if (err) throw err;
                //console.log("in query")
                //console.log(result.length);
                if (result.length == 0) {
                    res.writeHead(301, { Location: 'https://epolak01.github.io/comp20_final_test/result.html?dog=none' });
                    //res.write("No Dog Breeds Found")
                    return res.end()
                } else {
                    // calculate scores for each breed
                    dog = JSON.parse(alg.dog_rating(JSON.stringify(q), JSON.stringify(result)))
                    res.writeHead(301, {
                        Location: 'https://epolak01.github.io/comp20_final_test/result.html?dog=' +
                            dog.name + '&desc=' + dog.description
                    });
                    return res.end()

                }
            });
        } else {
            var query = { };
            query[attribute] = value
            //var query = {attribute : value};
            //console.log(query)
            dbo.collection("dogBreeds").find(query).toArray(function (err, result) {
                if (err) throw err;
            //console.log("in query")
            //console.log(result.length);
                if (result.length == 0) {
                    res.writeHead(301, { Location: 'https://epolak01.github.io/comp20_final_test/result.html?dog=none'});
                //res.write("No Dog Breeds Found")
                    return res.end()
                } else {
                // calculate scores for each breed
                    dog = JSON.parse(alg.dog_rating(JSON.stringify(q), JSON.stringify(result)))
                    res.writeHead(301, { Location: 'https://epolak01.github.io/comp20_final_test/result.html?dog=' +
                        dog.name + '&desc=' + dog.description});
                    return res.end()

                }
            });
        }
    });
}).listen(port);