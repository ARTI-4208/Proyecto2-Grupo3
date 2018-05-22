package com.co.lumens.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.co.lumens.entities.Factura;
import com.co.lumens.entities.OrdenCompra;
import com.co.lumens.repository.OrdenCompraRepository;

@Service
public class FacturaService {
	@Autowired
	OrdenCompraRepository ordenCompraRepository;

	public void addOrdenCompraToFactura(Factura fact){
		OrdenCompra oc = ordenCompraRepository.findOne(fact.getIdOrden());
		long comision = oc.getTotal() * fact.getPorcent() / 100;
		
//		fact.setOrdenCompra(oc);
		fact.setValor(comision);		
	}
}
