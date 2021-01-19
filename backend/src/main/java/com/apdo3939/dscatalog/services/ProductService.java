package com.apdo3939.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.apdo3939.dscatalog.dto.ProductDTO;
import com.apdo3939.dscatalog.entities.Product;
import com.apdo3939.dscatalog.repositories.ProductRepository;
import com.apdo3939.dscatalog.services.exceptions.DataBaseException;
import com.apdo3939.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repository;

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {

		Page<Product> list = repository.findAll(pageRequest);
		return list.map(x -> new ProductDTO(x));

		/*
		 * List<ProductDTO> listDto = new ArrayList<>(); for(Product cat : list) {
		 * listDto.add(new ProductDTO(cat)); } return listDto;
		 */
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new ProductDTO(entity, entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new ProductDTO(entity);
	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		try {
			Product entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new ProductDTO(entity);

		} catch (EntityNotFoundException e) {
			e.getMessage();
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			e.getMessage();
			throw new ResourceNotFoundException("Id not found " + id);
			
		} catch (DataIntegrityViolationException e) {
			e.getMessage();
			throw new DataBaseException("Integrety Violation " + id);
		}
	}

}
