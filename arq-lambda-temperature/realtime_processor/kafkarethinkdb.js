var io = require('socket.io-client');
var r = require('rethinkdb')
var Kafka   = require('no-kafka');
var consumer = new Kafka.SimpleConsumer();
var socket = io.connect('http://localhost:3000', {reconnect: true});
var conne;

socket.on('connect', function (socket) {
	console.log('Connected!');
	
});


r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  if(err) throw err;
  conne = conn;
  //retirar comentario de las siguientes lines solo ´para crear la base de datos y tabla, luego volver a comentar
  /*
  r.db('test').tableCreate('temperature').run(conn, function(err, res) {
    if(err) throw err;
    console.log(res);
    r.table('temperature').insert({ device_id : '1', date: new Date().getTime(), value: '44.09090'}).run(conn, function(err, res)
    {
      if(err) throw err;
      console.log(res);
    });
  });
  */
  
  
  r.db('test');
  
  r.table('temperature').changes().run(conn, function(err, cursor) {
	  cursor.each(function(err, row) {
        if (err) throw err;
        console.log(row);
		//JSON.parse(JSON.stringify(row, null, 2) //solo usar cuando no este reconociendo el resultado como objeto JSON
		var data = {deviceid:row.new_val.device_id, timestamp:row.new_val.date, temperature: row.new_val.value};
			console.log('var data: ' + data);
			socket.emit('message', data, function (response) {
				console.log('Send' + response);
			});
    });
	  
	});
  
});

var dataHandler = function (messageSet, topic, partition) {
    messageSet.forEach(function (m) {
        console.log("Publish to rethink: " + m.message.value.toString('utf8') + " from topic " + topic);
		var dat = JSON.parse(m.message.value.toString('utf8'));
		//pub.publish(topic, m.message.value.toString('utf8'));
		 r.table('temperature').insert({ device_id : dat.device_id, date: dat.date, value: dat.value}).run(conne, function(err, res)
		{
		  if(err) throw err;
		  console.log(res);
		});
		
    });
};

return consumer.init().then(function () {
	return consumer.subscribe('temperature', dataHandler);
});



