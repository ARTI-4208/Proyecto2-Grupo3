var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/temperature';

var dbmongo;
var dbo;

MongoClient.connect(url, function(err, db) {
	console.log("conectando a mongodb  "+ db);
	dbmongo = db;
	dbo = dbmongo.db("temperature");
	dataHandler();
}); 

var dataHandler = function () {
	var dbo2 = dbmongo.db("temperature_x_year_month");
	
	dbo2.collection("temperature").remove({},function(err,numberRemoved){
		console.log("inside remove call back" + numberRemoved);
		
		var query = [{"$group": {"_id":{year: {$year: "$date"}, month:{$month:"$date"}}, "avg" : {"$avg" : "$value"}, "max" : {"$max" : "$value"}, "min" : {"$min" : "$value"}}}, {"$sort": {"_id.year":1,"_id.month":1} }];
	
		dbo.collection("temperature").aggregate(query).toArray(function(err, result) {
		if (err) throw err;
		
		result.forEach(function (m) {
			console.log(m);
			var data = {year:m._id.year, month:m._id.month, avg: m.avg, max: m.max, min:m.min};
			dbo2.collection('temperature').insertOne(data);
		});
		
		dbmongo.close();
		});	
	});
};
