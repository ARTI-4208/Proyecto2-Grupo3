package com.co.lumens.entities;

import java.sql.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class OrdenCompra {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private Date fecha;
	private long total;

	/*@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy="ordenCompra")
	private Set<Factura> factura;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy="ordenCompra")
	private Set<Pedido> pedido;*/

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	/*public Set<Factura> getFactura() {
		return factura;
	}

	public void setFactura(Set<Factura> factura) {
		this.factura = factura;
	}

	public Set<Pedido> getPedido() {
		return pedido;
	}

	public void setPedido(Set<Pedido> pedido) {
		this.pedido = pedido;
	}*/
	
	
	
}
