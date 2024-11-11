package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.ExamResultAsserts.*;
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
import uz.momoit.lms_canvas.domain.ExamResult;
import uz.momoit.lms_canvas.repository.ExamResultRepository;
import uz.momoit.lms_canvas.service.dto.ExamResultDTO;
import uz.momoit.lms_canvas.service.mapper.ExamResultMapper;

/**
 * Integration tests for the {@link ExamResultResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ExamResultResourceIT {

    private static final Float DEFAULT_POINT = 1F;
    private static final Float UPDATED_POINT = 2F;

    private static final Instant DEFAULT_GRADED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_GRADED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/exam-results";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ExamResultRepository examResultRepository;

    @Autowired
    private ExamResultMapper examResultMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExamResultMockMvc;

    private ExamResult examResult;

    private ExamResult insertedExamResult;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExamResult createEntity() {
        return new ExamResult().point(DEFAULT_POINT).gradedDate(DEFAULT_GRADED_DATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExamResult createUpdatedEntity() {
        return new ExamResult().point(UPDATED_POINT).gradedDate(UPDATED_GRADED_DATE);
    }

    @BeforeEach
    public void initTest() {
        examResult = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedExamResult != null) {
            examResultRepository.delete(insertedExamResult);
            insertedExamResult = null;
        }
    }

    @Test
    @Transactional
    void createExamResult() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ExamResult
        ExamResultDTO examResultDTO = examResultMapper.toDto(examResult);
        var returnedExamResultDTO = om.readValue(
            restExamResultMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(examResultDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ExamResultDTO.class
        );

        // Validate the ExamResult in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedExamResult = examResultMapper.toEntity(returnedExamResultDTO);
        assertExamResultUpdatableFieldsEquals(returnedExamResult, getPersistedExamResult(returnedExamResult));

        insertedExamResult = returnedExamResult;
    }

    @Test
    @Transactional
    void createExamResultWithExistingId() throws Exception {
        // Create the ExamResult with an existing ID
        examResult.setId(1L);
        ExamResultDTO examResultDTO = examResultMapper.toDto(examResult);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restExamResultMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(examResultDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ExamResult in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllExamResults() throws Exception {
        // Initialize the database
        insertedExamResult = examResultRepository.saveAndFlush(examResult);

        // Get all the examResultList
        restExamResultMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(examResult.getId().intValue())))
            .andExpect(jsonPath("$.[*].point").value(hasItem(DEFAULT_POINT.doubleValue())))
            .andExpect(jsonPath("$.[*].gradedDate").value(hasItem(DEFAULT_GRADED_DATE.toString())));
    }

    @Test
    @Transactional
    void getExamResult() throws Exception {
        // Initialize the database
        insertedExamResult = examResultRepository.saveAndFlush(examResult);

        // Get the examResult
        restExamResultMockMvc
            .perform(get(ENTITY_API_URL_ID, examResult.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(examResult.getId().intValue()))
            .andExpect(jsonPath("$.point").value(DEFAULT_POINT.doubleValue()))
            .andExpect(jsonPath("$.gradedDate").value(DEFAULT_GRADED_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingExamResult() throws Exception {
        // Get the examResult
        restExamResultMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingExamResult() throws Exception {
        // Initialize the database
        insertedExamResult = examResultRepository.saveAndFlush(examResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the examResult
        ExamResult updatedExamResult = examResultRepository.findById(examResult.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedExamResult are not directly saved in db
        em.detach(updatedExamResult);
        updatedExamResult.point(UPDATED_POINT).gradedDate(UPDATED_GRADED_DATE);
        ExamResultDTO examResultDTO = examResultMapper.toDto(updatedExamResult);

        restExamResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, examResultDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(examResultDTO))
            )
            .andExpect(status().isOk());

        // Validate the ExamResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedExamResultToMatchAllProperties(updatedExamResult);
    }

    @Test
    @Transactional
    void putNonExistingExamResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        examResult.setId(longCount.incrementAndGet());

        // Create the ExamResult
        ExamResultDTO examResultDTO = examResultMapper.toDto(examResult);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExamResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, examResultDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(examResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExamResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchExamResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        examResult.setId(longCount.incrementAndGet());

        // Create the ExamResult
        ExamResultDTO examResultDTO = examResultMapper.toDto(examResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExamResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(examResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExamResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamExamResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        examResult.setId(longCount.incrementAndGet());

        // Create the ExamResult
        ExamResultDTO examResultDTO = examResultMapper.toDto(examResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExamResultMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(examResultDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ExamResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateExamResultWithPatch() throws Exception {
        // Initialize the database
        insertedExamResult = examResultRepository.saveAndFlush(examResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the examResult using partial update
        ExamResult partialUpdatedExamResult = new ExamResult();
        partialUpdatedExamResult.setId(examResult.getId());

        partialUpdatedExamResult.point(UPDATED_POINT);

        restExamResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedExamResult.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedExamResult))
            )
            .andExpect(status().isOk());

        // Validate the ExamResult in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertExamResultUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedExamResult, examResult),
            getPersistedExamResult(examResult)
        );
    }

    @Test
    @Transactional
    void fullUpdateExamResultWithPatch() throws Exception {
        // Initialize the database
        insertedExamResult = examResultRepository.saveAndFlush(examResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the examResult using partial update
        ExamResult partialUpdatedExamResult = new ExamResult();
        partialUpdatedExamResult.setId(examResult.getId());

        partialUpdatedExamResult.point(UPDATED_POINT).gradedDate(UPDATED_GRADED_DATE);

        restExamResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedExamResult.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedExamResult))
            )
            .andExpect(status().isOk());

        // Validate the ExamResult in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertExamResultUpdatableFieldsEquals(partialUpdatedExamResult, getPersistedExamResult(partialUpdatedExamResult));
    }

    @Test
    @Transactional
    void patchNonExistingExamResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        examResult.setId(longCount.incrementAndGet());

        // Create the ExamResult
        ExamResultDTO examResultDTO = examResultMapper.toDto(examResult);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExamResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, examResultDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(examResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExamResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchExamResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        examResult.setId(longCount.incrementAndGet());

        // Create the ExamResult
        ExamResultDTO examResultDTO = examResultMapper.toDto(examResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExamResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(examResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ExamResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamExamResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        examResult.setId(longCount.incrementAndGet());

        // Create the ExamResult
        ExamResultDTO examResultDTO = examResultMapper.toDto(examResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restExamResultMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(examResultDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ExamResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteExamResult() throws Exception {
        // Initialize the database
        insertedExamResult = examResultRepository.saveAndFlush(examResult);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the examResult
        restExamResultMockMvc
            .perform(delete(ENTITY_API_URL_ID, examResult.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return examResultRepository.count();
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

    protected ExamResult getPersistedExamResult(ExamResult examResult) {
        return examResultRepository.findById(examResult.getId()).orElseThrow();
    }

    protected void assertPersistedExamResultToMatchAllProperties(ExamResult expectedExamResult) {
        assertExamResultAllPropertiesEquals(expectedExamResult, getPersistedExamResult(expectedExamResult));
    }

    protected void assertPersistedExamResultToMatchUpdatableProperties(ExamResult expectedExamResult) {
        assertExamResultAllUpdatablePropertiesEquals(expectedExamResult, getPersistedExamResult(expectedExamResult));
    }
}
