const AWS = require('aws-sdk'); 
const dynamodb = new AWS.DynamoDB({region: 'us-west-2', apiVersion: '2012-08-10'}); 

const facturaHandlers = {
  "GET": listFactura,
  "POST": createFactura
}

const timeString = () =>{
    return new Date().getTime().toString();
}


exports.handler = (event, context, callback) => {
  
  let httpMethod = event["httpMethod"];
  if (httpMethod in facturaHandlers) {
    return facturaHandlers[httpMethod](event, context, callback);
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

function listFactura(event, context, callback) {
  const params = {
        TableName: 'Factura' 
        
    }; 
    
    dynamodb.scan(params, (err, data) => {
        if(err) {
            console.log(err); callback(err); 
            
        } else {
            const facturas = data.Items.map(item => {
                return { ID: item.ID.N, fecha: item.fecha.N, idOrden: item.idOrden.N, idProveedor: item.idProveedor.N, porcent: item.porcent.N, valor: item.valor.N
                }; 
                
            });

            callback(null, {
                  statusCode: 200,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(facturas)
            });
            
        }
        }); 
}

function createFactura(event, context, callback) {
  
  var obj = JSON.parse(event.body,null,2 );
  var pIdOrden = obj.idOrden.toString();
  
        
  var pOrdenCompra = {
    TableName: 'OrdenCompra',
    Key: {
      'ID' : {N: pIdOrden}
    }
  };
  
  var octot;      
  var ordenCompra;
  
  dynamodb.getItem(pOrdenCompra, function(err, data) {
    if (err) { 
      console.log(err, err.stack); // an error occurred
    } else {
        ordenCompra = data.Item;
        octot = (+ordenCompra.total.N) * (+obj.porcent) / 100;
        console.log(ordenCompra);           // successful response
        console.log(octot.toString());
        insertFactura(obj,octot,callback);
    }
  });
  

 
}

 function insertFactura(obj,octot,callback){
	var id = timeString();
	var pFecha = obj.fecha.toString();
	var pIdOrden = obj.idOrden.toString();
	var pIdProveedor = obj.idProveedor.toString();
	var pPorcent = obj.porcent.toString();
		var params = { 
		  Item: { 
			  "ID": { "N": id},
			  "fecha": { "N": pFecha}, 
			  "idOrden": { "N": pIdOrden},
			  "idProveedor": { "N": pIdProveedor}, 
			  "porcent": { "N": pPorcent},
			  "valor": { "N": octot.toString()} // 
			}, 
			  TableName: 'Factura' 
		};
			
		dynamodb.putItem(params, (err, data) => { 
		if(err) {
		  console.log(err); 
		  callback(err); 
			
		} else { 
			var factura= {ID: params.Item.ID, fecha: params.Item.fecha, idOrden: params.Item.idOrden, idProveedor: params.Item.idProveedor, porcent: params.Item.porcent, valor: params.Item.valor};
			console.log("valor resp." +JSON.stringify(factura));
			callback(null, {
			  "statusCode": 200,
			  "headers": { "Content-Type": "application/json" },
			  "body": JSON.stringify(factura)
			  
			 }); 
		}
	  });
}