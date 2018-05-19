var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/temperature_x_year';
var express = require('express');
var dbo;
app = express();

port = process.env.PORT || 3000;
var mongodb;

var result = [];
app.route('/temperature_x_year').get(function(req, res) {
		console.log("Consultando temperaturas: ");
		dbo = mongodb.db("temperature_x_year");
		dbo.collection("temperature").find({},{"_id": "0" }).toArray( function(err, temp) {
			if (err) res.send(err);
			console.log("resultado: "+ temp);
			res.header('Access-Control-Allow-Origin', '*');
			  res.header('Access-Control-Allow-Credentials', true);
			  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
			  res.header('Access-Control-Allow-Headers', 'Content-Type');
			res.contentType('application/json');
			res.send(JSON.stringify(temp));
			res.end();
		});
	}
);

app.route('/temperature_x_year_month').get(function(req, res) {
		console.log("Consultando temperaturas por meses: ");
		dbo = mongodb.db("temperature_x_year_month");
		dbo.collection("temperature").find({},{"_id": "0" }).toArray( function(err, temp) {
			if (err) res.send(err);
			console.log("resultado: "+ temp);
			
			res.contentType('application/json');
			res.send(JSON.stringify(temp));
			res.end();
		});
	}
);

app.route('/temperature_x_year_month_day').get(function(req, res) {
		console.log("Consultando temperaturas por día: ");
		dbo = mongodb.db("temperature_x_year_month_day");
		dbo.collection("temperature").find({},{"_id": "0" }).toArray( function(err, temp) {
			if (err) res.send(err);
			console.log("resultado: "+ temp);
			 res.header('Access-Control-Allow-Origin', '*');
			  res.header('Access-Control-Allow-Credentials', true);
			  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
			  res.header('Access-Control-Allow-Headers', 'Content-Type');
			res.contentType('application/json');
			res.send(JSON.stringify(temp));
			res.end();
		});
	}
);


MongoClient.connect(url, function(err, db) {
	console.log("conectando a mongodb  "+ db);
	mongodb = db;
	
}); 


app.listen(port);	

console.log('todo list RESTful API server started on: ' + port);
	

	

