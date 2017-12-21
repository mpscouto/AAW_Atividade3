package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.AawAtividade3App;

import com.mycompany.myapp.domain.PeriodoLetivo;
import com.mycompany.myapp.repository.PeriodoLetivoRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PeriodoLetivoResource REST controller.
 *
 * @see PeriodoLetivoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AawAtividade3App.class)
public class PeriodoLetivoResourceIntTest {

    private static final Integer DEFAULT_CODIGO = 1;
    private static final Integer UPDATED_CODIGO = 2;

    private static final Integer DEFAULT_MES = 1;
    private static final Integer UPDATED_MES = 2;

    private static final Integer DEFAULT_ANO = 1;
    private static final Integer UPDATED_ANO = 2;

    @Autowired
    private PeriodoLetivoRepository periodoLetivoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPeriodoLetivoMockMvc;

    private PeriodoLetivo periodoLetivo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PeriodoLetivoResource periodoLetivoResource = new PeriodoLetivoResource(periodoLetivoRepository);
        this.restPeriodoLetivoMockMvc = MockMvcBuilders.standaloneSetup(periodoLetivoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PeriodoLetivo createEntity(EntityManager em) {
        PeriodoLetivo periodoLetivo = new PeriodoLetivo()
            .codigo(DEFAULT_CODIGO)
            .mes(DEFAULT_MES)
            .ano(DEFAULT_ANO);
        return periodoLetivo;
    }

    @Before
    public void initTest() {
        periodoLetivo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPeriodoLetivo() throws Exception {
        int databaseSizeBeforeCreate = periodoLetivoRepository.findAll().size();

        // Create the PeriodoLetivo
        restPeriodoLetivoMockMvc.perform(post("/api/periodo-letivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodoLetivo)))
            .andExpect(status().isCreated());

        // Validate the PeriodoLetivo in the database
        List<PeriodoLetivo> periodoLetivoList = periodoLetivoRepository.findAll();
        assertThat(periodoLetivoList).hasSize(databaseSizeBeforeCreate + 1);
        PeriodoLetivo testPeriodoLetivo = periodoLetivoList.get(periodoLetivoList.size() - 1);
        assertThat(testPeriodoLetivo.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testPeriodoLetivo.getMes()).isEqualTo(DEFAULT_MES);
        assertThat(testPeriodoLetivo.getAno()).isEqualTo(DEFAULT_ANO);
    }

    @Test
    @Transactional
    public void createPeriodoLetivoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = periodoLetivoRepository.findAll().size();

        // Create the PeriodoLetivo with an existing ID
        periodoLetivo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPeriodoLetivoMockMvc.perform(post("/api/periodo-letivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodoLetivo)))
            .andExpect(status().isBadRequest());

        // Validate the PeriodoLetivo in the database
        List<PeriodoLetivo> periodoLetivoList = periodoLetivoRepository.findAll();
        assertThat(periodoLetivoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPeriodoLetivos() throws Exception {
        // Initialize the database
        periodoLetivoRepository.saveAndFlush(periodoLetivo);

        // Get all the periodoLetivoList
        restPeriodoLetivoMockMvc.perform(get("/api/periodo-letivos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(periodoLetivo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].mes").value(hasItem(DEFAULT_MES)))
            .andExpect(jsonPath("$.[*].ano").value(hasItem(DEFAULT_ANO)));
    }

    @Test
    @Transactional
    public void getPeriodoLetivo() throws Exception {
        // Initialize the database
        periodoLetivoRepository.saveAndFlush(periodoLetivo);

        // Get the periodoLetivo
        restPeriodoLetivoMockMvc.perform(get("/api/periodo-letivos/{id}", periodoLetivo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(periodoLetivo.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.mes").value(DEFAULT_MES))
            .andExpect(jsonPath("$.ano").value(DEFAULT_ANO));
    }

    @Test
    @Transactional
    public void getNonExistingPeriodoLetivo() throws Exception {
        // Get the periodoLetivo
        restPeriodoLetivoMockMvc.perform(get("/api/periodo-letivos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePeriodoLetivo() throws Exception {
        // Initialize the database
        periodoLetivoRepository.saveAndFlush(periodoLetivo);
        int databaseSizeBeforeUpdate = periodoLetivoRepository.findAll().size();

        // Update the periodoLetivo
        PeriodoLetivo updatedPeriodoLetivo = periodoLetivoRepository.findOne(periodoLetivo.getId());
        // Disconnect from session so that the updates on updatedPeriodoLetivo are not directly saved in db
        em.detach(updatedPeriodoLetivo);
        updatedPeriodoLetivo
            .codigo(UPDATED_CODIGO)
            .mes(UPDATED_MES)
            .ano(UPDATED_ANO);

        restPeriodoLetivoMockMvc.perform(put("/api/periodo-letivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPeriodoLetivo)))
            .andExpect(status().isOk());

        // Validate the PeriodoLetivo in the database
        List<PeriodoLetivo> periodoLetivoList = periodoLetivoRepository.findAll();
        assertThat(periodoLetivoList).hasSize(databaseSizeBeforeUpdate);
        PeriodoLetivo testPeriodoLetivo = periodoLetivoList.get(periodoLetivoList.size() - 1);
        assertThat(testPeriodoLetivo.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testPeriodoLetivo.getMes()).isEqualTo(UPDATED_MES);
        assertThat(testPeriodoLetivo.getAno()).isEqualTo(UPDATED_ANO);
    }

    @Test
    @Transactional
    public void updateNonExistingPeriodoLetivo() throws Exception {
        int databaseSizeBeforeUpdate = periodoLetivoRepository.findAll().size();

        // Create the PeriodoLetivo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPeriodoLetivoMockMvc.perform(put("/api/periodo-letivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodoLetivo)))
            .andExpect(status().isCreated());

        // Validate the PeriodoLetivo in the database
        List<PeriodoLetivo> periodoLetivoList = periodoLetivoRepository.findAll();
        assertThat(periodoLetivoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePeriodoLetivo() throws Exception {
        // Initialize the database
        periodoLetivoRepository.saveAndFlush(periodoLetivo);
        int databaseSizeBeforeDelete = periodoLetivoRepository.findAll().size();

        // Get the periodoLetivo
        restPeriodoLetivoMockMvc.perform(delete("/api/periodo-letivos/{id}", periodoLetivo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PeriodoLetivo> periodoLetivoList = periodoLetivoRepository.findAll();
        assertThat(periodoLetivoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PeriodoLetivo.class);
        PeriodoLetivo periodoLetivo1 = new PeriodoLetivo();
        periodoLetivo1.setId(1L);
        PeriodoLetivo periodoLetivo2 = new PeriodoLetivo();
        periodoLetivo2.setId(periodoLetivo1.getId());
        assertThat(periodoLetivo1).isEqualTo(periodoLetivo2);
        periodoLetivo2.setId(2L);
        assertThat(periodoLetivo1).isNotEqualTo(periodoLetivo2);
        periodoLetivo1.setId(null);
        assertThat(periodoLetivo1).isNotEqualTo(periodoLetivo2);
    }
}
