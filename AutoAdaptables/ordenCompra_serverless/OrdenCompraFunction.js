const AWS = require('aws-sdk'); 
const dynamodb = new AWS.DynamoDB({region: 'us-west-2', apiVersion: '2012-08-10'}); 

const ticketHandlers = {
  "GET": listOrden,
  "POST": createOrden
}

const timeString = () =>{
    return new Date().getTime().toString();
}


exports.handler = (event, context, callback) => {
  
  let httpMethod = event["httpMethod"];
  if (httpMethod in ticketHandlers) {
    return ticketHandlers[httpMethod](event, context, callback);
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


function listOrden(event, context, callback) {
  const params = {
        TableName: 'OrdenCompra' 
        
    }; 
    
    dynamodb.scan(params, (err, data) => {
        if(err) {
            console.log(err); callback(err); 
            
        } else {
          
            const ordenes = data.Items.map(item => {
              console.log("orden : " + JSON.stringify(item))
                return { ID: item.ID.N, total: item.total.N
                }; 
                
            });

            callback(null, {
                  statusCode: 200,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(ordenes)
            });
            
        }
        }); 
}


function createOrden(event, context, callback) {
  
  var obj = JSON.parse(event.body,null,2 );
  
  var id = timeString();
        var pFecha = obj.fecha.toString();
        var pTotal = obj.total.toString();
        var params = { 
            Item: { 
                "ID": { "N": id},
                "fecha": { "N":  pFecha}, 
                "total": { "N":  pTotal}
            }, 
                TableName: 'OrdenCompra' 
            
        };
        
        dynamodb.putItem(params, (err, data) => { 
            if(err) {
            console.log(err); 
            callback(err); 
                
            } else { 
                var orden= {ID: params.Item.ID, fecha: params.Item.fecha, total: params.Item.total};
                console.log("valor resp." +JSON.stringify(orden));
                callback(null, {
                  "statusCode": 200,
                  "headers": { "Content-Type": "application/json" },
                  "body": JSON.stringify(orden)
                  
                 }); 
            
            }
        });

}