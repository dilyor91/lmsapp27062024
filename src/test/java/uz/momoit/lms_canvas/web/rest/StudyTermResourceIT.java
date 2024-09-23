package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.StudyTermAsserts.*;
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
import uz.momoit.lms_canvas.domain.StudyTerm;
import uz.momoit.lms_canvas.repository.StudyTermRepository;
import uz.momoit.lms_canvas.service.dto.StudyTermDTO;
import uz.momoit.lms_canvas.service.mapper.StudyTermMapper;

/**
 * Integration tests for the {@link StudyTermResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StudyTermResourceIT {

    private static final String DEFAULT_TERM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TERM_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    private static final String ENTITY_API_URL = "/api/study-terms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private StudyTermRepository studyTermRepository;

    @Autowired
    private StudyTermMapper studyTermMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStudyTermMockMvc;

    private StudyTerm studyTerm;

    private StudyTerm insertedStudyTerm;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudyTerm createEntity() {
        return new StudyTerm().termName(DEFAULT_TERM_NAME).startDate(DEFAULT_START_DATE).endDate(DEFAULT_END_DATE).status(DEFAULT_STATUS);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudyTerm createUpdatedEntity() {
        return new StudyTerm().termName(UPDATED_TERM_NAME).startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE).status(UPDATED_STATUS);
    }

    @BeforeEach
    public void initTest() {
        studyTerm = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedStudyTerm != null) {
            studyTermRepository.delete(insertedStudyTerm);
            insertedStudyTerm = null;
        }
    }

    @Test
    @Transactional
    void createStudyTerm() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the StudyTerm
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);
        var returnedStudyTermDTO = om.readValue(
            restStudyTermMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studyTermDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            StudyTermDTO.class
        );

        // Validate the StudyTerm in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedStudyTerm = studyTermMapper.toEntity(returnedStudyTermDTO);
        assertStudyTermUpdatableFieldsEquals(returnedStudyTerm, getPersistedStudyTerm(returnedStudyTerm));

        insertedStudyTerm = returnedStudyTerm;
    }

    @Test
    @Transactional
    void createStudyTermWithExistingId() throws Exception {
        // Create the StudyTerm with an existing ID
        studyTerm.setId(1L);
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudyTermMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studyTermDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StudyTerm in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTermNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        studyTerm.setTermName(null);

        // Create the StudyTerm, which fails.
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);

        restStudyTermMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studyTermDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStartDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        studyTerm.setStartDate(null);

        // Create the StudyTerm, which fails.
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);

        restStudyTermMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studyTermDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEndDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        studyTerm.setEndDate(null);

        // Create the StudyTerm, which fails.
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);

        restStudyTermMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studyTermDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStatusIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        studyTerm.setStatus(null);

        // Create the StudyTerm, which fails.
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);

        restStudyTermMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studyTermDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllStudyTerms() throws Exception {
        // Initialize the database
        insertedStudyTerm = studyTermRepository.saveAndFlush(studyTerm);

        // Get all the studyTermList
        restStudyTermMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studyTerm.getId().intValue())))
            .andExpect(jsonPath("$.[*].termName").value(hasItem(DEFAULT_TERM_NAME)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())));
    }

    @Test
    @Transactional
    void getStudyTerm() throws Exception {
        // Initialize the database
        insertedStudyTerm = studyTermRepository.saveAndFlush(studyTerm);

        // Get the studyTerm
        restStudyTermMockMvc
            .perform(get(ENTITY_API_URL_ID, studyTerm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(studyTerm.getId().intValue()))
            .andExpect(jsonPath("$.termName").value(DEFAULT_TERM_NAME))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingStudyTerm() throws Exception {
        // Get the studyTerm
        restStudyTermMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingStudyTerm() throws Exception {
        // Initialize the database
        insertedStudyTerm = studyTermRepository.saveAndFlush(studyTerm);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studyTerm
        StudyTerm updatedStudyTerm = studyTermRepository.findById(studyTerm.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedStudyTerm are not directly saved in db
        em.detach(updatedStudyTerm);
        updatedStudyTerm.termName(UPDATED_TERM_NAME).startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE).status(UPDATED_STATUS);
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(updatedStudyTerm);

        restStudyTermMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studyTermDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studyTermDTO))
            )
            .andExpect(status().isOk());

        // Validate the StudyTerm in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedStudyTermToMatchAllProperties(updatedStudyTerm);
    }

    @Test
    @Transactional
    void putNonExistingStudyTerm() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyTerm.setId(longCount.incrementAndGet());

        // Create the StudyTerm
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudyTermMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studyTermDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studyTermDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudyTerm in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStudyTerm() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyTerm.setId(longCount.incrementAndGet());

        // Create the StudyTerm
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudyTermMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studyTermDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudyTerm in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStudyTerm() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyTerm.setId(longCount.incrementAndGet());

        // Create the StudyTerm
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudyTermMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studyTermDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudyTerm in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStudyTermWithPatch() throws Exception {
        // Initialize the database
        insertedStudyTerm = studyTermRepository.saveAndFlush(studyTerm);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studyTerm using partial update
        StudyTerm partialUpdatedStudyTerm = new StudyTerm();
        partialUpdatedStudyTerm.setId(studyTerm.getId());

        partialUpdatedStudyTerm.startDate(UPDATED_START_DATE).status(UPDATED_STATUS);

        restStudyTermMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudyTerm.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudyTerm))
            )
            .andExpect(status().isOk());

        // Validate the StudyTerm in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudyTermUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedStudyTerm, studyTerm),
            getPersistedStudyTerm(studyTerm)
        );
    }

    @Test
    @Transactional
    void fullUpdateStudyTermWithPatch() throws Exception {
        // Initialize the database
        insertedStudyTerm = studyTermRepository.saveAndFlush(studyTerm);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studyTerm using partial update
        StudyTerm partialUpdatedStudyTerm = new StudyTerm();
        partialUpdatedStudyTerm.setId(studyTerm.getId());

        partialUpdatedStudyTerm.termName(UPDATED_TERM_NAME).startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE).status(UPDATED_STATUS);

        restStudyTermMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudyTerm.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudyTerm))
            )
            .andExpect(status().isOk());

        // Validate the StudyTerm in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudyTermUpdatableFieldsEquals(partialUpdatedStudyTerm, getPersistedStudyTerm(partialUpdatedStudyTerm));
    }

    @Test
    @Transactional
    void patchNonExistingStudyTerm() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyTerm.setId(longCount.incrementAndGet());

        // Create the StudyTerm
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudyTermMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, studyTermDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studyTermDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudyTerm in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStudyTerm() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyTerm.setId(longCount.incrementAndGet());

        // Create the StudyTerm
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudyTermMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studyTermDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudyTerm in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStudyTerm() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studyTerm.setId(longCount.incrementAndGet());

        // Create the StudyTerm
        StudyTermDTO studyTermDTO = studyTermMapper.toDto(studyTerm);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudyTermMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(studyTermDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudyTerm in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStudyTerm() throws Exception {
        // Initialize the database
        insertedStudyTerm = studyTermRepository.saveAndFlush(studyTerm);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the studyTerm
        restStudyTermMockMvc
            .perform(delete(ENTITY_API_URL_ID, studyTerm.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return studyTermRepository.count();
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

    protected StudyTerm getPersistedStudyTerm(StudyTerm studyTerm) {
        return studyTermRepository.findById(studyTerm.getId()).orElseThrow();
    }

    protected void assertPersistedStudyTermToMatchAllProperties(StudyTerm expectedStudyTerm) {
        assertStudyTermAllPropertiesEquals(expectedStudyTerm, getPersistedStudyTerm(expectedStudyTerm));
    }

    protected void assertPersistedStudyTermToMatchUpdatableProperties(StudyTerm expectedStudyTerm) {
        assertStudyTermAllUpdatablePropertiesEquals(expectedStudyTerm, getPersistedStudyTerm(expectedStudyTerm));
    }
}
