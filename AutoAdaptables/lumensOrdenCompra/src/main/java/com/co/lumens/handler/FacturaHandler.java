package com.co.lumens.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import com.co.lumens.entities.Factura;
import com.co.lumens.entities.OrdenCompra;
import com.co.lumens.repository.OrdenCompraRepository;
import com.co.lumens.service.FacturaService;

@Component
@RepositoryEventHandler(Factura.class)
public class FacturaHandler {
	
	@Autowired
	FacturaService facturaService;

	@HandleBeforeCreate
	public void handleBeforeCreate(Factura factura) {
		facturaService.addOrdenCompraToFactura(factura);
		/*OrdenCompra oc = ordenCompraRepository.findOne(factura.getIdOrden());
		long comision = oc.getTotal() * factura.getPorcent() / 100;
		factura.setOrdenCompra(oc);
		factura.setValor(comision);*/
	}

}
