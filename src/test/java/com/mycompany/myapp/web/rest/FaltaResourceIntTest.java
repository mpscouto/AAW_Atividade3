package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.AawAtividade3App;

import com.mycompany.myapp.domain.Falta;
import com.mycompany.myapp.repository.FaltaRepository;
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
 * Test class for the FaltaResource REST controller.
 *
 * @see FaltaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AawAtividade3App.class)
public class FaltaResourceIntTest {

    private static final Integer DEFAULT_CODIGO = 1;
    private static final Integer UPDATED_CODIGO = 2;

    private static final Integer DEFAULT_NUM_FALTAS = 1;
    private static final Integer UPDATED_NUM_FALTAS = 2;

    @Autowired
    private FaltaRepository faltaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFaltaMockMvc;

    private Falta falta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FaltaResource faltaResource = new FaltaResource(faltaRepository);
        this.restFaltaMockMvc = MockMvcBuilders.standaloneSetup(faltaResource)
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
    public static Falta createEntity(EntityManager em) {
        Falta falta = new Falta()
            .codigo(DEFAULT_CODIGO)
            .numFaltas(DEFAULT_NUM_FALTAS);
        return falta;
    }

    @Before
    public void initTest() {
        falta = createEntity(em);
    }

    @Test
    @Transactional
    public void createFalta() throws Exception {
        int databaseSizeBeforeCreate = faltaRepository.findAll().size();

        // Create the Falta
        restFaltaMockMvc.perform(post("/api/faltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(falta)))
            .andExpect(status().isCreated());

        // Validate the Falta in the database
        List<Falta> faltaList = faltaRepository.findAll();
        assertThat(faltaList).hasSize(databaseSizeBeforeCreate + 1);
        Falta testFalta = faltaList.get(faltaList.size() - 1);
        assertThat(testFalta.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testFalta.getNumFaltas()).isEqualTo(DEFAULT_NUM_FALTAS);
    }

    @Test
    @Transactional
    public void createFaltaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = faltaRepository.findAll().size();

        // Create the Falta with an existing ID
        falta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFaltaMockMvc.perform(post("/api/faltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(falta)))
            .andExpect(status().isBadRequest());

        // Validate the Falta in the database
        List<Falta> faltaList = faltaRepository.findAll();
        assertThat(faltaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFaltas() throws Exception {
        // Initialize the database
        faltaRepository.saveAndFlush(falta);

        // Get all the faltaList
        restFaltaMockMvc.perform(get("/api/faltas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(falta.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].numFaltas").value(hasItem(DEFAULT_NUM_FALTAS)));
    }

    @Test
    @Transactional
    public void getFalta() throws Exception {
        // Initialize the database
        faltaRepository.saveAndFlush(falta);

        // Get the falta
        restFaltaMockMvc.perform(get("/api/faltas/{id}", falta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(falta.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.numFaltas").value(DEFAULT_NUM_FALTAS));
    }

    @Test
    @Transactional
    public void getNonExistingFalta() throws Exception {
        // Get the falta
        restFaltaMockMvc.perform(get("/api/faltas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFalta() throws Exception {
        // Initialize the database
        faltaRepository.saveAndFlush(falta);
        int databaseSizeBeforeUpdate = faltaRepository.findAll().size();

        // Update the falta
        Falta updatedFalta = faltaRepository.findOne(falta.getId());
        // Disconnect from session so that the updates on updatedFalta are not directly saved in db
        em.detach(updatedFalta);
        updatedFalta
            .codigo(UPDATED_CODIGO)
            .numFaltas(UPDATED_NUM_FALTAS);

        restFaltaMockMvc.perform(put("/api/faltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFalta)))
            .andExpect(status().isOk());

        // Validate the Falta in the database
        List<Falta> faltaList = faltaRepository.findAll();
        assertThat(faltaList).hasSize(databaseSizeBeforeUpdate);
        Falta testFalta = faltaList.get(faltaList.size() - 1);
        assertThat(testFalta.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testFalta.getNumFaltas()).isEqualTo(UPDATED_NUM_FALTAS);
    }

    @Test
    @Transactional
    public void updateNonExistingFalta() throws Exception {
        int databaseSizeBeforeUpdate = faltaRepository.findAll().size();

        // Create the Falta

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFaltaMockMvc.perform(put("/api/faltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(falta)))
            .andExpect(status().isCreated());

        // Validate the Falta in the database
        List<Falta> faltaList = faltaRepository.findAll();
        assertThat(faltaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFalta() throws Exception {
        // Initialize the database
        faltaRepository.saveAndFlush(falta);
        int databaseSizeBeforeDelete = faltaRepository.findAll().size();

        // Get the falta
        restFaltaMockMvc.perform(delete("/api/faltas/{id}", falta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Falta> faltaList = faltaRepository.findAll();
        assertThat(faltaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Falta.class);
        Falta falta1 = new Falta();
        falta1.setId(1L);
        Falta falta2 = new Falta();
        falta2.setId(falta1.getId());
        assertThat(falta1).isEqualTo(falta2);
        falta2.setId(2L);
        assertThat(falta1).isNotEqualTo(falta2);
        falta1.setId(null);
        assertThat(falta1).isNotEqualTo(falta2);
    }
}
