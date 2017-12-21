package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Permissao;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Permissao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PermissaoRepository extends JpaRepository<Permissao, Long> {

}
