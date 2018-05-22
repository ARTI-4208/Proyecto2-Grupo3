package com.co.lumens.entities;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "pedido")
//@JsonIgnoreProperties({"id"})
//@JsonIgnoreProperties(ignoreUnknown = true)
public class Pedido {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private Date fecha;
	
	private long idProducto;
	private long cantidad;
	private long valorUnit;
	
//	@JsonIgnore
	private long idOrden;//transient 
	
	/*@ManyToOne
	@JoinColumn(name="idOrden")
	private OrdenCompra ordenCompra;*/
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public long getIdProducto() {
		return idProducto;
	}
	
	public void setIdProducto(long idProducto) {
		this.idProducto = idProducto;
	}
	
	public long getCantidad() {
		return cantidad;
	}
	
	public void setCantidad(long cantidad) {
		this.cantidad = cantidad;
	}
	
	public long getValorUnit() {
		return valorUnit;
	}
	
	public void setValorUnit(long valorUnit) {
		this.valorUnit = valorUnit;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	/*public OrdenCompra getOrdenCompra() {
		return ordenCompra;
	}

	public void setOrdenCompra(OrdenCompra idOrden) {
		this.ordenCompra = idOrden;
	}*/
	
	
	
	public long getIdOrden() {
		return idOrden;
	}

	public void setIdOrden(long idOrden) {
		this.idOrden = idOrden;
	}

	public Pedido(){
		
	}
	
	public Pedido(long idOrden, Date fecha, long valorUnit, long cantidad, long idProducto){ //OrdenCompra idOrden, 
	//	this.ordenCompra = idOrden;
		this.idOrden = idOrden;
		this.fecha = fecha;
		this.valorUnit = valorUnit;
		this.cantidad = cantidad;
		this.idProducto = idProducto;
	}

}
