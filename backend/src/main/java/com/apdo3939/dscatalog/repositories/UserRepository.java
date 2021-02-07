package com.apdo3939.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apdo3939.dscatalog.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
