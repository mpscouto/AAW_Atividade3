package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Falta;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Falta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FaltaRepository extends JpaRepository<Falta, Long> {

}
