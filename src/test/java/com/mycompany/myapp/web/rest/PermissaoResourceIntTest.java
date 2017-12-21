package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.AawAtividade3App;

import com.mycompany.myapp.domain.Permissao;
import com.mycompany.myapp.repository.PermissaoRepository;
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
 * Test class for the PermissaoResource REST controller.
 *
 * @see PermissaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AawAtividade3App.class)
public class PermissaoResourceIntTest {

    private static final Integer DEFAULT_CODIGO = 1;
    private static final Integer UPDATED_CODIGO = 2;

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    @Autowired
    private PermissaoRepository permissaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPermissaoMockMvc;

    private Permissao permissao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PermissaoResource permissaoResource = new PermissaoResource(permissaoRepository);
        this.restPermissaoMockMvc = MockMvcBuilders.standaloneSetup(permissaoResource)
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
    public static Permissao createEntity(EntityManager em) {
        Permissao permissao = new Permissao()
            .codigo(DEFAULT_CODIGO)
            .tipo(DEFAULT_TIPO);
        return permissao;
    }

    @Before
    public void initTest() {
        permissao = createEntity(em);
    }

    @Test
    @Transactional
    public void createPermissao() throws Exception {
        int databaseSizeBeforeCreate = permissaoRepository.findAll().size();

        // Create the Permissao
        restPermissaoMockMvc.perform(post("/api/permissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permissao)))
            .andExpect(status().isCreated());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeCreate + 1);
        Permissao testPermissao = permissaoList.get(permissaoList.size() - 1);
        assertThat(testPermissao.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testPermissao.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createPermissaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = permissaoRepository.findAll().size();

        // Create the Permissao with an existing ID
        permissao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPermissaoMockMvc.perform(post("/api/permissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permissao)))
            .andExpect(status().isBadRequest());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPermissaos() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);

        // Get all the permissaoList
        restPermissaoMockMvc.perform(get("/api/permissaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(permissao.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }

    @Test
    @Transactional
    public void getPermissao() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);

        // Get the permissao
        restPermissaoMockMvc.perform(get("/api/permissaos/{id}", permissao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(permissao.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPermissao() throws Exception {
        // Get the permissao
        restPermissaoMockMvc.perform(get("/api/permissaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePermissao() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);
        int databaseSizeBeforeUpdate = permissaoRepository.findAll().size();

        // Update the permissao
        Permissao updatedPermissao = permissaoRepository.findOne(permissao.getId());
        // Disconnect from session so that the updates on updatedPermissao are not directly saved in db
        em.detach(updatedPermissao);
        updatedPermissao
            .codigo(UPDATED_CODIGO)
            .tipo(UPDATED_TIPO);

        restPermissaoMockMvc.perform(put("/api/permissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPermissao)))
            .andExpect(status().isOk());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeUpdate);
        Permissao testPermissao = permissaoList.get(permissaoList.size() - 1);
        assertThat(testPermissao.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testPermissao.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingPermissao() throws Exception {
        int databaseSizeBeforeUpdate = permissaoRepository.findAll().size();

        // Create the Permissao

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPermissaoMockMvc.perform(put("/api/permissaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(permissao)))
            .andExpect(status().isCreated());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePermissao() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);
        int databaseSizeBeforeDelete = permissaoRepository.findAll().size();

        // Get the permissao
        restPermissaoMockMvc.perform(delete("/api/permissaos/{id}", permissao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Permissao.class);
        Permissao permissao1 = new Permissao();
        permissao1.setId(1L);
        Permissao permissao2 = new Permissao();
        permissao2.setId(permissao1.getId());
        assertThat(permissao1).isEqualTo(permissao2);
        permissao2.setId(2L);
        assertThat(permissao1).isNotEqualTo(permissao2);
        permissao1.setId(null);
        assertThat(permissao1).isNotEqualTo(permissao2);
    }
}
