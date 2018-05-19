var MongoClient = require('mongodb').MongoClient;
var Kafka   = require('no-kafka');
var consumer = new Kafka.SimpleConsumer();

var url = 'mongodb://localhost:27017/temperature';

var dbmongo;

MongoClient.connect(url, function(err, db) {
	console.log("conectando a mongodb  "+ db);
	dbmongo = db;
}); 

var dataHandler = function (messageSet, topic, partition) {
    messageSet.forEach(function (m) {
        console.log("insert to mongo: " + m.message.value.toString('utf8') + " from topic " + topic);
		var data = JSON.parse(m.message.value.toString('utf8'));
		data.date = new Date(data.date);
		var dbo = dbmongo.db("temperature");
//		console.log(data);
		dbo.collection('temperature').insertOne(data);
		console.log("inserted data : "+ data);
		//aqui inserta en la mongo
		
    });
};

return consumer.init().then(function () {
	return consumer.subscribe('temperature', dataHandler);
});



