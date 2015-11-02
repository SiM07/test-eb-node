var express = require('express');
var app = express();
var request = require('request');
var cheerio = require("cheerio");

app.get('/', function (req, res) {
	  res.send('Hello World! YEAH !');
});

app.get('/20minutes', function (req, res) {
  request("http://www.20minutes.fr/sport/football/1722139-20151102-ligue-champions-madrid-raphael-varane-enfin-trouve-place", function(error, response, body) {
    if (!error && response.statusCode == 200) {
       var $ = cheerio.load(body);
       $('#xiti-logo').before('<script>alert("Random number ' + Math.floor((Math.random() * 100) + 1) + '")</script>');
       res.send($.html()+'</html>');
    } else {
       res.send("Error" + response.statusCode);
    }
  });
});

app.use(express.static('public'));

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


