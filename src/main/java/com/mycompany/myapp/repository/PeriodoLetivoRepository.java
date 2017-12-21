package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PeriodoLetivo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PeriodoLetivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PeriodoLetivoRepository extends JpaRepository<PeriodoLetivo, Long> {

}
