package com.co.lumens.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
//import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.co.lumens.entities.Factura;

@Repository
@RepositoryRestResource(collectionResourceRel = "factura", path = "factura")
//public interface FacturaRepository extends PagingAndSortingRepository<Factura, Long>
public interface FacturaRepository extends CrudRepository<Factura, Long>
{
	List<Factura> findById(@Param("id") long id);	
}
