package com.co.lumens.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.co.lumens.entities.OrdenCompra;

@RepositoryRestResource(collectionResourceRel = "ordenCompra", path = "ordenCompra")
public interface OrdenCompraRepository extends CrudRepository<OrdenCompra, Long>
{
	
}
