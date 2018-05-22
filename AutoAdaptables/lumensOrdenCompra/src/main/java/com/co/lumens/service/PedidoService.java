package com.co.lumens.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.co.lumens.entities.OrdenCompra;
import com.co.lumens.entities.Pedido;
import com.co.lumens.repository.OrdenCompraRepository;
import com.co.lumens.repository.PedidoRepository;

@Service
public class PedidoService {
	
	@Autowired
	OrdenCompraRepository ordenCompraRepository;
	
	@Autowired
	PedidoRepository pedidoRepository;

	public void addOrdenCompraToPedido(Pedido p){
		OrdenCompra oc = ordenCompraRepository.findOne(p.getIdOrden());
		long sum = oc.getTotal() + (p.getCantidad() * p.getValorUnit());
		oc.setTotal(sum);
		
		ordenCompraRepository.save(oc);
//		p.setOrdenCompra(oc);
		
		pedidoRepository.save(p);
	}
}
