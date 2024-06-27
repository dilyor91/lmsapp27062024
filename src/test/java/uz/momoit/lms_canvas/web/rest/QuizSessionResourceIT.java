package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.QuizSessionAsserts.*;
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
import uz.momoit.lms_canvas.domain.QuizSession;
import uz.momoit.lms_canvas.domain.enumeration.QuizSessionEnum;
import uz.momoit.lms_canvas.repository.QuizSessionRepository;
import uz.momoit.lms_canvas.service.dto.QuizSessionDTO;
import uz.momoit.lms_canvas.service.mapper.QuizSessionMapper;

/**
 * Integration tests for the {@link QuizSessionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class QuizSessionResourceIT {

    private static final Instant DEFAULT_START_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final QuizSessionEnum DEFAULT_QUIZ_SESSION_ENUM = QuizSessionEnum.IN_PROGRESS;
    private static final QuizSessionEnum UPDATED_QUIZ_SESSION_ENUM = QuizSessionEnum.FINISHED;

    private static final String ENTITY_API_URL = "/api/quiz-sessions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private QuizSessionRepository quizSessionRepository;

    @Autowired
    private QuizSessionMapper quizSessionMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuizSessionMockMvc;

    private QuizSession quizSession;

    private QuizSession insertedQuizSession;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuizSession createEntity(EntityManager em) {
        QuizSession quizSession = new QuizSession()
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .quizSessionEnum(DEFAULT_QUIZ_SESSION_ENUM);
        return quizSession;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuizSession createUpdatedEntity(EntityManager em) {
        QuizSession quizSession = new QuizSession()
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .quizSessionEnum(UPDATED_QUIZ_SESSION_ENUM);
        return quizSession;
    }

    @BeforeEach
    public void initTest() {
        quizSession = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedQuizSession != null) {
            quizSessionRepository.delete(insertedQuizSession);
            insertedQuizSession = null;
        }
    }

    @Test
    @Transactional
    void createQuizSession() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the QuizSession
        QuizSessionDTO quizSessionDTO = quizSessionMapper.toDto(quizSession);
        var returnedQuizSessionDTO = om.readValue(
            restQuizSessionMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizSessionDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            QuizSessionDTO.class
        );

        // Validate the QuizSession in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedQuizSession = quizSessionMapper.toEntity(returnedQuizSessionDTO);
        assertQuizSessionUpdatableFieldsEquals(returnedQuizSession, getPersistedQuizSession(returnedQuizSession));

        insertedQuizSession = returnedQuizSession;
    }

    @Test
    @Transactional
    void createQuizSessionWithExistingId() throws Exception {
        // Create the QuizSession with an existing ID
        quizSession.setId(1L);
        QuizSessionDTO quizSessionDTO = quizSessionMapper.toDto(quizSession);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizSessionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizSessionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the QuizSession in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllQuizSessions() throws Exception {
        // Initialize the database
        insertedQuizSession = quizSessionRepository.saveAndFlush(quizSession);

        // Get all the quizSessionList
        restQuizSessionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quizSession.getId().intValue())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())))
            .andExpect(jsonPath("$.[*].quizSessionEnum").value(hasItem(DEFAULT_QUIZ_SESSION_ENUM.toString())));
    }

    @Test
    @Transactional
    void getQuizSession() throws Exception {
        // Initialize the database
        insertedQuizSession = quizSessionRepository.saveAndFlush(quizSession);

        // Get the quizSession
        restQuizSessionMockMvc
            .perform(get(ENTITY_API_URL_ID, quizSession.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(quizSession.getId().intValue()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()))
            .andExpect(jsonPath("$.quizSessionEnum").value(DEFAULT_QUIZ_SESSION_ENUM.toString()));
    }

    @Test
    @Transactional
    void getNonExistingQuizSession() throws Exception {
        // Get the quizSession
        restQuizSessionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingQuizSession() throws Exception {
        // Initialize the database
        insertedQuizSession = quizSessionRepository.saveAndFlush(quizSession);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizSession
        QuizSession updatedQuizSession = quizSessionRepository.findById(quizSession.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedQuizSession are not directly saved in db
        em.detach(updatedQuizSession);
        updatedQuizSession.startTime(UPDATED_START_TIME).endTime(UPDATED_END_TIME).quizSessionEnum(UPDATED_QUIZ_SESSION_ENUM);
        QuizSessionDTO quizSessionDTO = quizSessionMapper.toDto(updatedQuizSession);

        restQuizSessionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quizSessionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizSessionDTO))
            )
            .andExpect(status().isOk());

        // Validate the QuizSession in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedQuizSessionToMatchAllProperties(updatedQuizSession);
    }

    @Test
    @Transactional
    void putNonExistingQuizSession() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizSession.setId(longCount.incrementAndGet());

        // Create the QuizSession
        QuizSessionDTO quizSessionDTO = quizSessionMapper.toDto(quizSession);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizSessionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quizSessionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizSessionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizSession in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchQuizSession() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizSession.setId(longCount.incrementAndGet());

        // Create the QuizSession
        QuizSessionDTO quizSessionDTO = quizSessionMapper.toDto(quizSession);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizSessionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizSessionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizSession in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamQuizSession() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizSession.setId(longCount.incrementAndGet());

        // Create the QuizSession
        QuizSessionDTO quizSessionDTO = quizSessionMapper.toDto(quizSession);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizSessionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizSessionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuizSession in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateQuizSessionWithPatch() throws Exception {
        // Initialize the database
        insertedQuizSession = quizSessionRepository.saveAndFlush(quizSession);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizSession using partial update
        QuizSession partialUpdatedQuizSession = new QuizSession();
        partialUpdatedQuizSession.setId(quizSession.getId());

        restQuizSessionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuizSession.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuizSession))
            )
            .andExpect(status().isOk());

        // Validate the QuizSession in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuizSessionUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedQuizSession, quizSession),
            getPersistedQuizSession(quizSession)
        );
    }

    @Test
    @Transactional
    void fullUpdateQuizSessionWithPatch() throws Exception {
        // Initialize the database
        insertedQuizSession = quizSessionRepository.saveAndFlush(quizSession);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizSession using partial update
        QuizSession partialUpdatedQuizSession = new QuizSession();
        partialUpdatedQuizSession.setId(quizSession.getId());

        partialUpdatedQuizSession.startTime(UPDATED_START_TIME).endTime(UPDATED_END_TIME).quizSessionEnum(UPDATED_QUIZ_SESSION_ENUM);

        restQuizSessionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuizSession.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuizSession))
            )
            .andExpect(status().isOk());

        // Validate the QuizSession in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuizSessionUpdatableFieldsEquals(partialUpdatedQuizSession, getPersistedQuizSession(partialUpdatedQuizSession));
    }

    @Test
    @Transactional
    void patchNonExistingQuizSession() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizSession.setId(longCount.incrementAndGet());

        // Create the QuizSession
        QuizSessionDTO quizSessionDTO = quizSessionMapper.toDto(quizSession);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizSessionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, quizSessionDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(quizSessionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizSession in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchQuizSession() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizSession.setId(longCount.incrementAndGet());

        // Create the QuizSession
        QuizSessionDTO quizSessionDTO = quizSessionMapper.toDto(quizSession);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizSessionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(quizSessionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizSession in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamQuizSession() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizSession.setId(longCount.incrementAndGet());

        // Create the QuizSession
        QuizSessionDTO quizSessionDTO = quizSessionMapper.toDto(quizSession);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizSessionMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(quizSessionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuizSession in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteQuizSession() throws Exception {
        // Initialize the database
        insertedQuizSession = quizSessionRepository.saveAndFlush(quizSession);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the quizSession
        restQuizSessionMockMvc
            .perform(delete(ENTITY_API_URL_ID, quizSession.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return quizSessionRepository.count();
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

    protected QuizSession getPersistedQuizSession(QuizSession quizSession) {
        return quizSessionRepository.findById(quizSession.getId()).orElseThrow();
    }

    protected void assertPersistedQuizSessionToMatchAllProperties(QuizSession expectedQuizSession) {
        assertQuizSessionAllPropertiesEquals(expectedQuizSession, getPersistedQuizSession(expectedQuizSession));
    }

    protected void assertPersistedQuizSessionToMatchUpdatableProperties(QuizSession expectedQuizSession) {
        assertQuizSessionAllUpdatablePropertiesEquals(expectedQuizSession, getPersistedQuizSession(expectedQuizSession));
    }
}
