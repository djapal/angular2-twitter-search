var request = require('request')
var express = require('express');

var app = express();

function constructOptions(query) {
    return {
        method: 'get',
        body: '',
        encoding: 'utf-8',
        json: true,
        url: 'https://api.twitter.com/1.1/search/tweets.json',
        headers : {
            'Authorization': 'Bearer YOUR_GENERATED_BEARER',
            'Content-Type':  'application/x-www-form-urlencoded;charset=UTF-8'
        },
        qs: {
            'f': 'tweets',
            'vertical': 'default',
            'q': query,
            'result_type': 'recent',
            'count': 50
        }
    }
};

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/tweets/:q', function (req, res) {
    res.header("Content-Type", "application/json; charset=utf-8");
    request(constructOptions(req.params.q), function(error, response, body) {
        if (error) {
            res.end(error);
        }
        res.end(JSON.stringify(body));
    });
});


var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Twitter proxy listening at http://%s:%s", host, port)

})
