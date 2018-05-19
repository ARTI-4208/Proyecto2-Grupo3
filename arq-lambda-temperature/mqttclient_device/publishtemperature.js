var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

function sleep(milliseconds) {
  var start = new Date().getTime();
  while(true){
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

client.on('connect', function () {
	client.subscribe('temperature');
	
	setInterval(sendData, 300);
    //client.end();

});


client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  //client.end()
})

function sendData(){
	var tmpCelsius= Math.random()*50;
	var tmpAnio= getRandomInt(2011,2019);
	var tmpMes= getRandomInt(1,12);
	var tmpDia= getRandomInt(1,28);
	var fecha= new Date();
	
	fecha.setYear(tmpAnio);
	fecha.setMonth(tmpMes);
	fecha.setDate(tmpDia);
	//client.publish('numbers', tmpCelsius.toString() );
	var data = {device_id:'1', date:fecha, value: (tmpCelsius <= 1)? (tmpCelsius + 10) : tmpCelsius};//new Date().getTime()
	client.publish('temperature', JSON.stringify(data) );
	console.info("Publish in mosquitto: " + JSON.stringify(data) + "fecc" + fecha);
	
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


/** test mosquito**/
/*
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
  client.subscribe('presence')
  client.publish('presence', 'Hello mqtt')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})

*/
