// server.js

// BASE SETUP
// =============================================================================

var Bear = require('./app/models/bear');

// db connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); // connect to our database

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware for all requests
router.use(function (req, res, next) {
    // log some shit
    console.log('SOMETHING IS HAPPENING');
    next(); // make sure we continue onto the next routes
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to ze api!'});
});

// more routes for our API will happen here

// on on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')
// create a bear (POST http://localhost:8080/api/bears)
    .post(function (req, res) {
        var bear = new Bear(); // init a bear
        bear.name = req.body.name; // set bear's name
        // save bear, error check
        bear.save(function (err) {
            if (err)
                res.send(err);


            res.json({message: 'Bear created!'});
        });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function (req, res) {
        Bear.find(function (err, bears) {
            if (err)
                res.send(err);


            res.json(bears);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
