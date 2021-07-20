package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Supermercado;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Supermercado}.
 */
public interface SupermercadoService {
    /**
     * Save a supermercado.
     *
     * @param supermercado the entity to save.
     * @return the persisted entity.
     */
    Supermercado save(Supermercado supermercado);

    /**
     * Partially updates a supermercado.
     *
     * @param supermercado the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Supermercado> partialUpdate(Supermercado supermercado);

    /**
     * Get all the supermercados.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Supermercado> findAll(Pageable pageable);

    /**
     * Get the "id" supermercado.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Supermercado> findOne(Long id);

    /**
     * Delete the "id" supermercado.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
