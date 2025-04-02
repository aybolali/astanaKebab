package com.project.astanakebab.repository;

import com.project.astanakebab.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "countries", path = "countries") // localhost/countries - rest API
public interface CountryRepository extends JpaRepository<Country, Integer> {
}
