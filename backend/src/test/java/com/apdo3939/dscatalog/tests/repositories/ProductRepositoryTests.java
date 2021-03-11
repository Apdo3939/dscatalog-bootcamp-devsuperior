package com.apdo3939.dscatalog.tests.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.apdo3939.dscatalog.entities.Category;
import com.apdo3939.dscatalog.entities.Product;
import com.apdo3939.dscatalog.repositories.ProductRepository;
import com.apdo3939.dscatalog.tests.factory.ProductFactory;

@DataJpaTest
public class ProductRepositoryTests {

	@Autowired
	private ProductRepository repository;

	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private long countPcGamerProducts;
	private long countcategory;
	private Pageable pageable;

	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPcGamerProducts = 21L;
		countcategory = 23L;
		pageable = PageRequest.of(0, 25);
	}
	
	@Test
	public void findShouldReturnOnlySelectcategoryWhenCategoryInformed() {
		String name = "";
		List<Category> categories = new ArrayList<>(); 
		categories.add(new Category(3L, null));

		Page<Product> result = repository.find(categories, name, pageable);

		Assertions.assertFalse(result.isEmpty());

		Assertions.assertEquals(countcategory, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnAllProductsWhenCategoryNotInformed() {
		String name = "";
		List<Category> categories = null; 

		Page<Product> result = repository.find(categories, name, pageable);

		Assertions.assertFalse(result.isEmpty());

		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}

	@Test
	public void findShouldReturnAllProductsWhenNameIsEmpty() {

		String name = "";

		Page<Product> result = repository.find(null, name, pageable);

		Assertions.assertFalse(result.isEmpty());

		Assertions.assertEquals(countTotalProducts, result.getTotalElements());

	}

	@Test
	public void findShouldReturnProductsWhenNameExistsIgnoreCase() {

		String name = "pc gamer";

		Page<Product> result = repository.find(null, name, pageable);

		Assertions.assertFalse(result.isEmpty());

		Assertions.assertEquals(countPcGamerProducts, result.getTotalElements());

	}

	@Test
	public void findShouldReturnProductsWhenNameExists() {

		String name = "Pc Gamer";

		Page<Product> result = repository.find(null, name, pageable);

		Assertions.assertFalse(result.isEmpty());

		Assertions.assertEquals(countPcGamerProducts, result.getTotalElements());

	}

	@Test
	public void saveShouldPersistWithAutoincrementIdIsNull() {
		Product product = ProductFactory.createProduct();
		product.setId(null);
		product = repository.save(product);

		Optional<Product> result = repository.findById(product.getId());

		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1L, product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(result.get(), product);
	}

	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {

		repository.deleteById(existingId);
		Optional<Product> result = repository.findById(existingId);
		Assertions.assertFalse(result.isPresent());

	}

	@Test
	public void deleteShouldThrowsExceptionWhenIdDoesNotExists() {

		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> repository.deleteById(nonExistingId));

	}

}
