package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Usuario;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Usuario}.
 */
public interface UsuarioService {
    /**
     * Save a usuario.
     *
     * @param usuario the entity to save.
     * @return the persisted entity.
     */
    Usuario save(Usuario usuario);

    /**
     * Partially updates a usuario.
     *
     * @param usuario the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Usuario> partialUpdate(Usuario usuario);

    /**
     * Get all the usuarios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Usuario> findAll(Pageable pageable);

    /**
     * Get the "id" usuario.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Usuario> findOne(Long id);

    /**
     * Delete the "id" usuario.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
