package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.SpecialityAsserts.*;
import static uz.momoit.lms_canvas.web.rest.TestUtil.createUpdateProxyForBean;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.IntegrationTest;
import uz.momoit.lms_canvas.domain.Speciality;
import uz.momoit.lms_canvas.repository.SpecialityRepository;
import uz.momoit.lms_canvas.service.dto.SpecialityDTO;
import uz.momoit.lms_canvas.service.mapper.SpecialityMapper;

/**
 * Integration tests for the {@link SpecialityResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SpecialityResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/specialities";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private SpecialityRepository specialityRepository;

    @Autowired
    private SpecialityMapper specialityMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSpecialityMockMvc;

    private Speciality speciality;

    private Speciality insertedSpeciality;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Speciality createEntity(EntityManager em) {
        Speciality speciality = new Speciality().name(DEFAULT_NAME);
        return speciality;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Speciality createUpdatedEntity(EntityManager em) {
        Speciality speciality = new Speciality().name(UPDATED_NAME);
        return speciality;
    }

    @BeforeEach
    public void initTest() {
        speciality = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedSpeciality != null) {
            specialityRepository.delete(insertedSpeciality);
            insertedSpeciality = null;
        }
    }

    @Test
    @Transactional
    void createSpeciality() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Speciality
        SpecialityDTO specialityDTO = specialityMapper.toDto(speciality);
        var returnedSpecialityDTO = om.readValue(
            restSpecialityMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(specialityDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            SpecialityDTO.class
        );

        // Validate the Speciality in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedSpeciality = specialityMapper.toEntity(returnedSpecialityDTO);
        assertSpecialityUpdatableFieldsEquals(returnedSpeciality, getPersistedSpeciality(returnedSpeciality));

        insertedSpeciality = returnedSpeciality;
    }

    @Test
    @Transactional
    void createSpecialityWithExistingId() throws Exception {
        // Create the Speciality with an existing ID
        speciality.setId(1L);
        SpecialityDTO specialityDTO = specialityMapper.toDto(speciality);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpecialityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(specialityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Speciality in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSpecialities() throws Exception {
        // Initialize the database
        insertedSpeciality = specialityRepository.saveAndFlush(speciality);

        // Get all the specialityList
        restSpecialityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(speciality.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getSpeciality() throws Exception {
        // Initialize the database
        insertedSpeciality = specialityRepository.saveAndFlush(speciality);

        // Get the speciality
        restSpecialityMockMvc
            .perform(get(ENTITY_API_URL_ID, speciality.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(speciality.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingSpeciality() throws Exception {
        // Get the speciality
        restSpecialityMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSpeciality() throws Exception {
        // Initialize the database
        insertedSpeciality = specialityRepository.saveAndFlush(speciality);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the speciality
        Speciality updatedSpeciality = specialityRepository.findById(speciality.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedSpeciality are not directly saved in db
        em.detach(updatedSpeciality);
        updatedSpeciality.name(UPDATED_NAME);
        SpecialityDTO specialityDTO = specialityMapper.toDto(updatedSpeciality);

        restSpecialityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, specialityDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(specialityDTO))
            )
            .andExpect(status().isOk());

        // Validate the Speciality in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedSpecialityToMatchAllProperties(updatedSpeciality);
    }

    @Test
    @Transactional
    void putNonExistingSpeciality() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        speciality.setId(longCount.incrementAndGet());

        // Create the Speciality
        SpecialityDTO specialityDTO = specialityMapper.toDto(speciality);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpecialityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, specialityDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(specialityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Speciality in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSpeciality() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        speciality.setId(longCount.incrementAndGet());

        // Create the Speciality
        SpecialityDTO specialityDTO = specialityMapper.toDto(speciality);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSpecialityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(specialityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Speciality in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSpeciality() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        speciality.setId(longCount.incrementAndGet());

        // Create the Speciality
        SpecialityDTO specialityDTO = specialityMapper.toDto(speciality);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSpecialityMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(specialityDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Speciality in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSpecialityWithPatch() throws Exception {
        // Initialize the database
        insertedSpeciality = specialityRepository.saveAndFlush(speciality);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the speciality using partial update
        Speciality partialUpdatedSpeciality = new Speciality();
        partialUpdatedSpeciality.setId(speciality.getId());

        restSpecialityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSpeciality.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSpeciality))
            )
            .andExpect(status().isOk());

        // Validate the Speciality in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSpecialityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedSpeciality, speciality),
            getPersistedSpeciality(speciality)
        );
    }

    @Test
    @Transactional
    void fullUpdateSpecialityWithPatch() throws Exception {
        // Initialize the database
        insertedSpeciality = specialityRepository.saveAndFlush(speciality);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the speciality using partial update
        Speciality partialUpdatedSpeciality = new Speciality();
        partialUpdatedSpeciality.setId(speciality.getId());

        partialUpdatedSpeciality.name(UPDATED_NAME);

        restSpecialityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSpeciality.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSpeciality))
            )
            .andExpect(status().isOk());

        // Validate the Speciality in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSpecialityUpdatableFieldsEquals(partialUpdatedSpeciality, getPersistedSpeciality(partialUpdatedSpeciality));
    }

    @Test
    @Transactional
    void patchNonExistingSpeciality() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        speciality.setId(longCount.incrementAndGet());

        // Create the Speciality
        SpecialityDTO specialityDTO = specialityMapper.toDto(speciality);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpecialityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, specialityDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(specialityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Speciality in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSpeciality() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        speciality.setId(longCount.incrementAndGet());

        // Create the Speciality
        SpecialityDTO specialityDTO = specialityMapper.toDto(speciality);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSpecialityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(specialityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Speciality in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSpeciality() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        speciality.setId(longCount.incrementAndGet());

        // Create the Speciality
        SpecialityDTO specialityDTO = specialityMapper.toDto(speciality);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSpecialityMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(specialityDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Speciality in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSpeciality() throws Exception {
        // Initialize the database
        insertedSpeciality = specialityRepository.saveAndFlush(speciality);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the speciality
        restSpecialityMockMvc
            .perform(delete(ENTITY_API_URL_ID, speciality.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return specialityRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Speciality getPersistedSpeciality(Speciality speciality) {
        return specialityRepository.findById(speciality.getId()).orElseThrow();
    }

    protected void assertPersistedSpecialityToMatchAllProperties(Speciality expectedSpeciality) {
        assertSpecialityAllPropertiesEquals(expectedSpeciality, getPersistedSpeciality(expectedSpeciality));
    }

    protected void assertPersistedSpecialityToMatchUpdatableProperties(Speciality expectedSpeciality) {
        assertSpecialityAllUpdatablePropertiesEquals(expectedSpeciality, getPersistedSpeciality(expectedSpeciality));
    }
}
