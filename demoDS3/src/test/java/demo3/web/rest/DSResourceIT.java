package demo3.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import demo3.IntegrationTest;
import demo3.domain.DS;
import demo3.repository.DSRepository;
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
 * Integration tests for the {@link DSResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DSResourceIT {

    private static final String ENTITY_API_URL = "/api/ds";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DSRepository dSRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDSMockMvc;

    private DS dS;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DS createEntity(EntityManager em) {
        DS dS = new DS();
        return dS;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DS createUpdatedEntity(EntityManager em) {
        DS dS = new DS();
        return dS;
    }

    @BeforeEach
    public void initTest() {
        dS = createEntity(em);
    }

    @Test
    @Transactional
    void getAllDS() throws Exception {
        // Initialize the database
        dSRepository.saveAndFlush(dS);

        // Get all the dSList
        restDSMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dS.getId().intValue())));
    }

    @Test
    @Transactional
    void getDS() throws Exception {
        // Initialize the database
        dSRepository.saveAndFlush(dS);

        // Get the dS
        restDSMockMvc
            .perform(get(ENTITY_API_URL_ID, dS.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dS.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingDS() throws Exception {
        // Get the dS
        restDSMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }
}
