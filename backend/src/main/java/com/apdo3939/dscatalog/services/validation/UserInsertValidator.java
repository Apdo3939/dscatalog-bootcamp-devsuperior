package com.apdo3939.dscatalog.services.validation;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.apdo3939.dscatalog.dto.UserInsertDTO;
import com.apdo3939.dscatalog.entities.User;
import com.apdo3939.dscatalog.repositories.UserRepository;
import com.apdo3939.dscatalog.resources.exceptions.FieldMessage;


public class UserInsertValidator implements ConstraintValidator<UserInsertValid, UserInsertDTO> {
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public void initialize(UserInsertValid ann) {
	}

	@Override
	public boolean isValid(UserInsertDTO dto, ConstraintValidatorContext context) {
		
		List<FieldMessage> list = new ArrayList<>();
		
		// Validations tests
		User user = userRepository.findByEmail(dto.getEmail());
		
		if(user != null) {
			
			list.add(new FieldMessage("email","Este email já esta cadastrado"));
		}
		
		for (FieldMessage e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}