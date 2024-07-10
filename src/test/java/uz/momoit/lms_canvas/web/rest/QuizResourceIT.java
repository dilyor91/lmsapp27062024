package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.QuizAsserts.*;
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
import uz.momoit.lms_canvas.domain.Quiz;
import uz.momoit.lms_canvas.repository.QuizRepository;
import uz.momoit.lms_canvas.service.dto.QuizDTO;
import uz.momoit.lms_canvas.service.mapper.QuizMapper;

/**
 * Integration tests for the {@link QuizResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class QuizResourceIT {

    private static final String DEFAULT_QUIZ_NAME = "AAAAAAAAAA";
    private static final String UPDATED_QUIZ_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_TIME_IN_MINUTE = 1;
    private static final Integer UPDATED_TIME_IN_MINUTE = 2;

    private static final Boolean DEFAULT_PUBLISHED = false;
    private static final Boolean UPDATED_PUBLISHED = true;

    private static final String ENTITY_API_URL = "/api/quizzes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizMapper quizMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuizMockMvc;

    private Quiz quiz;

    private Quiz insertedQuiz;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Quiz createEntity(EntityManager em) {
        Quiz quiz = new Quiz().quizName(DEFAULT_QUIZ_NAME).timeInMinute(DEFAULT_TIME_IN_MINUTE).published(DEFAULT_PUBLISHED);
        return quiz;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Quiz createUpdatedEntity(EntityManager em) {
        Quiz quiz = new Quiz().quizName(UPDATED_QUIZ_NAME).timeInMinute(UPDATED_TIME_IN_MINUTE).published(UPDATED_PUBLISHED);
        return quiz;
    }

    @BeforeEach
    public void initTest() {
        quiz = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedQuiz != null) {
            quizRepository.delete(insertedQuiz);
            insertedQuiz = null;
        }
    }

    @Test
    @Transactional
    void createQuiz() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Quiz
        QuizDTO quizDTO = quizMapper.toDto(quiz);
        var returnedQuizDTO = om.readValue(
            restQuizMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            QuizDTO.class
        );

        // Validate the Quiz in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedQuiz = quizMapper.toEntity(returnedQuizDTO);
        assertQuizUpdatableFieldsEquals(returnedQuiz, getPersistedQuiz(returnedQuiz));

        insertedQuiz = returnedQuiz;
    }

    @Test
    @Transactional
    void createQuizWithExistingId() throws Exception {
        // Create the Quiz with an existing ID
        quiz.setId(1L);
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Quiz in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkQuizNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        quiz.setQuizName(null);

        // Create the Quiz, which fails.
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        restQuizMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTimeInMinuteIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        quiz.setTimeInMinute(null);

        // Create the Quiz, which fails.
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        restQuizMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllQuizzes() throws Exception {
        // Initialize the database
        insertedQuiz = quizRepository.saveAndFlush(quiz);

        // Get all the quizList
        restQuizMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quiz.getId().intValue())))
            .andExpect(jsonPath("$.[*].quizName").value(hasItem(DEFAULT_QUIZ_NAME)))
            .andExpect(jsonPath("$.[*].timeInMinute").value(hasItem(DEFAULT_TIME_IN_MINUTE)))
            .andExpect(jsonPath("$.[*].published").value(hasItem(DEFAULT_PUBLISHED.booleanValue())));
    }

    @Test
    @Transactional
    void getQuiz() throws Exception {
        // Initialize the database
        insertedQuiz = quizRepository.saveAndFlush(quiz);

        // Get the quiz
        restQuizMockMvc
            .perform(get(ENTITY_API_URL_ID, quiz.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(quiz.getId().intValue()))
            .andExpect(jsonPath("$.quizName").value(DEFAULT_QUIZ_NAME))
            .andExpect(jsonPath("$.timeInMinute").value(DEFAULT_TIME_IN_MINUTE))
            .andExpect(jsonPath("$.published").value(DEFAULT_PUBLISHED.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingQuiz() throws Exception {
        // Get the quiz
        restQuizMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingQuiz() throws Exception {
        // Initialize the database
        insertedQuiz = quizRepository.saveAndFlush(quiz);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quiz
        Quiz updatedQuiz = quizRepository.findById(quiz.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedQuiz are not directly saved in db
        em.detach(updatedQuiz);
        updatedQuiz.quizName(UPDATED_QUIZ_NAME).timeInMinute(UPDATED_TIME_IN_MINUTE).published(UPDATED_PUBLISHED);
        QuizDTO quizDTO = quizMapper.toDto(updatedQuiz);

        restQuizMockMvc
            .perform(put(ENTITY_API_URL_ID, quizDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizDTO)))
            .andExpect(status().isOk());

        // Validate the Quiz in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedQuizToMatchAllProperties(updatedQuiz);
    }

    @Test
    @Transactional
    void putNonExistingQuiz() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quiz.setId(longCount.incrementAndGet());

        // Create the Quiz
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizMockMvc
            .perform(put(ENTITY_API_URL_ID, quizDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Quiz in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchQuiz() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quiz.setId(longCount.incrementAndGet());

        // Create the Quiz
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Quiz in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamQuiz() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quiz.setId(longCount.incrementAndGet());

        // Create the Quiz
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Quiz in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateQuizWithPatch() throws Exception {
        // Initialize the database
        insertedQuiz = quizRepository.saveAndFlush(quiz);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quiz using partial update
        Quiz partialUpdatedQuiz = new Quiz();
        partialUpdatedQuiz.setId(quiz.getId());

        partialUpdatedQuiz.timeInMinute(UPDATED_TIME_IN_MINUTE).published(UPDATED_PUBLISHED);

        restQuizMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuiz.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuiz))
            )
            .andExpect(status().isOk());

        // Validate the Quiz in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuizUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedQuiz, quiz), getPersistedQuiz(quiz));
    }

    @Test
    @Transactional
    void fullUpdateQuizWithPatch() throws Exception {
        // Initialize the database
        insertedQuiz = quizRepository.saveAndFlush(quiz);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quiz using partial update
        Quiz partialUpdatedQuiz = new Quiz();
        partialUpdatedQuiz.setId(quiz.getId());

        partialUpdatedQuiz.quizName(UPDATED_QUIZ_NAME).timeInMinute(UPDATED_TIME_IN_MINUTE).published(UPDATED_PUBLISHED);

        restQuizMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuiz.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuiz))
            )
            .andExpect(status().isOk());

        // Validate the Quiz in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuizUpdatableFieldsEquals(partialUpdatedQuiz, getPersistedQuiz(partialUpdatedQuiz));
    }

    @Test
    @Transactional
    void patchNonExistingQuiz() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quiz.setId(longCount.incrementAndGet());

        // Create the Quiz
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, quizDTO.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(quizDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Quiz in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchQuiz() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quiz.setId(longCount.incrementAndGet());

        // Create the Quiz
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(quizDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Quiz in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamQuiz() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quiz.setId(longCount.incrementAndGet());

        // Create the Quiz
        QuizDTO quizDTO = quizMapper.toDto(quiz);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(quizDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Quiz in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteQuiz() throws Exception {
        // Initialize the database
        insertedQuiz = quizRepository.saveAndFlush(quiz);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the quiz
        restQuizMockMvc
            .perform(delete(ENTITY_API_URL_ID, quiz.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return quizRepository.count();
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

    protected Quiz getPersistedQuiz(Quiz quiz) {
        return quizRepository.findById(quiz.getId()).orElseThrow();
    }

    protected void assertPersistedQuizToMatchAllProperties(Quiz expectedQuiz) {
        assertQuizAllPropertiesEquals(expectedQuiz, getPersistedQuiz(expectedQuiz));
    }

    protected void assertPersistedQuizToMatchUpdatableProperties(Quiz expectedQuiz) {
        assertQuizAllUpdatablePropertiesEquals(expectedQuiz, getPersistedQuiz(expectedQuiz));
    }
}
