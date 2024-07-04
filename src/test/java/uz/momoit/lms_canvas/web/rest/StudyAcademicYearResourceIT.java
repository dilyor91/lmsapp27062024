package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.StudyAcademicYearAsserts.*;
import static uz.momoit.lms_canvas.web.rest.TestUtil.createUpdateProxyForBean;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
import uz.momoit.lms_canvas.domain.StudyAcademicYear;
import uz.momoit.lms_canvas.repository.StudyAcademicYearRepository;
import uz.momoit.lms_canvas.service.dto.StudyAcademicYearDTO;
import uz.momoit.lms_canvas.service.mapper.StudyAcademicYearMapper;

/**
 * Integration tests for the {@link StudyAcademicYearResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StudyAcademicYearResourceIT {

    private static final Instant DEFAULT_FROM_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FROM_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/study-academic-years";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private StudyAcademicYearRepository studyAcademicYearRepository;

    @Autowired
    private StudyAcademicYearMapper studyAcademicYearMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStudyAcademicYearMockMvc;

    private StudyAcademicYear studyAcademicYear;

    private StudyAcademicYear insertedStudyAcademicYear;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudyAcademicYear createEntity(EntityManager em) {
        StudyAcademicYear studyAcademicYear = new StudyAcademicYear().fromDate(DEFAULT_FROM_DATE).endDate(DEFAULT_END_DATE);
        return studyAcademicYear;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudyAcademicYear createUpdatedEntity(EntityManager em) {
        StudyAcademicYear studyAcademicYear = new StudyAcademicYear().fromDate(UPDATED_FROM_DATE).endDate(UPDATED_END_DATE);
        return studyAcademicYear;
    }

    @BeforeEach
    public void initTest() {
        studyAcademicYear = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedStudyAcademicYear != null) {
            studyAcademicYearRepository.delete(insertedStudyAcademicYear);
            insertedStudyAcademicYear = null;
        }
    }

    @Test
    @Transactional
    void createStudyAcademicYear() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the StudyAcademicYear
        StudyAcademicYearDTO studyAcademicYearDTO = studyAcademicYearMapper.toDto(studyAcademicYear);
        var returnedStudyAcademicYearDTO = om.readValue(
            restStudyAcademicYearMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studyAcademicYearDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            StudyAcademicYearDTO.class
        );

        // Validate the StudyAcademicYear in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedStudyAcademicYear = studyAcademicYearMapper.toEntity(returnedStudyAcademicYearDTO);
        assertStudyAcademicYearUpdatableFieldsEquals(returnedStudyAcademicYear, getPersistedStudyAcademicYear(returnedStudyAcademicYear));

        insertedStudyAcademicYear = returnedStudyAcademicYear;
    }

    @Test
    @Transactional
    void createStudyAcademicYearWithExistingId() throws Exception {
        // Create the StudyAcademicYear with an existing ID
        studyAcademicYear.setId(1L);
        StudyAcademicYearDTO studyAcademicYearDTO = studyAcademicYearMapper.toDto(studyAcademicYear);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudyAcademicYearMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studyAcademicYearDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StudyAcademicYear in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllStudyAcademicYears() throws Exception {
        // Initialize the database
        insertedStudyAcademicYear = studyAcademicYearRepository.saveAndFlush(studyAcademicYear);

        // Get all the studyAcademicYearList
        restStudyAcademicYearMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studyAcademicYear.getId().intValue())))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(DEFAULT_FROM_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    void getStudyAcademicYear() throws Exception {
        // Initialize the database
        insertedStudyAcademicYear = studyAcademicYearRepository.saveAndFlush(studyAcademicYear);

        // Get the studyAcademicYear
        restStudyAcademicYearMockMvc
            .perform(get(ENTITY_API_URL_ID, studyAcademicYear.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(studyAcademicYear.getId().intValue()))
            .andExpect(jsonPath("$.fromDate").value(DEFAULT_FROM_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingStudyAcademicYear() throws Exception {
        // Get the studyAcademicYear
        restStudyAcademicYearMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingStudyAcademicYear() throws Exception {
        // Initialize the database
        insertedStudyAcademicYear = studyAcademicYearRepository.saveAndFlush(studyAcademicYear);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studyAcademicYear
        StudyAcademicYear updatedStudyAcademicYear = studyAcademicYearRepository.findById(studyAcademicYear.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedStudyAcademicYear are not directly saved in db
        em.detach(updatedStudyAcademicYear);
        updatedStudyAcademicYear.fromDate(UPDATED_FROM_DATE).endDate(UPDATED_END_DATE);
        StudyAcademicYearDTO studyAcademicYearDTO = studyAcademicYearMapper.toDto(updatedStudyAcademicYear);

        restStudyAcademicYearMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studyAcademicYearDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studyAcademicYearDTO))
            )
            .andExpect(status().isOk());

        // Validate the StudyAcademicYear in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedStudyAcademicYearToMatchAllProperties(updatedStudyAcademicYear);
    }

    @Test
    @Transactional
    void putNonExistingStudyAcademicYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyAcademicYear.setId(longCount.incrementAndGet());

        // Create the StudyAcademicYear
        StudyAcademicYearDTO studyAcademicYearDTO = studyAcademicYearMapper.toDto(studyAcademicYear);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudyAcademicYearMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studyAcademicYearDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studyAcademicYearDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudyAcademicYear in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStudyAcademicYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyAcademicYear.setId(longCount.incrementAndGet());

        // Create the StudyAcademicYear
        StudyAcademicYearDTO studyAcademicYearDTO = studyAcademicYearMapper.toDto(studyAcademicYear);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudyAcademicYearMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studyAcademicYearDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudyAcademicYear in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStudyAcademicYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyAcademicYear.setId(longCount.incrementAndGet());

        // Create the StudyAcademicYear
        StudyAcademicYearDTO studyAcademicYearDTO = studyAcademicYearMapper.toDto(studyAcademicYear);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudyAcademicYearMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studyAcademicYearDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudyAcademicYear in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStudyAcademicYearWithPatch() throws Exception {
        // Initialize the database
        insertedStudyAcademicYear = studyAcademicYearRepository.saveAndFlush(studyAcademicYear);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studyAcademicYear using partial update
        StudyAcademicYear partialUpdatedStudyAcademicYear = new StudyAcademicYear();
        partialUpdatedStudyAcademicYear.setId(studyAcademicYear.getId());

        partialUpdatedStudyAcademicYear.endDate(UPDATED_END_DATE);

        restStudyAcademicYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudyAcademicYear.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudyAcademicYear))
            )
            .andExpect(status().isOk());

        // Validate the StudyAcademicYear in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudyAcademicYearUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedStudyAcademicYear, studyAcademicYear),
            getPersistedStudyAcademicYear(studyAcademicYear)
        );
    }

    @Test
    @Transactional
    void fullUpdateStudyAcademicYearWithPatch() throws Exception {
        // Initialize the database
        insertedStudyAcademicYear = studyAcademicYearRepository.saveAndFlush(studyAcademicYear);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studyAcademicYear using partial update
        StudyAcademicYear partialUpdatedStudyAcademicYear = new StudyAcademicYear();
        partialUpdatedStudyAcademicYear.setId(studyAcademicYear.getId());

        partialUpdatedStudyAcademicYear.fromDate(UPDATED_FROM_DATE).endDate(UPDATED_END_DATE);

        restStudyAcademicYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudyAcademicYear.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudyAcademicYear))
            )
            .andExpect(status().isOk());

        // Validate the StudyAcademicYear in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudyAcademicYearUpdatableFieldsEquals(
            partialUpdatedStudyAcademicYear,
            getPersistedStudyAcademicYear(partialUpdatedStudyAcademicYear)
        );
    }

    @Test
    @Transactional
    void patchNonExistingStudyAcademicYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyAcademicYear.setId(longCount.incrementAndGet());

        // Create the StudyAcademicYear
        StudyAcademicYearDTO studyAcademicYearDTO = studyAcademicYearMapper.toDto(studyAcademicYear);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudyAcademicYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, studyAcademicYearDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studyAcademicYearDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudyAcademicYear in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStudyAcademicYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyAcademicYear.setId(longCount.incrementAndGet());

        // Create the StudyAcademicYear
        StudyAcademicYearDTO studyAcademicYearDTO = studyAcademicYearMapper.toDto(studyAcademicYear);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudyAcademicYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studyAcademicYearDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudyAcademicYear in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStudyAcademicYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyAcademicYear.setId(longCount.incrementAndGet());

        // Create the StudyAcademicYear
        StudyAcademicYearDTO studyAcademicYearDTO = studyAcademicYearMapper.toDto(studyAcademicYear);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudyAcademicYearMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(studyAcademicYearDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudyAcademicYear in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStudyAcademicYear() throws Exception {
        // Initialize the database
        insertedStudyAcademicYear = studyAcademicYearRepository.saveAndFlush(studyAcademicYear);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the studyAcademicYear
        restStudyAcademicYearMockMvc
            .perform(delete(ENTITY_API_URL_ID, studyAcademicYear.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return studyAcademicYearRepository.count();
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

    protected StudyAcademicYear getPersistedStudyAcademicYear(StudyAcademicYear studyAcademicYear) {
        return studyAcademicYearRepository.findById(studyAcademicYear.getId()).orElseThrow();
    }

    protected void assertPersistedStudyAcademicYearToMatchAllProperties(StudyAcademicYear expectedStudyAcademicYear) {
        assertStudyAcademicYearAllPropertiesEquals(expectedStudyAcademicYear, getPersistedStudyAcademicYear(expectedStudyAcademicYear));
    }

    protected void assertPersistedStudyAcademicYearToMatchUpdatableProperties(StudyAcademicYear expectedStudyAcademicYear) {
        assertStudyAcademicYearAllUpdatablePropertiesEquals(
            expectedStudyAcademicYear,
            getPersistedStudyAcademicYear(expectedStudyAcademicYear)
        );
    }
}
