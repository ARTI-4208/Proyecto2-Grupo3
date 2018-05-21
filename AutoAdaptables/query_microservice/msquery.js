var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
	Datastore      = require('nedb'),
    db             = new Datastore({filename: '/home/messages.db', autoload: true}),
	amqp           = require('amqplib/callback_api');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(allowCrossDomain);

//Connect to queue message
amqp.connect('amqp://test:test@' + process.env.API_QUEUE + ':5672', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'test';
    ch.assertQueue(q, {durable: false});
    ch.consume(q, function(msg) {		
		//message 
        db.insert({
            "message":  msg.content.toString()
        });	  
    }, {noAck: true});
      
	console.log("Connection succesful");
 });
});


// API routers
var recurso = express.Router();
recurso.get('/msquery', function(req, res) {	
	db.find({}, function (err, docs) {
        res.send({
            status: 200,
            mensaje: docs
        });
    });
});

app.use('/', recurso);

// Start Server
app.listen(3022, function(){
	console.log("Server running on http://localhost:3022");
});