var cinco = require("johnny-five");
var circuito = new cinco.Board();

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://ec2-18-228-42-146.sa-east-1.compute.amazonaws.com');

var bombillo, celda, luz, temperatura;
var condTempe = 1;


client.on('connect', function () {
  client.publish('lumens', 'Connect to Arduino-NodeJS-Mosquitto-Bridge-Kafka-ConsumerRedis-SocketIO');
  circuito.on("ready", prender);
});

function prender()
{
  var configuracion1 = {pin:"A0", freq: 4000};
  celda = new cinco.Sensor(configuracion1);
  var configuracion2 = {pin:"A1", freq: 8000};
  termistor = new cinco.Sensor(configuracion2);

  bombillo = new cinco.Led(13);
  bombillo.off();
  mensajear();
}

function mensajear()
{
  luz = celda.value;
  temperatura = termistor.value;
  //
  console.log("Luz: " + luz + ", Fecha: '" + new Date() + "'");
  luzchar = "" + "Luz: " + luz + ", Fecha: '" + new Date() + "'";
  client.publish('Lumens', luzchar); //Debe corresponder a la etiqueta del tOpico Lumens de Mosquitto
  if(luz > 512)
  {
	  bombillo.off();
  }
  else
  {
	  bombillo.on();
  }
  //
  if(condTempe == 1)
  {
	  console.log("Temperatura: " + temperatura + ", Fecha: '" + new Date() + "'");
	  tempechar = "" + "Temperatura: " + temperatura + ", Fecha: '" + new Date() + "'";
	  client.publish('temperature', tempechar); //Debe corresponder a la etiqueta del tOpico Temperatura de Mosquitto
	  condTempe = 0;
  }
  else
  {
	  condTempe = 1;
  }
  //
  setTimeout(mensajear, 4000);
}