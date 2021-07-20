package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Produto;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Produto}.
 */
public interface ProdutoService {
    /**
     * Save a produto.
     *
     * @param produto the entity to save.
     * @return the persisted entity.
     */
    Produto save(Produto produto);

    /**
     * Partially updates a produto.
     *
     * @param produto the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Produto> partialUpdate(Produto produto);

    /**
     * Get all the produtos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Produto> findAll(Pageable pageable);

    /**
     * Get all the produtos with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Produto> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" produto.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Produto> findOne(Long id);

    /**
     * Delete the "id" produto.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
