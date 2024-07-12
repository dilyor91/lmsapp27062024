package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.QuizResultAsserts.*;
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
import uz.momoit.lms_canvas.domain.QuizResult;
import uz.momoit.lms_canvas.repository.QuizResultRepository;
import uz.momoit.lms_canvas.service.dto.QuizResultDTO;
import uz.momoit.lms_canvas.service.mapper.QuizResultMapper;

/**
 * Integration tests for the {@link QuizResultResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class QuizResultResourceIT {

    private static final Integer DEFAULT_POINT = 1;
    private static final Integer UPDATED_POINT = 2;

    private static final Integer DEFAULT_TOTAL_QUESTION_CNT = 1;
    private static final Integer UPDATED_TOTAL_QUESTION_CNT = 2;

    private static final Integer DEFAULT_CORRECT_ANSWER_CNT = 1;
    private static final Integer UPDATED_CORRECT_ANSWER_CNT = 2;

    private static final Integer DEFAULT_WRONG_ANSWER_CNT = 1;
    private static final Integer UPDATED_WRONG_ANSWER_CNT = 2;

    private static final String ENTITY_API_URL = "/api/quiz-results";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private QuizResultRepository quizResultRepository;

    @Autowired
    private QuizResultMapper quizResultMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuizResultMockMvc;

    private QuizResult quizResult;

    private QuizResult insertedQuizResult;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuizResult createEntity(EntityManager em) {
        QuizResult quizResult = new QuizResult()
            .point(DEFAULT_POINT)
            .totalQuestionCnt(DEFAULT_TOTAL_QUESTION_CNT)
            .correctAnswerCnt(DEFAULT_CORRECT_ANSWER_CNT)
            .wrongAnswerCnt(DEFAULT_WRONG_ANSWER_CNT);
        return quizResult;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuizResult createUpdatedEntity(EntityManager em) {
        QuizResult quizResult = new QuizResult()
            .point(UPDATED_POINT)
            .totalQuestionCnt(UPDATED_TOTAL_QUESTION_CNT)
            .correctAnswerCnt(UPDATED_CORRECT_ANSWER_CNT)
            .wrongAnswerCnt(UPDATED_WRONG_ANSWER_CNT);
        return quizResult;
    }

    @BeforeEach
    public void initTest() {
        quizResult = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedQuizResult != null) {
            quizResultRepository.delete(insertedQuizResult);
            insertedQuizResult = null;
        }
    }

    @Test
    @Transactional
    void createQuizResult() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the QuizResult
        QuizResultDTO quizResultDTO = quizResultMapper.toDto(quizResult);
        var returnedQuizResultDTO = om.readValue(
            restQuizResultMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizResultDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            QuizResultDTO.class
        );

        // Validate the QuizResult in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedQuizResult = quizResultMapper.toEntity(returnedQuizResultDTO);
        assertQuizResultUpdatableFieldsEquals(returnedQuizResult, getPersistedQuizResult(returnedQuizResult));

        insertedQuizResult = returnedQuizResult;
    }

    @Test
    @Transactional
    void createQuizResultWithExistingId() throws Exception {
        // Create the QuizResult with an existing ID
        quizResult.setId(1L);
        QuizResultDTO quizResultDTO = quizResultMapper.toDto(quizResult);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizResultMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizResultDTO)))
            .andExpect(status().isBadRequest());

        // Validate the QuizResult in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllQuizResults() throws Exception {
        // Initialize the database
        insertedQuizResult = quizResultRepository.saveAndFlush(quizResult);

        // Get all the quizResultList
        restQuizResultMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quizResult.getId().intValue())))
            .andExpect(jsonPath("$.[*].point").value(hasItem(DEFAULT_POINT)))
            .andExpect(jsonPath("$.[*].totalQuestionCnt").value(hasItem(DEFAULT_TOTAL_QUESTION_CNT)))
            .andExpect(jsonPath("$.[*].correctAnswerCnt").value(hasItem(DEFAULT_CORRECT_ANSWER_CNT)))
            .andExpect(jsonPath("$.[*].wrongAnswerCnt").value(hasItem(DEFAULT_WRONG_ANSWER_CNT)));
    }

    @Test
    @Transactional
    void getQuizResult() throws Exception {
        // Initialize the database
        insertedQuizResult = quizResultRepository.saveAndFlush(quizResult);

        // Get the quizResult
        restQuizResultMockMvc
            .perform(get(ENTITY_API_URL_ID, quizResult.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(quizResult.getId().intValue()))
            .andExpect(jsonPath("$.point").value(DEFAULT_POINT))
            .andExpect(jsonPath("$.totalQuestionCnt").value(DEFAULT_TOTAL_QUESTION_CNT))
            .andExpect(jsonPath("$.correctAnswerCnt").value(DEFAULT_CORRECT_ANSWER_CNT))
            .andExpect(jsonPath("$.wrongAnswerCnt").value(DEFAULT_WRONG_ANSWER_CNT));
    }

    @Test
    @Transactional
    void getNonExistingQuizResult() throws Exception {
        // Get the quizResult
        restQuizResultMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingQuizResult() throws Exception {
        // Initialize the database
        insertedQuizResult = quizResultRepository.saveAndFlush(quizResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizResult
        QuizResult updatedQuizResult = quizResultRepository.findById(quizResult.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedQuizResult are not directly saved in db
        em.detach(updatedQuizResult);
        updatedQuizResult
            .point(UPDATED_POINT)
            .totalQuestionCnt(UPDATED_TOTAL_QUESTION_CNT)
            .correctAnswerCnt(UPDATED_CORRECT_ANSWER_CNT)
            .wrongAnswerCnt(UPDATED_WRONG_ANSWER_CNT);
        QuizResultDTO quizResultDTO = quizResultMapper.toDto(updatedQuizResult);

        restQuizResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quizResultDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizResultDTO))
            )
            .andExpect(status().isOk());

        // Validate the QuizResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedQuizResultToMatchAllProperties(updatedQuizResult);
    }

    @Test
    @Transactional
    void putNonExistingQuizResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizResult.setId(longCount.incrementAndGet());

        // Create the QuizResult
        QuizResultDTO quizResultDTO = quizResultMapper.toDto(quizResult);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quizResultDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchQuizResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizResult.setId(longCount.incrementAndGet());

        // Create the QuizResult
        QuizResultDTO quizResultDTO = quizResultMapper.toDto(quizResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamQuizResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizResult.setId(longCount.incrementAndGet());

        // Create the QuizResult
        QuizResultDTO quizResultDTO = quizResultMapper.toDto(quizResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizResultMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizResultDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuizResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateQuizResultWithPatch() throws Exception {
        // Initialize the database
        insertedQuizResult = quizResultRepository.saveAndFlush(quizResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizResult using partial update
        QuizResult partialUpdatedQuizResult = new QuizResult();
        partialUpdatedQuizResult.setId(quizResult.getId());

        partialUpdatedQuizResult.totalQuestionCnt(UPDATED_TOTAL_QUESTION_CNT).correctAnswerCnt(UPDATED_CORRECT_ANSWER_CNT);

        restQuizResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuizResult.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuizResult))
            )
            .andExpect(status().isOk());

        // Validate the QuizResult in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuizResultUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedQuizResult, quizResult),
            getPersistedQuizResult(quizResult)
        );
    }

    @Test
    @Transactional
    void fullUpdateQuizResultWithPatch() throws Exception {
        // Initialize the database
        insertedQuizResult = quizResultRepository.saveAndFlush(quizResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizResult using partial update
        QuizResult partialUpdatedQuizResult = new QuizResult();
        partialUpdatedQuizResult.setId(quizResult.getId());

        partialUpdatedQuizResult
            .point(UPDATED_POINT)
            .totalQuestionCnt(UPDATED_TOTAL_QUESTION_CNT)
            .correctAnswerCnt(UPDATED_CORRECT_ANSWER_CNT)
            .wrongAnswerCnt(UPDATED_WRONG_ANSWER_CNT);

        restQuizResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuizResult.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuizResult))
            )
            .andExpect(status().isOk());

        // Validate the QuizResult in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuizResultUpdatableFieldsEquals(partialUpdatedQuizResult, getPersistedQuizResult(partialUpdatedQuizResult));
    }

    @Test
    @Transactional
    void patchNonExistingQuizResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizResult.setId(longCount.incrementAndGet());

        // Create the QuizResult
        QuizResultDTO quizResultDTO = quizResultMapper.toDto(quizResult);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, quizResultDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(quizResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchQuizResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizResult.setId(longCount.incrementAndGet());

        // Create the QuizResult
        QuizResultDTO quizResultDTO = quizResultMapper.toDto(quizResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(quizResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamQuizResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizResult.setId(longCount.incrementAndGet());

        // Create the QuizResult
        QuizResultDTO quizResultDTO = quizResultMapper.toDto(quizResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizResultMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(quizResultDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuizResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteQuizResult() throws Exception {
        // Initialize the database
        insertedQuizResult = quizResultRepository.saveAndFlush(quizResult);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the quizResult
        restQuizResultMockMvc
            .perform(delete(ENTITY_API_URL_ID, quizResult.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return quizResultRepository.count();
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

    protected QuizResult getPersistedQuizResult(QuizResult quizResult) {
        return quizResultRepository.findById(quizResult.getId()).orElseThrow();
    }

    protected void assertPersistedQuizResultToMatchAllProperties(QuizResult expectedQuizResult) {
        assertQuizResultAllPropertiesEquals(expectedQuizResult, getPersistedQuizResult(expectedQuizResult));
    }

    protected void assertPersistedQuizResultToMatchUpdatableProperties(QuizResult expectedQuizResult) {
        assertQuizResultAllUpdatablePropertiesEquals(expectedQuizResult, getPersistedQuizResult(expectedQuizResult));
    }
}
