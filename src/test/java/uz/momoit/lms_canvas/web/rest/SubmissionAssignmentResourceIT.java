package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.SubmissionAssignmentAsserts.*;
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
import uz.momoit.lms_canvas.domain.SubmissionAssignment;
import uz.momoit.lms_canvas.repository.SubmissionAssignmentRepository;
import uz.momoit.lms_canvas.service.dto.SubmissionAssignmentDTO;
import uz.momoit.lms_canvas.service.mapper.SubmissionAssignmentMapper;

/**
 * Integration tests for the {@link SubmissionAssignmentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SubmissionAssignmentResourceIT {

    private static final Instant DEFAULT_SUBMISSION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SUBMISSION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_ATTEMPS_NUMBER = 1;
    private static final Integer UPDATED_ATTEMPS_NUMBER = 2;

    private static final String ENTITY_API_URL = "/api/submission-assignments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private SubmissionAssignmentRepository submissionAssignmentRepository;

    @Autowired
    private SubmissionAssignmentMapper submissionAssignmentMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubmissionAssignmentMockMvc;

    private SubmissionAssignment submissionAssignment;

    private SubmissionAssignment insertedSubmissionAssignment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubmissionAssignment createEntity() {
        return new SubmissionAssignment()
            .submissionDate(DEFAULT_SUBMISSION_DATE)
            .content(DEFAULT_CONTENT)
            .comment(DEFAULT_COMMENT)
            .attempsNumber(DEFAULT_ATTEMPS_NUMBER);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubmissionAssignment createUpdatedEntity() {
        return new SubmissionAssignment()
            .submissionDate(UPDATED_SUBMISSION_DATE)
            .content(UPDATED_CONTENT)
            .comment(UPDATED_COMMENT)
            .attempsNumber(UPDATED_ATTEMPS_NUMBER);
    }

    @BeforeEach
    public void initTest() {
        submissionAssignment = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedSubmissionAssignment != null) {
            submissionAssignmentRepository.delete(insertedSubmissionAssignment);
            insertedSubmissionAssignment = null;
        }
    }

    @Test
    @Transactional
    void createSubmissionAssignment() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the SubmissionAssignment
        SubmissionAssignmentDTO submissionAssignmentDTO = submissionAssignmentMapper.toDto(submissionAssignment);
        var returnedSubmissionAssignmentDTO = om.readValue(
            restSubmissionAssignmentMockMvc
                .perform(
                    post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(submissionAssignmentDTO))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            SubmissionAssignmentDTO.class
        );

        // Validate the SubmissionAssignment in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedSubmissionAssignment = submissionAssignmentMapper.toEntity(returnedSubmissionAssignmentDTO);
        assertSubmissionAssignmentUpdatableFieldsEquals(
            returnedSubmissionAssignment,
            getPersistedSubmissionAssignment(returnedSubmissionAssignment)
        );

        insertedSubmissionAssignment = returnedSubmissionAssignment;
    }

    @Test
    @Transactional
    void createSubmissionAssignmentWithExistingId() throws Exception {
        // Create the SubmissionAssignment with an existing ID
        submissionAssignment.setId(1L);
        SubmissionAssignmentDTO submissionAssignmentDTO = submissionAssignmentMapper.toDto(submissionAssignment);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubmissionAssignmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(submissionAssignmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubmissionAssignment in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSubmissionAssignments() throws Exception {
        // Initialize the database
        insertedSubmissionAssignment = submissionAssignmentRepository.saveAndFlush(submissionAssignment);

        // Get all the submissionAssignmentList
        restSubmissionAssignmentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(submissionAssignment.getId().intValue())))
            .andExpect(jsonPath("$.[*].submissionDate").value(hasItem(DEFAULT_SUBMISSION_DATE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)))
            .andExpect(jsonPath("$.[*].attempsNumber").value(hasItem(DEFAULT_ATTEMPS_NUMBER)));
    }

    @Test
    @Transactional
    void getSubmissionAssignment() throws Exception {
        // Initialize the database
        insertedSubmissionAssignment = submissionAssignmentRepository.saveAndFlush(submissionAssignment);

        // Get the submissionAssignment
        restSubmissionAssignmentMockMvc
            .perform(get(ENTITY_API_URL_ID, submissionAssignment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(submissionAssignment.getId().intValue()))
            .andExpect(jsonPath("$.submissionDate").value(DEFAULT_SUBMISSION_DATE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT))
            .andExpect(jsonPath("$.attempsNumber").value(DEFAULT_ATTEMPS_NUMBER));
    }

    @Test
    @Transactional
    void getNonExistingSubmissionAssignment() throws Exception {
        // Get the submissionAssignment
        restSubmissionAssignmentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSubmissionAssignment() throws Exception {
        // Initialize the database
        insertedSubmissionAssignment = submissionAssignmentRepository.saveAndFlush(submissionAssignment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the submissionAssignment
        SubmissionAssignment updatedSubmissionAssignment = submissionAssignmentRepository
            .findById(submissionAssignment.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedSubmissionAssignment are not directly saved in db
        em.detach(updatedSubmissionAssignment);
        updatedSubmissionAssignment
            .submissionDate(UPDATED_SUBMISSION_DATE)
            .content(UPDATED_CONTENT)
            .comment(UPDATED_COMMENT)
            .attempsNumber(UPDATED_ATTEMPS_NUMBER);
        SubmissionAssignmentDTO submissionAssignmentDTO = submissionAssignmentMapper.toDto(updatedSubmissionAssignment);

        restSubmissionAssignmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, submissionAssignmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(submissionAssignmentDTO))
            )
            .andExpect(status().isOk());

        // Validate the SubmissionAssignment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedSubmissionAssignmentToMatchAllProperties(updatedSubmissionAssignment);
    }

    @Test
    @Transactional
    void putNonExistingSubmissionAssignment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        submissionAssignment.setId(longCount.incrementAndGet());

        // Create the SubmissionAssignment
        SubmissionAssignmentDTO submissionAssignmentDTO = submissionAssignmentMapper.toDto(submissionAssignment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubmissionAssignmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, submissionAssignmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(submissionAssignmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SubmissionAssignment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSubmissionAssignment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        submissionAssignment.setId(longCount.incrementAndGet());

        // Create the SubmissionAssignment
        SubmissionAssignmentDTO submissionAssignmentDTO = submissionAssignmentMapper.toDto(submissionAssignment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubmissionAssignmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(submissionAssignmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SubmissionAssignment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSubmissionAssignment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        submissionAssignment.setId(longCount.incrementAndGet());

        // Create the SubmissionAssignment
        SubmissionAssignmentDTO submissionAssignmentDTO = submissionAssignmentMapper.toDto(submissionAssignment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubmissionAssignmentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(submissionAssignmentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SubmissionAssignment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSubmissionAssignmentWithPatch() throws Exception {
        // Initialize the database
        insertedSubmissionAssignment = submissionAssignmentRepository.saveAndFlush(submissionAssignment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the submissionAssignment using partial update
        SubmissionAssignment partialUpdatedSubmissionAssignment = new SubmissionAssignment();
        partialUpdatedSubmissionAssignment.setId(submissionAssignment.getId());

        partialUpdatedSubmissionAssignment
            .submissionDate(UPDATED_SUBMISSION_DATE)
            .content(UPDATED_CONTENT)
            .comment(UPDATED_COMMENT)
            .attempsNumber(UPDATED_ATTEMPS_NUMBER);

        restSubmissionAssignmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSubmissionAssignment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSubmissionAssignment))
            )
            .andExpect(status().isOk());

        // Validate the SubmissionAssignment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSubmissionAssignmentUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedSubmissionAssignment, submissionAssignment),
            getPersistedSubmissionAssignment(submissionAssignment)
        );
    }

    @Test
    @Transactional
    void fullUpdateSubmissionAssignmentWithPatch() throws Exception {
        // Initialize the database
        insertedSubmissionAssignment = submissionAssignmentRepository.saveAndFlush(submissionAssignment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the submissionAssignment using partial update
        SubmissionAssignment partialUpdatedSubmissionAssignment = new SubmissionAssignment();
        partialUpdatedSubmissionAssignment.setId(submissionAssignment.getId());

        partialUpdatedSubmissionAssignment
            .submissionDate(UPDATED_SUBMISSION_DATE)
            .content(UPDATED_CONTENT)
            .comment(UPDATED_COMMENT)
            .attempsNumber(UPDATED_ATTEMPS_NUMBER);

        restSubmissionAssignmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSubmissionAssignment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSubmissionAssignment))
            )
            .andExpect(status().isOk());

        // Validate the SubmissionAssignment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSubmissionAssignmentUpdatableFieldsEquals(
            partialUpdatedSubmissionAssignment,
            getPersistedSubmissionAssignment(partialUpdatedSubmissionAssignment)
        );
    }

    @Test
    @Transactional
    void patchNonExistingSubmissionAssignment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        submissionAssignment.setId(longCount.incrementAndGet());

        // Create the SubmissionAssignment
        SubmissionAssignmentDTO submissionAssignmentDTO = submissionAssignmentMapper.toDto(submissionAssignment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubmissionAssignmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, submissionAssignmentDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(submissionAssignmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SubmissionAssignment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSubmissionAssignment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        submissionAssignment.setId(longCount.incrementAndGet());

        // Create the SubmissionAssignment
        SubmissionAssignmentDTO submissionAssignmentDTO = submissionAssignmentMapper.toDto(submissionAssignment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubmissionAssignmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(submissionAssignmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the SubmissionAssignment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSubmissionAssignment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        submissionAssignment.setId(longCount.incrementAndGet());

        // Create the SubmissionAssignment
        SubmissionAssignmentDTO submissionAssignmentDTO = submissionAssignmentMapper.toDto(submissionAssignment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubmissionAssignmentMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(submissionAssignmentDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SubmissionAssignment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSubmissionAssignment() throws Exception {
        // Initialize the database
        insertedSubmissionAssignment = submissionAssignmentRepository.saveAndFlush(submissionAssignment);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the submissionAssignment
        restSubmissionAssignmentMockMvc
            .perform(delete(ENTITY_API_URL_ID, submissionAssignment.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return submissionAssignmentRepository.count();
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

    protected SubmissionAssignment getPersistedSubmissionAssignment(SubmissionAssignment submissionAssignment) {
        return submissionAssignmentRepository.findById(submissionAssignment.getId()).orElseThrow();
    }

    protected void assertPersistedSubmissionAssignmentToMatchAllProperties(SubmissionAssignment expectedSubmissionAssignment) {
        assertSubmissionAssignmentAllPropertiesEquals(
            expectedSubmissionAssignment,
            getPersistedSubmissionAssignment(expectedSubmissionAssignment)
        );
    }

    protected void assertPersistedSubmissionAssignmentToMatchUpdatableProperties(SubmissionAssignment expectedSubmissionAssignment) {
        assertSubmissionAssignmentAllUpdatablePropertiesEquals(
            expectedSubmissionAssignment,
            getPersistedSubmissionAssignment(expectedSubmissionAssignment)
        );
    }
}
