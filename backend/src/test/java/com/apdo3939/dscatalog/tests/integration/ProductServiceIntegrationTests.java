package com.apdo3939.dscatalog.tests.integration;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import com.apdo3939.dscatalog.dto.ProductDTO;
import com.apdo3939.dscatalog.services.ProductService;
import com.apdo3939.dscatalog.services.exceptions.DataBaseException;
import com.apdo3939.dscatalog.services.exceptions.ResourceNotFoundException;

@SpringBootTest
@Transactional
public class ProductServiceIntegrationTests {

	@Autowired
	private ProductService service;

	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private long countTotalProducts;
	private long countPcGamerProducts;
	private PageRequest pageable;

	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		dependentId = 4L;
		countTotalProducts = 25L;
		countPcGamerProducts = 21L;
		pageable = PageRequest.of(0, 25);

	}

	@Test
	public void deleteShouldDoNothingWhenIdExist() {
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});

	}

	public void deleteShouldThrowsDatabaseExceptionWhenDependentId() {
		Assertions.assertThrows(DataBaseException.class, () -> {
			service.delete(dependentId);
		});

	}

	@Test
	public void deleteShouldThrowsResourceNotFoundExceptionWhenNonIdExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});

	}

	@Test
	public void findAllPagedShouldReturnAllProductsWhenNameDoesExist() {

		String name = "Camera";

		Page<ProductDTO> result = service.findAllPaged(0L, name, pageable);

		Assertions.assertTrue(result.isEmpty());

	}

	@Test
	public void findAllPagedShouldReturnAllProductsWhenNameIsEmpty() {

		String name = "";

		Page<ProductDTO> result = service.findAllPaged(0L, name, pageable);

		Assertions.assertFalse(result.isEmpty());

		Assertions.assertEquals(countTotalProducts, result.getTotalElements());

	}

	@Test
	public void findAllPagedShouldReturnProductsWhenNameExistIgnoreCase() {

		String name = "pc gamer";

		Page<ProductDTO> result = service.findAllPaged(0L, name, pageable);

		Assertions.assertFalse(result.isEmpty());

		Assertions.assertEquals(countPcGamerProducts, result.getTotalElements());

	}

	@Test
	public void findAllPagedShouldReturnProductsWhenNameExist() {

		String name = "Pc Gamer";

		Page<ProductDTO> result = service.findAllPaged(0L, name, pageable);

		Assertions.assertFalse(result.isEmpty());

		Assertions.assertEquals(countPcGamerProducts, result.getTotalElements());

	}

}
