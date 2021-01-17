package com.apdo3939.dscatalog.dto;

import java.io.Serializable;

import com.apdo3939.dscatalog.entities.Category;

public class CategoryDTO implements Serializable {
	
	//Attributes
	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	
	//Constructors
	public CategoryDTO() {
		
	}
	
	public CategoryDTO(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public CategoryDTO(Category entity) {
		this.id = entity.getId();
		this.name = entity.getName();
	}

	//Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
