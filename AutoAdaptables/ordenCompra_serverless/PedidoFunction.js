const AWS = require('aws-sdk'); 
const dynamodb = new AWS.DynamoDB({region: 'us-west-2', apiVersion: '2012-08-10'}); 

const pedidoHandlers = {
  "GET": listPedido,
  "POST": createPedido
}

const timeString = () =>{
    return new Date().getTime().toString();
}


exports.handler = (event, context, callback) => {
  
  let httpMethod = event["httpMethod"];
  if (httpMethod in pedidoHandlers) {
    return pedidoHandlers[httpMethod](event, context, callback);
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


function listPedido(event, context, callback) {
  const params = {
        TableName: 'Pedido' 
        
    }; 
    
    dynamodb.scan(params, (err, data) => {
        if(err) {
            console.log(err); callback(err); 
            
        } else {
            const pedidos = data.Items.map(item => {
                return { ID: item.ID.N, cantidad: item.cantidad.N, fecha: item.fecha.N, idOrden: item.idOrden.N, idProducto: item.idProducto.N, valorUnit: item.valorUnit.N
                }; 
                
            });

            callback(null, {
                  statusCode: 200,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(pedidos)
            });
            
        }
        }); 
}


function createPedido(event, context, callback) {
  
  var obj = JSON.parse(event.body,null,2 );
  
  var id = timeString();
        var pCantidad = obj.cantidad.toString();
        var pFecha = obj.fecha.toString();
        var pIdOrden = obj.idOrden.toString();
        var pIdProducto = obj.idProducto.toString();
        var pValorUnit = obj.valorUnit.toString();
        var params = { 
            Item: { 
                "ID": { "N": id},
                "cantidad": { "N":  pCantidad}, 
                "fecha": { "N":  pFecha},
                "idOrden": { "N":  pIdOrden},
                "idProducto": { "N":  pIdProducto}, 
                "valorUnit": { "N":  pValorUnit}
            }, 
                TableName: 'Pedido' 
            
        };
        
        var pOrdenCompra = {
          TableName: 'OrdenCompra',
          Key: {
            'ID' : {N: pIdOrden}
          }
        };
        
        var ordenCompra;
        
        dynamodb.getItem(pOrdenCompra, function(err, data) {
          if (err) { 
            console.log(err, err.stack); // an error occurred
          } else {
              ordenCompra = data.Item;
              
              var octot = (+ordenCompra.total.N) + ( (+obj.cantidad) * (+obj.valorUnit));
              console.log(ordenCompra);           // successful response
              var paramsPut = { 
                Item: { 
                    "ID": ordenCompra.ID,
                    "fecha": ordenCompra.fecha,
                    "total": {"N": octot.toString()}
                }, 
                    TableName: 'OrdenCompra' 
              
              };
        
              dynamodb.putItem(paramsPut, (err, data) => { 
                  if(err) {
                  console.log(err); 
                  callback(err); 
                  } else { 
                     console.log("actualiza orde: " + data);
                  }
              });
          }
        });
        
        dynamodb.putItem(params, (err, data) => { 
            if(err) {
            console.log(err); 
            callback(err); 
                
            } else { 
                var pedido= {ID: params.Item.ID, cantidad: params.Item.cantidad, fecha: params.Item.fecha, idOrden: params.Item.idOrden, idProducto: params.Item.idProducto, valorUnit: params.Item.valorUnit};
                console.log("valor resp." +JSON.stringify(pedido));
                callback(null, {
                  "statusCode": 200,
                  "headers": { "Content-Type": "application/json" },
                  "body": JSON.stringify(pedido)
                  
                 }); 
            
            }
        });
}