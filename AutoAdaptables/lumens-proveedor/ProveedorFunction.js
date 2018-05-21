const AWS = require('aws-sdk'); 
const dynamodb = new AWS.DynamoDB({region: 'us-west-2', apiVersion: '2012-08-10'}); 

const proveedorHandlers = {
  "GET": getProveedor,
  "POST": addProveedor,
  "PUT": updProveedor,
  "DELETE": delProveedor
}

const timeString = () =>{
    return new Date().getTime().toString();
}


exports.handler = (event, context, callback) => {
  
  let httpMethod = event["httpMethod"];
  if (httpMethod in proveedorHandlers) {
    return proveedorHandlers[httpMethod](event, context, callback);
  }

  const response = {
    statusCode: 405,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify({
      message: `Invalid HTTP Method: ${httpMethod}`
    }),
  };

  callback(null, response);

};

function getProveedor(event, context, callback) {
  const params = {
        TableName: 'Proveedor' 
        
    }; 
    
    dynamodb.scan(params, (err, data) => {
        if(err) {
            console.log(err); callback(err); 
            
        } else {
            const tickets = data.Items.map(item => {
                return { 
                  ID: item.ID.N, nit: item.nit.S, nombre: item.nombre.S, estado: item.estado.N, vigencia: item.vigencia.S
                }; 
                
            });

            callback(null, {
                  statusCode: 200,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(tickets)
            });
            
        }
        }); 
}

function addProveedor(event, context, callback) {
  
  var obj = JSON.parse(event.body,null,2 );
  
  var id = timeString();
        var pNit = obj.nit;
        var pEstado = obj.estado.toString();
        var pNombre = obj.nombre;
        var pVigencia = timeString();
        var params = { 
            Item: { 
                "ID": { "N": id},
                "nit": { "S":  pNit}, 
                "estado": { "N":  pEstado},
                "nombre": { "S": pNombre},
                "vigencia": { "S": pVigencia}
            }, 
                TableName: 'Proveedor' 
            
        };
        
        dynamodb.putItem(params, (err, data) => { 
            if(err) {
            console.log(err); 
            callback(err); 
                
            } else { 
                var proveedor = {ID: params.Item.ID, nit: params.Item.nit, nombre: params.Item.nombre, estado: params.Item.estado, vigencia: params.Item.vigencia};
                console.log("valor resp." +JSON.stringify(proveedor));
                callback(null, {
                  "statusCode": 200,
                  "headers": { "Content-Type": "application/json" },
                  "body": JSON.stringify(proveedor)
                  
                 }); 
            
            }
        });

}

function updProveedor(event, context, callback) {
  var obj = JSON.parse(event.body,null,2 );
  
        var id = obj.ID.toString();
        var pNit = obj.nit;
        var pEstado = obj.estado.toString();
        var pNombre = obj.nombre;
        var pVigencia = timeString();
        var params = { 
            Item: { 
                "ID": { "N": id},
                "nit": { "S":  pNit}, 
                "estado": { "N":  pEstado},
                "nombre": { "S": pNombre},
                "vigencia": { "S": pVigencia}
            }, 
                TableName: 'Proveedor' 
            
        };
        
        dynamodb.putItem(params, (err, data) => { 
            if(err) {
            console.log(err); 
            callback(err); 
                
            } else { 
                var proveedor = {ID: params.Item.ID, nit: params.Item.nit, nombre: params.Item.nombre, estado: params.Item.estado, vigencia: params.Item.vigencia};
                console.log("valor resp." +JSON.stringify(proveedor));
                callback(null, {
                  "statusCode": 200,
                  "headers": { "Content-Type": "application/json" },
                  "body": JSON.stringify(proveedor)
                  
                 }); 
            
            }
        });
}

function delProveedor(event, context, callback) {
  
  var obj = JSON.parse(event.body,null,2 );
  
        var id = obj.ID.toString();
        var pNit = obj.nit;
        var pNombre = obj.nombre;
        var pEstado = obj.estado.toString();
        var pVigencia = timeString();
        var params = { 
            Item: { 
                "ID": { "N": id},
                "nit": { "S":  pNit}, 
                "estado": { "N":  pEstado},
                "nombre": { "S": pNombre},
                "vigencia": { "S": pVigencia}
            }, 
                TableName: 'Proveedor' 
            
        };
        
        dynamodb.putItem(params, (err, data) => { 
            if(err) {
            console.log(err); 
            callback(err); 
                
            } else { 
                var proveedor = {ID: params.Item.ID, estado: params.Item.estado, vigencia: params.Item.vigencia};
                console.log("valor resp." +JSON.stringify(proveedor));
                callback(null, {
                  "statusCode": 200,
                  "headers": { "Content-Type": "application/json" },
                  "body": JSON.stringify(proveedor)
                  
                 }); 
            
            }
        });
}