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
	
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "factura")
//@JsonIgnoreProperties(value = {"fecha"}, allowGetters = true)
public class Factura {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private long idProveedor;
	private long porcent;
	private double valor;
	private Date fecha;
	
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

	public long getIdProveedor() {
		return idProveedor;
	}

	public void setIdProveedor(long idProveedor) {
		this.idProveedor = idProveedor;
	}

	public double getValor() {
		return valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	
	public long getIdOrden() {
		return idOrden;
	}

	public void setIdOrden(long idOrden) {
		this.idOrden = idOrden;
	}

	/*public OrdenCompra getOrdenCompra() {
		return ordenCompra;
	}

	public void setOrdenCompra(OrdenCompra ordenCompra) {
		this.ordenCompra = ordenCompra;
	}*/

	public long getPorcent() {
		return porcent;
	}

	public void setPorcent(long porcent) {
		this.porcent = porcent;
	}

	public Factura(long idOrden, long idProveedor, double valor, Date fecha, long porcent){//OrdenCompra idOrden, 
		this.idProveedor = idProveedor;
		this.valor = valor;
		this.fecha = fecha;
//		this.ordenCompra = idOrden;
		this.idOrden = idOrden;
		this.porcent = porcent;
	}
	
	public Factura(){
	}
	
	
}
