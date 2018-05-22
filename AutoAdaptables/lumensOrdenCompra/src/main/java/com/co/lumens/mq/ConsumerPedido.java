package com.co.lumens.mq;

import java.io.IOException;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.co.lumens.entities.Pedido;
import com.co.lumens.repository.PedidoRepository;
import com.co.lumens.service.PedidoService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ConsumerPedido {
	
	/*@Autowired
	PedidoRepository pedidoRepository;*/
	
	@Autowired
	PedidoService pedidoService;

	@RabbitListener(queues="${lumensapp.rabbitmq.amqp.queuepedido}")
    public void recievedMessage(String msg) {
        System.out.println("Recieved Message: " + msg);
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        try {
        	Pedido p = mapper.readValue(msg, Pedido.class);
			
			System.out.println("Convierte json: " + p);
			pedidoService.addOrdenCompraToPedido(p);
//			pedidoRepository.save(p);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
    }
}
