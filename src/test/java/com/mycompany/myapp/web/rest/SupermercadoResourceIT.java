package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Supermercado;
import com.mycompany.myapp.repository.SupermercadoRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link SupermercadoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SupermercadoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_CNPJ = "AAAAAAAAAA";
    private static final String UPDATED_CNPJ = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/supermercados";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SupermercadoRepository supermercadoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSupermercadoMockMvc;

    private Supermercado supermercado;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Supermercado createEntity(EntityManager em) {
        Supermercado supermercado = new Supermercado().nome(DEFAULT_NOME).cnpj(DEFAULT_CNPJ);
        return supermercado;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Supermercado createUpdatedEntity(EntityManager em) {
        Supermercado supermercado = new Supermercado().nome(UPDATED_NOME).cnpj(UPDATED_CNPJ);
        return supermercado;
    }

    @BeforeEach
    public void initTest() {
        supermercado = createEntity(em);
    }

    @Test
    @Transactional
    void createSupermercado() throws Exception {
        int databaseSizeBeforeCreate = supermercadoRepository.findAll().size();
        // Create the Supermercado
        restSupermercadoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(supermercado))
            )
            .andExpect(status().isCreated());

        // Validate the Supermercado in the database
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeCreate + 1);
        Supermercado testSupermercado = supermercadoList.get(supermercadoList.size() - 1);
        assertThat(testSupermercado.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testSupermercado.getCnpj()).isEqualTo(DEFAULT_CNPJ);
    }

    @Test
    @Transactional
    void createSupermercadoWithExistingId() throws Exception {
        // Create the Supermercado with an existing ID
        supermercado.setId(1L);

        int databaseSizeBeforeCreate = supermercadoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupermercadoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(supermercado))
            )
            .andExpect(status().isBadRequest());

        // Validate the Supermercado in the database
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSupermercados() throws Exception {
        // Initialize the database
        supermercadoRepository.saveAndFlush(supermercado);

        // Get all the supermercadoList
        restSupermercadoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supermercado.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].cnpj").value(hasItem(DEFAULT_CNPJ)));
    }

    @Test
    @Transactional
    void getSupermercado() throws Exception {
        // Initialize the database
        supermercadoRepository.saveAndFlush(supermercado);

        // Get the supermercado
        restSupermercadoMockMvc
            .perform(get(ENTITY_API_URL_ID, supermercado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(supermercado.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.cnpj").value(DEFAULT_CNPJ));
    }

    @Test
    @Transactional
    void getNonExistingSupermercado() throws Exception {
        // Get the supermercado
        restSupermercadoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSupermercado() throws Exception {
        // Initialize the database
        supermercadoRepository.saveAndFlush(supermercado);

        int databaseSizeBeforeUpdate = supermercadoRepository.findAll().size();

        // Update the supermercado
        Supermercado updatedSupermercado = supermercadoRepository.findById(supermercado.getId()).get();
        // Disconnect from session so that the updates on updatedSupermercado are not directly saved in db
        em.detach(updatedSupermercado);
        updatedSupermercado.nome(UPDATED_NOME).cnpj(UPDATED_CNPJ);

        restSupermercadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSupermercado.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSupermercado))
            )
            .andExpect(status().isOk());

        // Validate the Supermercado in the database
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeUpdate);
        Supermercado testSupermercado = supermercadoList.get(supermercadoList.size() - 1);
        assertThat(testSupermercado.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testSupermercado.getCnpj()).isEqualTo(UPDATED_CNPJ);
    }

    @Test
    @Transactional
    void putNonExistingSupermercado() throws Exception {
        int databaseSizeBeforeUpdate = supermercadoRepository.findAll().size();
        supermercado.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupermercadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, supermercado.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(supermercado))
            )
            .andExpect(status().isBadRequest());

        // Validate the Supermercado in the database
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSupermercado() throws Exception {
        int databaseSizeBeforeUpdate = supermercadoRepository.findAll().size();
        supermercado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSupermercadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(supermercado))
            )
            .andExpect(status().isBadRequest());

        // Validate the Supermercado in the database
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSupermercado() throws Exception {
        int databaseSizeBeforeUpdate = supermercadoRepository.findAll().size();
        supermercado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSupermercadoMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(supermercado))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Supermercado in the database
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSupermercadoWithPatch() throws Exception {
        // Initialize the database
        supermercadoRepository.saveAndFlush(supermercado);

        int databaseSizeBeforeUpdate = supermercadoRepository.findAll().size();

        // Update the supermercado using partial update
        Supermercado partialUpdatedSupermercado = new Supermercado();
        partialUpdatedSupermercado.setId(supermercado.getId());

        partialUpdatedSupermercado.cnpj(UPDATED_CNPJ);

        restSupermercadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSupermercado.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSupermercado))
            )
            .andExpect(status().isOk());

        // Validate the Supermercado in the database
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeUpdate);
        Supermercado testSupermercado = supermercadoList.get(supermercadoList.size() - 1);
        assertThat(testSupermercado.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testSupermercado.getCnpj()).isEqualTo(UPDATED_CNPJ);
    }

    @Test
    @Transactional
    void fullUpdateSupermercadoWithPatch() throws Exception {
        // Initialize the database
        supermercadoRepository.saveAndFlush(supermercado);

        int databaseSizeBeforeUpdate = supermercadoRepository.findAll().size();

        // Update the supermercado using partial update
        Supermercado partialUpdatedSupermercado = new Supermercado();
        partialUpdatedSupermercado.setId(supermercado.getId());

        partialUpdatedSupermercado.nome(UPDATED_NOME).cnpj(UPDATED_CNPJ);

        restSupermercadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSupermercado.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSupermercado))
            )
            .andExpect(status().isOk());

        // Validate the Supermercado in the database
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeUpdate);
        Supermercado testSupermercado = supermercadoList.get(supermercadoList.size() - 1);
        assertThat(testSupermercado.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testSupermercado.getCnpj()).isEqualTo(UPDATED_CNPJ);
    }

    @Test
    @Transactional
    void patchNonExistingSupermercado() throws Exception {
        int databaseSizeBeforeUpdate = supermercadoRepository.findAll().size();
        supermercado.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupermercadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, supermercado.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(supermercado))
            )
            .andExpect(status().isBadRequest());

        // Validate the Supermercado in the database
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSupermercado() throws Exception {
        int databaseSizeBeforeUpdate = supermercadoRepository.findAll().size();
        supermercado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSupermercadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(supermercado))
            )
            .andExpect(status().isBadRequest());

        // Validate the Supermercado in the database
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSupermercado() throws Exception {
        int databaseSizeBeforeUpdate = supermercadoRepository.findAll().size();
        supermercado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSupermercadoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(supermercado))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Supermercado in the database
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSupermercado() throws Exception {
        // Initialize the database
        supermercadoRepository.saveAndFlush(supermercado);

        int databaseSizeBeforeDelete = supermercadoRepository.findAll().size();

        // Delete the supermercado
        restSupermercadoMockMvc
            .perform(delete(ENTITY_API_URL_ID, supermercado.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Supermercado> supermercadoList = supermercadoRepository.findAll();
        assertThat(supermercadoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
