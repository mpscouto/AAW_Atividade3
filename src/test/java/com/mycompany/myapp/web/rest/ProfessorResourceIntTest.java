package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.AawAtividade3App;

import com.mycompany.myapp.domain.Professor;
import com.mycompany.myapp.repository.ProfessorRepository;
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
 * Test class for the ProfessorResource REST controller.
 *
 * @see ProfessorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AawAtividade3App.class)
public class ProfessorResourceIntTest {

    private static final Integer DEFAULT_CODIGO = 1;
    private static final Integer UPDATED_CODIGO = 2;

    private static final String DEFAULT_GRAU = "AAAAAAAAAA";
    private static final String UPDATED_GRAU = "BBBBBBBBBB";

    private static final Double DEFAULT_SALARIO = 1D;
    private static final Double UPDATED_SALARIO = 2D;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProfessorMockMvc;

    private Professor professor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfessorResource professorResource = new ProfessorResource(professorRepository);
        this.restProfessorMockMvc = MockMvcBuilders.standaloneSetup(professorResource)
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
    public static Professor createEntity(EntityManager em) {
        Professor professor = new Professor()
            .codigo(DEFAULT_CODIGO)
            .grau(DEFAULT_GRAU)
            .salario(DEFAULT_SALARIO);
        return professor;
    }

    @Before
    public void initTest() {
        professor = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfessor() throws Exception {
        int databaseSizeBeforeCreate = professorRepository.findAll().size();

        // Create the Professor
        restProfessorMockMvc.perform(post("/api/professors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professor)))
            .andExpect(status().isCreated());

        // Validate the Professor in the database
        List<Professor> professorList = professorRepository.findAll();
        assertThat(professorList).hasSize(databaseSizeBeforeCreate + 1);
        Professor testProfessor = professorList.get(professorList.size() - 1);
        assertThat(testProfessor.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testProfessor.getGrau()).isEqualTo(DEFAULT_GRAU);
        assertThat(testProfessor.getSalario()).isEqualTo(DEFAULT_SALARIO);
    }

    @Test
    @Transactional
    public void createProfessorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = professorRepository.findAll().size();

        // Create the Professor with an existing ID
        professor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfessorMockMvc.perform(post("/api/professors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professor)))
            .andExpect(status().isBadRequest());

        // Validate the Professor in the database
        List<Professor> professorList = professorRepository.findAll();
        assertThat(professorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProfessors() throws Exception {
        // Initialize the database
        professorRepository.saveAndFlush(professor);

        // Get all the professorList
        restProfessorMockMvc.perform(get("/api/professors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(professor.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].grau").value(hasItem(DEFAULT_GRAU.toString())))
            .andExpect(jsonPath("$.[*].salario").value(hasItem(DEFAULT_SALARIO.doubleValue())));
    }

    @Test
    @Transactional
    public void getProfessor() throws Exception {
        // Initialize the database
        professorRepository.saveAndFlush(professor);

        // Get the professor
        restProfessorMockMvc.perform(get("/api/professors/{id}", professor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(professor.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.grau").value(DEFAULT_GRAU.toString()))
            .andExpect(jsonPath("$.salario").value(DEFAULT_SALARIO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProfessor() throws Exception {
        // Get the professor
        restProfessorMockMvc.perform(get("/api/professors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfessor() throws Exception {
        // Initialize the database
        professorRepository.saveAndFlush(professor);
        int databaseSizeBeforeUpdate = professorRepository.findAll().size();

        // Update the professor
        Professor updatedProfessor = professorRepository.findOne(professor.getId());
        // Disconnect from session so that the updates on updatedProfessor are not directly saved in db
        em.detach(updatedProfessor);
        updatedProfessor
            .codigo(UPDATED_CODIGO)
            .grau(UPDATED_GRAU)
            .salario(UPDATED_SALARIO);

        restProfessorMockMvc.perform(put("/api/professors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfessor)))
            .andExpect(status().isOk());

        // Validate the Professor in the database
        List<Professor> professorList = professorRepository.findAll();
        assertThat(professorList).hasSize(databaseSizeBeforeUpdate);
        Professor testProfessor = professorList.get(professorList.size() - 1);
        assertThat(testProfessor.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testProfessor.getGrau()).isEqualTo(UPDATED_GRAU);
        assertThat(testProfessor.getSalario()).isEqualTo(UPDATED_SALARIO);
    }

    @Test
    @Transactional
    public void updateNonExistingProfessor() throws Exception {
        int databaseSizeBeforeUpdate = professorRepository.findAll().size();

        // Create the Professor

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProfessorMockMvc.perform(put("/api/professors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professor)))
            .andExpect(status().isCreated());

        // Validate the Professor in the database
        List<Professor> professorList = professorRepository.findAll();
        assertThat(professorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProfessor() throws Exception {
        // Initialize the database
        professorRepository.saveAndFlush(professor);
        int databaseSizeBeforeDelete = professorRepository.findAll().size();

        // Get the professor
        restProfessorMockMvc.perform(delete("/api/professors/{id}", professor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Professor> professorList = professorRepository.findAll();
        assertThat(professorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Professor.class);
        Professor professor1 = new Professor();
        professor1.setId(1L);
        Professor professor2 = new Professor();
        professor2.setId(professor1.getId());
        assertThat(professor1).isEqualTo(professor2);
        professor2.setId(2L);
        assertThat(professor1).isNotEqualTo(professor2);
        professor1.setId(null);
        assertThat(professor1).isNotEqualTo(professor2);
    }
}
