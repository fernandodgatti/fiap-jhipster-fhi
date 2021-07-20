package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Supermercado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Supermercado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupermercadoRepository extends JpaRepository<Supermercado, Long> {}
