package com.co.lumens.mq;

import java.io.IOException;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.co.lumens.entities.OrdenCompra;
import com.co.lumens.repository.OrdenCompraRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ConsumerOrdenCompra {
	
	@Autowired
	OrdenCompraRepository ordenCompraRepository;

	@RabbitListener(queues="${lumensapp.rabbitmq.amqp.queueorden}")
    public void recievedMessage(String msg) {
        System.out.println("Recieved Message: " + msg);
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        try {
        	OrdenCompra oc = mapper.readValue(msg, OrdenCompra.class);
        	
			System.out.println("Convierte json: " + oc);
			ordenCompraRepository.save(oc);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
    }
}
