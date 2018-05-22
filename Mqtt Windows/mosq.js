var SerialPort = require('serialport')
var Readline = SerialPort.parsers.Readline
var mqtt = require('mqtt')
topic='current';

var serialPort = new SerialPort('COM5', {
  baudRate: 57600
})
var client2  = mqtt.connect('mqtt://172.28.128.3:1883');
var client  = mqtt.connect('mqtt://ec2-18-228-42-146.sa-east-1.compute.amazonaws.com')

var parser = new Readline()
serialPort.pipe(parser)
parser.on('data', function (data) {
var fecha = new Date().toString().replace('GMT-0500 (Hora est. Pacífico, Sudamérica)', ' ');
var amps = data.toString();
 msg = "Current: "+ amps
console.log(msg);
client.publish(topic,msg)
client2.publish(topic,msg)

})

serialPort.on('open', function () {
  console.log('Communication is on!')
})
