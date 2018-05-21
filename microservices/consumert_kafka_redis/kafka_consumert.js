var Kafka   = require('no-kafka');
var consumer = new Kafka.SimpleConsumer({
  connectionString: 'kafka://172.31.14.43:9092'
});
var redis = require("redis"),
    pub = redis.createClient('6379', '172.31.14.43', { detect_buffers: true });

console.log('start consumer service');

var dataHandler = function (messageSet, topic, partition) {
    messageSet.forEach(function (m) {
        console.log("Publish to redis: " + m.message.value.toString('utf8') + " from topic " + topic);
                pub.publish(topic, m.message.value.toString('utf8'));
    });
};

return consumer.init().then(function () {

    return consumer.subscribe('temperature', dataHandler);
});