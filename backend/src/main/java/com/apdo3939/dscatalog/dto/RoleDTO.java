package com.apdo3939.dscatalog.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.apdo3939.dscatalog.entities.Role;
import com.apdo3939.dscatalog.entities.User;

public class RoleDTO implements Serializable {
	
	//Attributes
	private static final long serialVersionUID = 1L;
	private Long id;
	private String authority;
	private List<UserDTO> users = new ArrayList<>();
	
	//Constructors
	public RoleDTO() {
		
	}

	public RoleDTO(Long id, String authority) {
		super();
		this.id = id;
		this.authority = authority;
	}

	public RoleDTO(Role entity) {
		super();
		this.id = entity.getId();
		this.authority = entity.getAuthority();
		
	}
	
	public RoleDTO(Role entity, Set<User> users) {
		this(entity);
		users.forEach(cat -> this.users.add(new UserDTO(cat)));
		
	}

	//Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public List<UserDTO> getUsers() {
		return users;
	}
	
}
