package com.apdo3939.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apdo3939.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

}
