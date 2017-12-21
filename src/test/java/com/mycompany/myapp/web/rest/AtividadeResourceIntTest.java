package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.AawAtividade3App;

import com.mycompany.myapp.domain.Atividade;
import com.mycompany.myapp.repository.AtividadeRepository;
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
 * Test class for the AtividadeResource REST controller.
 *
 * @see AtividadeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AawAtividade3App.class)
public class AtividadeResourceIntTest {

    private static final Integer DEFAULT_CODIGO = 1;
    private static final Integer UPDATED_CODIGO = 2;

    private static final String DEFAULT_ROTEIRO = "AAAAAAAAAA";
    private static final String UPDATED_ROTEIRO = "BBBBBBBBBB";

    @Autowired
    private AtividadeRepository atividadeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAtividadeMockMvc;

    private Atividade atividade;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AtividadeResource atividadeResource = new AtividadeResource(atividadeRepository);
        this.restAtividadeMockMvc = MockMvcBuilders.standaloneSetup(atividadeResource)
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
    public static Atividade createEntity(EntityManager em) {
        Atividade atividade = new Atividade()
            .codigo(DEFAULT_CODIGO)
            .roteiro(DEFAULT_ROTEIRO);
        return atividade;
    }

    @Before
    public void initTest() {
        atividade = createEntity(em);
    }

    @Test
    @Transactional
    public void createAtividade() throws Exception {
        int databaseSizeBeforeCreate = atividadeRepository.findAll().size();

        // Create the Atividade
        restAtividadeMockMvc.perform(post("/api/atividades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atividade)))
            .andExpect(status().isCreated());

        // Validate the Atividade in the database
        List<Atividade> atividadeList = atividadeRepository.findAll();
        assertThat(atividadeList).hasSize(databaseSizeBeforeCreate + 1);
        Atividade testAtividade = atividadeList.get(atividadeList.size() - 1);
        assertThat(testAtividade.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testAtividade.getRoteiro()).isEqualTo(DEFAULT_ROTEIRO);
    }

    @Test
    @Transactional
    public void createAtividadeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = atividadeRepository.findAll().size();

        // Create the Atividade with an existing ID
        atividade.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAtividadeMockMvc.perform(post("/api/atividades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atividade)))
            .andExpect(status().isBadRequest());

        // Validate the Atividade in the database
        List<Atividade> atividadeList = atividadeRepository.findAll();
        assertThat(atividadeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAtividades() throws Exception {
        // Initialize the database
        atividadeRepository.saveAndFlush(atividade);

        // Get all the atividadeList
        restAtividadeMockMvc.perform(get("/api/atividades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(atividade.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].roteiro").value(hasItem(DEFAULT_ROTEIRO.toString())));
    }

    @Test
    @Transactional
    public void getAtividade() throws Exception {
        // Initialize the database
        atividadeRepository.saveAndFlush(atividade);

        // Get the atividade
        restAtividadeMockMvc.perform(get("/api/atividades/{id}", atividade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(atividade.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.roteiro").value(DEFAULT_ROTEIRO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAtividade() throws Exception {
        // Get the atividade
        restAtividadeMockMvc.perform(get("/api/atividades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAtividade() throws Exception {
        // Initialize the database
        atividadeRepository.saveAndFlush(atividade);
        int databaseSizeBeforeUpdate = atividadeRepository.findAll().size();

        // Update the atividade
        Atividade updatedAtividade = atividadeRepository.findOne(atividade.getId());
        // Disconnect from session so that the updates on updatedAtividade are not directly saved in db
        em.detach(updatedAtividade);
        updatedAtividade
            .codigo(UPDATED_CODIGO)
            .roteiro(UPDATED_ROTEIRO);

        restAtividadeMockMvc.perform(put("/api/atividades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAtividade)))
            .andExpect(status().isOk());

        // Validate the Atividade in the database
        List<Atividade> atividadeList = atividadeRepository.findAll();
        assertThat(atividadeList).hasSize(databaseSizeBeforeUpdate);
        Atividade testAtividade = atividadeList.get(atividadeList.size() - 1);
        assertThat(testAtividade.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testAtividade.getRoteiro()).isEqualTo(UPDATED_ROTEIRO);
    }

    @Test
    @Transactional
    public void updateNonExistingAtividade() throws Exception {
        int databaseSizeBeforeUpdate = atividadeRepository.findAll().size();

        // Create the Atividade

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAtividadeMockMvc.perform(put("/api/atividades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(atividade)))
            .andExpect(status().isCreated());

        // Validate the Atividade in the database
        List<Atividade> atividadeList = atividadeRepository.findAll();
        assertThat(atividadeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAtividade() throws Exception {
        // Initialize the database
        atividadeRepository.saveAndFlush(atividade);
        int databaseSizeBeforeDelete = atividadeRepository.findAll().size();

        // Get the atividade
        restAtividadeMockMvc.perform(delete("/api/atividades/{id}", atividade.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Atividade> atividadeList = atividadeRepository.findAll();
        assertThat(atividadeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Atividade.class);
        Atividade atividade1 = new Atividade();
        atividade1.setId(1L);
        Atividade atividade2 = new Atividade();
        atividade2.setId(atividade1.getId());
        assertThat(atividade1).isEqualTo(atividade2);
        atividade2.setId(2L);
        assertThat(atividade1).isNotEqualTo(atividade2);
        atividade1.setId(null);
        assertThat(atividade1).isNotEqualTo(atividade2);
    }
}
