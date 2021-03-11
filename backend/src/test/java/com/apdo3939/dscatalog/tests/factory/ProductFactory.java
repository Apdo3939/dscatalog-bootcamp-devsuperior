package com.apdo3939.dscatalog.tests.factory;

import java.time.Instant;

import com.apdo3939.dscatalog.dto.ProductDTO;
import com.apdo3939.dscatalog.entities.Category;
import com.apdo3939.dscatalog.entities.Product;

public class ProductFactory {

	public static Product createProduct() {

		Product product = new Product();

		product.setId(1L);
		product.setName("Smartfhone sansung");
		product.setDescription("Smartfhone topo de linha da categoria");
		product.setPrice(800.0);
		product.setImgUrl("http://image.samrtfhone.jpg");
		product.setDate(Instant.parse("2019-10-20T03:00:00Z"));
		
		product.getCategories().add(new Category(1L, null));
		
		return product;
	}
	
	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());
	}
	
	public static ProductDTO createProductDto(Long id) {
		ProductDTO dto = createProductDTO();
		dto.setId(id);
		return dto;
	}

}
