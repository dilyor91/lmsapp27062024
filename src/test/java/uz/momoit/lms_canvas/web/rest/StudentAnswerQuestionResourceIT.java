package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.StudentAnswerQuestionAsserts.*;
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
import uz.momoit.lms_canvas.domain.StudentAnswerQuestion;
import uz.momoit.lms_canvas.repository.StudentAnswerQuestionRepository;
import uz.momoit.lms_canvas.service.dto.StudentAnswerQuestionDTO;
import uz.momoit.lms_canvas.service.mapper.StudentAnswerQuestionMapper;

/**
 * Integration tests for the {@link StudentAnswerQuestionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StudentAnswerQuestionResourceIT {

    private static final Boolean DEFAULT_IS_CORRECT = false;
    private static final Boolean UPDATED_IS_CORRECT = true;

    private static final String ENTITY_API_URL = "/api/student-answer-questions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private StudentAnswerQuestionRepository studentAnswerQuestionRepository;

    @Autowired
    private StudentAnswerQuestionMapper studentAnswerQuestionMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStudentAnswerQuestionMockMvc;

    private StudentAnswerQuestion studentAnswerQuestion;

    private StudentAnswerQuestion insertedStudentAnswerQuestion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentAnswerQuestion createEntity(EntityManager em) {
        StudentAnswerQuestion studentAnswerQuestion = new StudentAnswerQuestion().isCorrect(DEFAULT_IS_CORRECT);
        return studentAnswerQuestion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentAnswerQuestion createUpdatedEntity(EntityManager em) {
        StudentAnswerQuestion studentAnswerQuestion = new StudentAnswerQuestion().isCorrect(UPDATED_IS_CORRECT);
        return studentAnswerQuestion;
    }

    @BeforeEach
    public void initTest() {
        studentAnswerQuestion = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedStudentAnswerQuestion != null) {
            studentAnswerQuestionRepository.delete(insertedStudentAnswerQuestion);
            insertedStudentAnswerQuestion = null;
        }
    }

    @Test
    @Transactional
    void createStudentAnswerQuestion() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the StudentAnswerQuestion
        StudentAnswerQuestionDTO studentAnswerQuestionDTO = studentAnswerQuestionMapper.toDto(studentAnswerQuestion);
        var returnedStudentAnswerQuestionDTO = om.readValue(
            restStudentAnswerQuestionMockMvc
                .perform(
                    post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentAnswerQuestionDTO))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            StudentAnswerQuestionDTO.class
        );

        // Validate the StudentAnswerQuestion in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedStudentAnswerQuestion = studentAnswerQuestionMapper.toEntity(returnedStudentAnswerQuestionDTO);
        assertStudentAnswerQuestionUpdatableFieldsEquals(
            returnedStudentAnswerQuestion,
            getPersistedStudentAnswerQuestion(returnedStudentAnswerQuestion)
        );

        insertedStudentAnswerQuestion = returnedStudentAnswerQuestion;
    }

    @Test
    @Transactional
    void createStudentAnswerQuestionWithExistingId() throws Exception {
        // Create the StudentAnswerQuestion with an existing ID
        studentAnswerQuestion.setId(1L);
        StudentAnswerQuestionDTO studentAnswerQuestionDTO = studentAnswerQuestionMapper.toDto(studentAnswerQuestion);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentAnswerQuestionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentAnswerQuestionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StudentAnswerQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllStudentAnswerQuestions() throws Exception {
        // Initialize the database
        insertedStudentAnswerQuestion = studentAnswerQuestionRepository.saveAndFlush(studentAnswerQuestion);

        // Get all the studentAnswerQuestionList
        restStudentAnswerQuestionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentAnswerQuestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].isCorrect").value(hasItem(DEFAULT_IS_CORRECT.booleanValue())));
    }

    @Test
    @Transactional
    void getStudentAnswerQuestion() throws Exception {
        // Initialize the database
        insertedStudentAnswerQuestion = studentAnswerQuestionRepository.saveAndFlush(studentAnswerQuestion);

        // Get the studentAnswerQuestion
        restStudentAnswerQuestionMockMvc
            .perform(get(ENTITY_API_URL_ID, studentAnswerQuestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(studentAnswerQuestion.getId().intValue()))
            .andExpect(jsonPath("$.isCorrect").value(DEFAULT_IS_CORRECT.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingStudentAnswerQuestion() throws Exception {
        // Get the studentAnswerQuestion
        restStudentAnswerQuestionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingStudentAnswerQuestion() throws Exception {
        // Initialize the database
        insertedStudentAnswerQuestion = studentAnswerQuestionRepository.saveAndFlush(studentAnswerQuestion);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentAnswerQuestion
        StudentAnswerQuestion updatedStudentAnswerQuestion = studentAnswerQuestionRepository
            .findById(studentAnswerQuestion.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedStudentAnswerQuestion are not directly saved in db
        em.detach(updatedStudentAnswerQuestion);
        updatedStudentAnswerQuestion.isCorrect(UPDATED_IS_CORRECT);
        StudentAnswerQuestionDTO studentAnswerQuestionDTO = studentAnswerQuestionMapper.toDto(updatedStudentAnswerQuestion);

        restStudentAnswerQuestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studentAnswerQuestionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentAnswerQuestionDTO))
            )
            .andExpect(status().isOk());

        // Validate the StudentAnswerQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedStudentAnswerQuestionToMatchAllProperties(updatedStudentAnswerQuestion);
    }

    @Test
    @Transactional
    void putNonExistingStudentAnswerQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAnswerQuestion.setId(longCount.incrementAndGet());

        // Create the StudentAnswerQuestion
        StudentAnswerQuestionDTO studentAnswerQuestionDTO = studentAnswerQuestionMapper.toDto(studentAnswerQuestion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentAnswerQuestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studentAnswerQuestionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentAnswerQuestionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentAnswerQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStudentAnswerQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAnswerQuestion.setId(longCount.incrementAndGet());

        // Create the StudentAnswerQuestion
        StudentAnswerQuestionDTO studentAnswerQuestionDTO = studentAnswerQuestionMapper.toDto(studentAnswerQuestion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentAnswerQuestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentAnswerQuestionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentAnswerQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStudentAnswerQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAnswerQuestion.setId(longCount.incrementAndGet());

        // Create the StudentAnswerQuestion
        StudentAnswerQuestionDTO studentAnswerQuestionDTO = studentAnswerQuestionMapper.toDto(studentAnswerQuestion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentAnswerQuestionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentAnswerQuestionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudentAnswerQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStudentAnswerQuestionWithPatch() throws Exception {
        // Initialize the database
        insertedStudentAnswerQuestion = studentAnswerQuestionRepository.saveAndFlush(studentAnswerQuestion);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentAnswerQuestion using partial update
        StudentAnswerQuestion partialUpdatedStudentAnswerQuestion = new StudentAnswerQuestion();
        partialUpdatedStudentAnswerQuestion.setId(studentAnswerQuestion.getId());

        restStudentAnswerQuestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudentAnswerQuestion.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudentAnswerQuestion))
            )
            .andExpect(status().isOk());

        // Validate the StudentAnswerQuestion in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudentAnswerQuestionUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedStudentAnswerQuestion, studentAnswerQuestion),
            getPersistedStudentAnswerQuestion(studentAnswerQuestion)
        );
    }

    @Test
    @Transactional
    void fullUpdateStudentAnswerQuestionWithPatch() throws Exception {
        // Initialize the database
        insertedStudentAnswerQuestion = studentAnswerQuestionRepository.saveAndFlush(studentAnswerQuestion);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentAnswerQuestion using partial update
        StudentAnswerQuestion partialUpdatedStudentAnswerQuestion = new StudentAnswerQuestion();
        partialUpdatedStudentAnswerQuestion.setId(studentAnswerQuestion.getId());

        partialUpdatedStudentAnswerQuestion.isCorrect(UPDATED_IS_CORRECT);

        restStudentAnswerQuestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudentAnswerQuestion.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudentAnswerQuestion))
            )
            .andExpect(status().isOk());

        // Validate the StudentAnswerQuestion in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudentAnswerQuestionUpdatableFieldsEquals(
            partialUpdatedStudentAnswerQuestion,
            getPersistedStudentAnswerQuestion(partialUpdatedStudentAnswerQuestion)
        );
    }

    @Test
    @Transactional
    void patchNonExistingStudentAnswerQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAnswerQuestion.setId(longCount.incrementAndGet());

        // Create the StudentAnswerQuestion
        StudentAnswerQuestionDTO studentAnswerQuestionDTO = studentAnswerQuestionMapper.toDto(studentAnswerQuestion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentAnswerQuestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, studentAnswerQuestionDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studentAnswerQuestionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentAnswerQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStudentAnswerQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAnswerQuestion.setId(longCount.incrementAndGet());

        // Create the StudentAnswerQuestion
        StudentAnswerQuestionDTO studentAnswerQuestionDTO = studentAnswerQuestionMapper.toDto(studentAnswerQuestion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentAnswerQuestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studentAnswerQuestionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentAnswerQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStudentAnswerQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentAnswerQuestion.setId(longCount.incrementAndGet());

        // Create the StudentAnswerQuestion
        StudentAnswerQuestionDTO studentAnswerQuestionDTO = studentAnswerQuestionMapper.toDto(studentAnswerQuestion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentAnswerQuestionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(studentAnswerQuestionDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudentAnswerQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStudentAnswerQuestion() throws Exception {
        // Initialize the database
        insertedStudentAnswerQuestion = studentAnswerQuestionRepository.saveAndFlush(studentAnswerQuestion);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the studentAnswerQuestion
        restStudentAnswerQuestionMockMvc
            .perform(delete(ENTITY_API_URL_ID, studentAnswerQuestion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return studentAnswerQuestionRepository.count();
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

    protected StudentAnswerQuestion getPersistedStudentAnswerQuestion(StudentAnswerQuestion studentAnswerQuestion) {
        return studentAnswerQuestionRepository.findById(studentAnswerQuestion.getId()).orElseThrow();
    }

    protected void assertPersistedStudentAnswerQuestionToMatchAllProperties(StudentAnswerQuestion expectedStudentAnswerQuestion) {
        assertStudentAnswerQuestionAllPropertiesEquals(
            expectedStudentAnswerQuestion,
            getPersistedStudentAnswerQuestion(expectedStudentAnswerQuestion)
        );
    }

    protected void assertPersistedStudentAnswerQuestionToMatchUpdatableProperties(StudentAnswerQuestion expectedStudentAnswerQuestion) {
        assertStudentAnswerQuestionAllUpdatablePropertiesEquals(
            expectedStudentAnswerQuestion,
            getPersistedStudentAnswerQuestion(expectedStudentAnswerQuestion)
        );
    }
}
