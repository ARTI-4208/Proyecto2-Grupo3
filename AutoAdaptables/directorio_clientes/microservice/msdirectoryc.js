var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
        amqp           = require('amqplib/callback_api'),
        mysql = require('mysql');

var oMyConnection = mysql.createConnection({
   host: process.env.DATABASE_HOST || '127.0.0.1',
   user: 'root',
   password: '123',
   database: 'directoryc',
   port: 3306
});

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

// API routers
var datos = express.Router();

//Service to send list
datos.get('/msdirectoryc', function(req, res) {
        amqp.connect('amqp://test:test@' + process.env.API_QUEUE + ':5672', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var q = 'msdirectoryc';
            ch.assertQueue(q, {durable: false});
                        var sSQLGetAll = "SELECT * FROM directory";
                        oMyConnection.query(sSQLGetAll, function(oError, oRows, oCols) {
                         if(oError) {
                           res.write(JSON.stringify({
                                 error_object: oError
                           }));
                           res.end();
                         } else {
                                res.write(JSON.stringify(oRows));/*
                                        ch.sendToQueue(q, new Buffer(JSON.stringify(oRows)));
                                        console.log(" [x] Sent " + oRows);*/
                                res.end();
                         }
                        });
        });
    });
});

//Service to send client
datos.get('/msdirectoryc/:message', function(req, res) {
        amqp.connect('amqp://test:test@' + process.env.API_QUEUE + ':5672', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var q = 'msdirectoryc';
            ch.assertQueue(q, {durable: false});
                        var sSQLRead = "SELECT * FROM directory WHERE id =?";
                        oMyConnection.query(sSQLRead, [req.params.message], function(oError, oRows, oCols) {
                         if(oError) {
                           res.write(JSON.stringify({
                                 error_object: oError
                           }));
                           res.end();
                         } else {
                                res.write(JSON.stringify(oRows));
                                        ch.sendToQueue(q, new Buffer(JSON.stringify(oRows)));
                                        console.log(" [x] Sent " + oRows);
                                        /*res.send({
                                                version: 1,
                                                mensaje: "Microservice sent: " + oRows,//req.params.message,
                                                success: true
                                        });*/
                                res.end();
                         }
                        });
        });
    });
});

//Service to send command update
datos.get('/msdirectorycpu', function(req, res) {
        amqp.connect('amqp://test:test@' + process.env.API_QUEUE + ':5672', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var q = 'msdirectoryc';
            ch.assertQueue(q, {durable: false});
						var sSQLUpdate = "UPDATE directory SET last_updated = NOW() ";
						if(req.params.hasOwnProperty('nombre')) {
								sSQLUpdate += " AND nombre = '" + req.params.nombre + "' ";
						}
						if(req.params.hasOwnProperty('telefono')) {
								sSQLUpdate += " AND telefono = " + req.params.telefono + " ";
						}
						if(req.params.hasOwnProperty('direccion')) {
								sSQLUpdate += " AND direccion = '" + req.params.direccion + "' ";
						}
						if(req.params.hasOwnProperty('correo')) {
								sSQLUpdate += " AND correo = '" + req.params.correo + "' ";
						}
						sSQLUpdate = " WHERE id = " + req.params.id;
						oMyConnection.query(sSQLUpdate, function(oErrUpdate, oRowsUpdate, oColsUpdate) {
								if(oErrUpdate) {
										res.write(JSON.stringify({
												error: true,
												error_object: oErrUpdate
										}));
								  res.end();
								} else {
										res.write(JSON.stringify(oRowsUpdate));
                                        ch.sendToQueue(q, new Buffer(JSON.stringify(oRowsUpdate)));
                                        console.log(" [x] Sent " + oRowsUpdate);
										res.end();
								}
						});
        });
    });
});

//Service to send command insert
datos.get('/msdirectorycpi', function(req, res) {
        amqp.connect('amqp://test:test@' + process.env.API_QUEUE + ':5672', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var q = 'msdirectoryc';
            ch.assertQueue(q, {durable: false});
					  var sSQLCreate = "INSERT INTO directory (id, nombre, telefono, direccion, correo, last_update) VALUES (";
					  sSQLCreate += req.params.id + ", ";
					  sSQLCreate += "'" + req.params.nombre + "', ";
					  sSQLCreate += req.params.telefono + ", ";
					  sSQLCreate += "'" + req.params.direccion + "', ";
					  sSQLCreate += "'" + req.params.correo + "', ";
					  sSQLCreate += "NOW())";
					  oMyConnection.query(sSQLCreate, function(oError, oRows, oCols) {
						if(oError) {
						  res.write(JSON.stringify({
							error: true,
							error_object: oError
						  }));
						  res.end();
						} else {
							res.write(JSON.stringify(oRows.insertId));
							ch.sendToQueue(q, new Buffer(JSON.stringify(oRows.insertId)));
							console.log(" [x] Sent " + oRows.insertId);
							res.end();
						}
					  });
        });
    });
});

//Service to send command delete
datos.get('/msdirectorycpd/:message', function(req, res) {
        amqp.connect('amqp://test:test@' + process.env.API_QUEUE + ':5672', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var q = 'msdirectoryc';
            ch.assertQueue(q, {durable: false});
					  var sSQLDelete = "DELETE FROM directory WHERE id =?";
					  oMyConnection.query(sSQLDelete, [req.params.message], function(oErrDelete, oRowsDelete, oColsDelete) {
						if(oErrDelete) {
						  res.write(JSON.stringify({
							error: true,
							error_object: oErrDelete
						  }));
						  res.end();
						} else {
						  res.write(JSON.stringify(oRowsDelete));
							ch.sendToQueue(q, new Buffer(JSON.stringify(oRowsDelete)));
							console.log(" [x] Sent " + oRowsDelete);
						  res.end();
						}
					  });
        });
    });
});

app.use('/', datos);

// Start Server
app.listen(3096, function(){
        console.log("Server running on http://localhost:3096");
});
