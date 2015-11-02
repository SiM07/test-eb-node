var express = require('express');
var app = express();
var request = require('request');

app.get('/', function (req, res) {
	  res.send('Hello World! YEAH !');
});

app.get('/20minutes', function (req, res) {
  request("http://www.20minutes.fr/", function(error, response, body) {
    if (!error && response.statusCode == 200) {
       res.send(body);
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


