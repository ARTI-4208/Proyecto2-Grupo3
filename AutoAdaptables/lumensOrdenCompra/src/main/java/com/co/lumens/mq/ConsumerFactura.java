package com.co.lumens.mq;

import java.io.IOException;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.co.lumens.entities.Factura;
import com.co.lumens.repository.FacturaRepository;
import com.co.lumens.service.FacturaService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;


@Component
public class ConsumerFactura {
	@Autowired
	FacturaRepository facturaRepository;
	
	@Autowired
	FacturaService facturaService;

	@RabbitListener(queues="${lumensapp.rabbitmq.amqp.queuefact}")
    public void recievedMessage(String msg) {
        System.out.println("Recieved Message: " + msg);
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        try {
        	Factura fact = mapper.readValue(msg, Factura.class);
			
			System.out.println("Convierte json: " + fact);
			facturaService.addOrdenCompraToFactura(fact);
			facturaRepository.save(fact);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
    }
}
