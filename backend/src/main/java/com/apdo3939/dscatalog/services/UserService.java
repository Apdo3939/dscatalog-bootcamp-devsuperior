package com.apdo3939.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.apdo3939.dscatalog.dto.RoleDTO;
import com.apdo3939.dscatalog.dto.UserDTO;
import com.apdo3939.dscatalog.dto.UserInsertDTO;
import com.apdo3939.dscatalog.dto.UserUpdateDTO;
import com.apdo3939.dscatalog.entities.Role;
import com.apdo3939.dscatalog.entities.User;
import com.apdo3939.dscatalog.repositories.RoleRepository;
import com.apdo3939.dscatalog.repositories.UserRepository;
import com.apdo3939.dscatalog.services.exceptions.DataBaseException;
import com.apdo3939.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class UserService {
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	

	private void copyDTOToEntity(UserDTO dto, User entity) {
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());
		
		entity.getRoles().clear();
		for (RoleDTO roleDto: dto.getRoles()) {
			Role role = roleRepository.getOne(roleDto.getId());
			entity.getRoles().add(role);	
		}
	}

	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(PageRequest pageRequest) {
		Page<User> list = repository.findAll(pageRequest);
		return list.map(x -> new UserDTO(x));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		copyDTOToEntity(dto, entity);
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity = repository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User entity = repository.getOne(id);
			copyDTOToEntity(dto, entity);
			entity = repository.save(entity);
			return new UserDTO(entity);

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