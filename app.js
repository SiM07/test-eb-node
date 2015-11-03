var express = require('express');
var app = express();
var request = require('request');
var cheerio = require("cheerio");
var shortid = require('shortid');

app.get('/', function (req, res) {
  id = shortid.generate();
  res.redirect('/20minutes/' + id);  
});

app.get('/20minutes/:id', function (req, res) {
  request("http://www.20minutes.fr/sport/football/1722139-20151102-ligue-champions-madrid-raphael-varane-enfin-trouve-place", function(error, response, body) {
    if (!error && response.statusCode == 200) {
       var $ = cheerio.load(body);
       $('#xiti-logo').before('<style>.hallotoolbar { z-index:999 }</style><link type="text/css" href="/jquery-ui/themes/base/jquery-ui.css" rel="stylesheet" /><link rel="stylesheet" href="/font-awesome/css/font-awesome.min.css"><script type="text/javascript" src="/jquery/jquery.min.js"></script><script type="text/javascript" src="/jquery-ui/ui/minified/jquery-ui.min.js"></script><script type="text/javascript" src="/rangy-official/rangy-core.js"></script><script type="text/javascript" src="/hallo/dist/hallo.js"></script><script type="text/javascript" src="/editor.js"></script>');

       res.send($.html()+'</html>');
    } else {
       res.send("Error" + response.statusCode);
    }
  });
});

app.use(express.static('public'));
app.use(express.static('bower_components'));

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


