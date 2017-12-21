package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Nota;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Nota entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {

}
