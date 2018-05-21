console.log('PersistirCliente Function');

const AWS = require('aws-sdk'); 
const dynamodb = new AWS.DynamoDB({region: 'sa-east-1', apiVersion: '2012-08-10'}); 
const timeString = () => {
    return new Date().getTime().toString(); }
var params = { 
    Item: { 
        "id": { "N": 0},
        "nombre": { "S":  ''},
        "telefono": { "N":  0},
        "direccion": { "S":  ''},
        "correo": { "S":  ''},
        "fechanaci": { "S": ''},
        "tarjetacred": { "N": 0},
        "preferencia": { "S": ''},
        "last_update": { "N": 0} }, 
    TableName: 'Cliente' };

exports.handler = function(event, context, callback){
    switch (event.httpMethod) {
        case 'GET':
            dynamodb.scan({ TableName: params.TableName }, (err, data) => {
                if(err) {
                    console.log(err); callback(err);
                } else {
                    const tickets = data.Items.map(item => {
                        return { id: item.id.N, nombre: item.nombre.S, telefono: item.telefono.N, direccion: item.direccion.S, correo: item.correo.S, fechanaci: item.fechanaci.S, tarjetacred: item.tarjetacred.N, preferencia: item.preferencia.S, last_update: item.last_update.N };
                    });
                    callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(tickets),
                        headers: { "Content-Type": "application/json" }
                    });
                }
            });
            break;
        case 'POST':
            console.log('valor recibido event.body: '+ event.body);
            var obj = JSON.parse(event.body,null,2 );
            params.Item.id.N = obj.id.toString();
            params.Item.nombre.S = obj.nombre;
            params.Item.telefono.N = obj.telefono.toString();
            params.Item.direccion.S = obj.direccion;
            params.Item.correo.S = obj.correo;
            params.Item.fechanaci.S = obj.fechanaci;
            params.Item.tarjetacred.N = obj.tarjetacred.toString();
            params.Item.preferencia.S = obj.preferencia;
            params.Item.last_update.N = timeString();
            //
            dynamodb.putItem(params, (err, data) => {
                if(err) {
                    console.log(err); callback(err);
                } else { 
                    var cliente= { id: params.Item.id, nombre: params.Item.nombre, telefono: params.Item.telefono, direccion: params.Item.direccion, correo: params.Item.correo, fechanaci: params.Item.fechanaci, tarjetacred: params.Item.tarjetacred, preferencia: params.Item.preferencia, last_update: params.Item.last_update };
                    console.log("valor registrado" +JSON.stringify(cliente));
                    callback(null, {
                      "statusCode": 200,
                      "body": JSON.stringify(cliente),
                      "headers": { "Content-Type": "application/json" }
                    });  
                }
            });
            break;     
        default:
            callback(null, {
                statusCode: 400,
                body: JSON.stringify({"resp":`Unsupported method "${event.httpMethod}"`}),
                headers: { "Content-Type": "application/json" }
            });
    }
   
};