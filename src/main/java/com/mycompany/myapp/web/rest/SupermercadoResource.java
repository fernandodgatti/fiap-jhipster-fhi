package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Supermercado;
import com.mycompany.myapp.repository.SupermercadoRepository;
import com.mycompany.myapp.service.SupermercadoService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Supermercado}.
 */
@RestController
@RequestMapping("/api")
public class SupermercadoResource {

    private final Logger log = LoggerFactory.getLogger(SupermercadoResource.class);

    private static final String ENTITY_NAME = "supermercado";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SupermercadoService supermercadoService;

    private final SupermercadoRepository supermercadoRepository;

    public SupermercadoResource(SupermercadoService supermercadoService, SupermercadoRepository supermercadoRepository) {
        this.supermercadoService = supermercadoService;
        this.supermercadoRepository = supermercadoRepository;
    }

    /**
     * {@code POST  /supermercados} : Create a new supermercado.
     *
     * @param supermercado the supermercado to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new supermercado, or with status {@code 400 (Bad Request)} if the supermercado has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/supermercados")
    public ResponseEntity<Supermercado> createSupermercado(@RequestBody Supermercado supermercado) throws URISyntaxException {
        log.debug("REST request to save Supermercado : {}", supermercado);
        if (supermercado.getId() != null) {
            throw new BadRequestAlertException("A new supermercado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Supermercado result = supermercadoService.save(supermercado);
        return ResponseEntity
            .created(new URI("/api/supermercados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /supermercados/:id} : Updates an existing supermercado.
     *
     * @param id the id of the supermercado to save.
     * @param supermercado the supermercado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated supermercado,
     * or with status {@code 400 (Bad Request)} if the supermercado is not valid,
     * or with status {@code 500 (Internal Server Error)} if the supermercado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/supermercados/{id}")
    public ResponseEntity<Supermercado> updateSupermercado(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Supermercado supermercado
    ) throws URISyntaxException {
        log.debug("REST request to update Supermercado : {}, {}", id, supermercado);
        if (supermercado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, supermercado.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!supermercadoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Supermercado result = supermercadoService.save(supermercado);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, supermercado.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /supermercados/:id} : Partial updates given fields of an existing supermercado, field will ignore if it is null
     *
     * @param id the id of the supermercado to save.
     * @param supermercado the supermercado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated supermercado,
     * or with status {@code 400 (Bad Request)} if the supermercado is not valid,
     * or with status {@code 404 (Not Found)} if the supermercado is not found,
     * or with status {@code 500 (Internal Server Error)} if the supermercado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/supermercados/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Supermercado> partialUpdateSupermercado(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Supermercado supermercado
    ) throws URISyntaxException {
        log.debug("REST request to partial update Supermercado partially : {}, {}", id, supermercado);
        if (supermercado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, supermercado.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!supermercadoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Supermercado> result = supermercadoService.partialUpdate(supermercado);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, supermercado.getId().toString())
        );
    }

    /**
     * {@code GET  /supermercados} : get all the supermercados.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of supermercados in body.
     */
    @GetMapping("/supermercados")
    public ResponseEntity<List<Supermercado>> getAllSupermercados(Pageable pageable) {
        log.debug("REST request to get a page of Supermercados");
        Page<Supermercado> page = supermercadoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /supermercados/:id} : get the "id" supermercado.
     *
     * @param id the id of the supermercado to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the supermercado, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/supermercados/{id}")
    public ResponseEntity<Supermercado> getSupermercado(@PathVariable Long id) {
        log.debug("REST request to get Supermercado : {}", id);
        Optional<Supermercado> supermercado = supermercadoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(supermercado);
    }

    /**
     * {@code DELETE  /supermercados/:id} : delete the "id" supermercado.
     *
     * @param id the id of the supermercado to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/supermercados/{id}")
    public ResponseEntity<Void> deleteSupermercado(@PathVariable Long id) {
        log.debug("REST request to delete Supermercado : {}", id);
        supermercadoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
