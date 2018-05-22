package com.co.lumens.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import com.co.lumens.entities.Pedido;
import com.co.lumens.service.PedidoService;

@Component
@RepositoryEventHandler(Pedido.class)
public class PedidoHandler {
	
	@Autowired
	PedidoService pedidoService;

	@HandleBeforeCreate
	public void handleBeforeCreate(Pedido pedido) {
		pedidoService.addOrdenCompraToPedido(pedido);
		/*OrdenCompra oc = ordenCompraRepository.findOne(pedido.getIdOrden());
		sum = sum + pedido.getCantidad() * pedido.getValorUnit();
		oc.setTotal(sum);
		pedido.setOrdenCompra(oc);*/
		
	}
}
