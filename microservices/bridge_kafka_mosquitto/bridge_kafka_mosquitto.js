var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://172.31.14.43:1883');
var Kafka   = require('no-kafka');
var producer = new Kafka.Producer({
  connectionString: 'kafka://172.31.14.43:9092'
});


console.log('start service bridge');
// Connection to topic Lumens in mosquitto
client.on('connect', function () {
    client.subscribe('Lumens');
    console.log('connected to mosquitto Lumens');
//    startReceiverMosquitto()
        //
        client.subscribe('temperature');
        console.log('connected to mosquitto temperature');
//        startReceiverMosquitto()
        //
        client.subscribe('current');
        console.log('connected to mosquitto current');
        startReceiverMosquitto()
});

function startReceiverMosquitto(){
    client.on('message', function (topic, message) {
        console.log(topic +": "+message.toString());
        try {
           publishKafka(topic, message.toString())
        }
        catch(err) {
           console.log(err)
           console.log("Error sending message to kafka")
        }
    });
}

function publishKafka(topic, msg){
    producer.init().then(function(){
        console.log('Publish to kafka '+msg+' in topic '+topic);
        return producer.send({
            connectionString: 'kafka://172.31.14.43:9092',
            topic: topic,
            partition: 0,
            message: {
                value: msg
            }
        });
    });
}