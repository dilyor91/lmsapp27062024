package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.StudentQuestionAsserts.*;
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
import uz.momoit.lms_canvas.domain.StudentQuestion;
import uz.momoit.lms_canvas.repository.StudentQuestionRepository;
import uz.momoit.lms_canvas.service.dto.StudentQuestionDTO;
import uz.momoit.lms_canvas.service.mapper.StudentQuestionMapper;

/**
 * Integration tests for the {@link StudentQuestionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StudentQuestionResourceIT {

    private static final Integer DEFAULT_ORD_NUM = 1;
    private static final Integer UPDATED_ORD_NUM = 2;

    private static final String ENTITY_API_URL = "/api/student-questions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private StudentQuestionRepository studentQuestionRepository;

    @Autowired
    private StudentQuestionMapper studentQuestionMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStudentQuestionMockMvc;

    private StudentQuestion studentQuestion;

    private StudentQuestion insertedStudentQuestion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentQuestion createEntity(EntityManager em) {
        StudentQuestion studentQuestion = new StudentQuestion().ordNum(DEFAULT_ORD_NUM);
        return studentQuestion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentQuestion createUpdatedEntity(EntityManager em) {
        StudentQuestion studentQuestion = new StudentQuestion().ordNum(UPDATED_ORD_NUM);
        return studentQuestion;
    }

    @BeforeEach
    public void initTest() {
        studentQuestion = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedStudentQuestion != null) {
            studentQuestionRepository.delete(insertedStudentQuestion);
            insertedStudentQuestion = null;
        }
    }

    @Test
    @Transactional
    void createStudentQuestion() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the StudentQuestion
        StudentQuestionDTO studentQuestionDTO = studentQuestionMapper.toDto(studentQuestion);
        var returnedStudentQuestionDTO = om.readValue(
            restStudentQuestionMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentQuestionDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            StudentQuestionDTO.class
        );

        // Validate the StudentQuestion in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedStudentQuestion = studentQuestionMapper.toEntity(returnedStudentQuestionDTO);
        assertStudentQuestionUpdatableFieldsEquals(returnedStudentQuestion, getPersistedStudentQuestion(returnedStudentQuestion));

        insertedStudentQuestion = returnedStudentQuestion;
    }

    @Test
    @Transactional
    void createStudentQuestionWithExistingId() throws Exception {
        // Create the StudentQuestion with an existing ID
        studentQuestion.setId(1L);
        StudentQuestionDTO studentQuestionDTO = studentQuestionMapper.toDto(studentQuestion);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentQuestionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentQuestionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StudentQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllStudentQuestions() throws Exception {
        // Initialize the database
        insertedStudentQuestion = studentQuestionRepository.saveAndFlush(studentQuestion);

        // Get all the studentQuestionList
        restStudentQuestionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentQuestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordNum").value(hasItem(DEFAULT_ORD_NUM)));
    }

    @Test
    @Transactional
    void getStudentQuestion() throws Exception {
        // Initialize the database
        insertedStudentQuestion = studentQuestionRepository.saveAndFlush(studentQuestion);

        // Get the studentQuestion
        restStudentQuestionMockMvc
            .perform(get(ENTITY_API_URL_ID, studentQuestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(studentQuestion.getId().intValue()))
            .andExpect(jsonPath("$.ordNum").value(DEFAULT_ORD_NUM));
    }

    @Test
    @Transactional
    void getNonExistingStudentQuestion() throws Exception {
        // Get the studentQuestion
        restStudentQuestionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingStudentQuestion() throws Exception {
        // Initialize the database
        insertedStudentQuestion = studentQuestionRepository.saveAndFlush(studentQuestion);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentQuestion
        StudentQuestion updatedStudentQuestion = studentQuestionRepository.findById(studentQuestion.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedStudentQuestion are not directly saved in db
        em.detach(updatedStudentQuestion);
        updatedStudentQuestion.ordNum(UPDATED_ORD_NUM);
        StudentQuestionDTO studentQuestionDTO = studentQuestionMapper.toDto(updatedStudentQuestion);

        restStudentQuestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studentQuestionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentQuestionDTO))
            )
            .andExpect(status().isOk());

        // Validate the StudentQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedStudentQuestionToMatchAllProperties(updatedStudentQuestion);
    }

    @Test
    @Transactional
    void putNonExistingStudentQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentQuestion.setId(longCount.incrementAndGet());

        // Create the StudentQuestion
        StudentQuestionDTO studentQuestionDTO = studentQuestionMapper.toDto(studentQuestion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentQuestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studentQuestionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentQuestionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStudentQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentQuestion.setId(longCount.incrementAndGet());

        // Create the StudentQuestion
        StudentQuestionDTO studentQuestionDTO = studentQuestionMapper.toDto(studentQuestion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentQuestionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentQuestionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStudentQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentQuestion.setId(longCount.incrementAndGet());

        // Create the StudentQuestion
        StudentQuestionDTO studentQuestionDTO = studentQuestionMapper.toDto(studentQuestion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentQuestionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentQuestionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudentQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStudentQuestionWithPatch() throws Exception {
        // Initialize the database
        insertedStudentQuestion = studentQuestionRepository.saveAndFlush(studentQuestion);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentQuestion using partial update
        StudentQuestion partialUpdatedStudentQuestion = new StudentQuestion();
        partialUpdatedStudentQuestion.setId(studentQuestion.getId());

        restStudentQuestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudentQuestion.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudentQuestion))
            )
            .andExpect(status().isOk());

        // Validate the StudentQuestion in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudentQuestionUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedStudentQuestion, studentQuestion),
            getPersistedStudentQuestion(studentQuestion)
        );
    }

    @Test
    @Transactional
    void fullUpdateStudentQuestionWithPatch() throws Exception {
        // Initialize the database
        insertedStudentQuestion = studentQuestionRepository.saveAndFlush(studentQuestion);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentQuestion using partial update
        StudentQuestion partialUpdatedStudentQuestion = new StudentQuestion();
        partialUpdatedStudentQuestion.setId(studentQuestion.getId());

        partialUpdatedStudentQuestion.ordNum(UPDATED_ORD_NUM);

        restStudentQuestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudentQuestion.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudentQuestion))
            )
            .andExpect(status().isOk());

        // Validate the StudentQuestion in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudentQuestionUpdatableFieldsEquals(
            partialUpdatedStudentQuestion,
            getPersistedStudentQuestion(partialUpdatedStudentQuestion)
        );
    }

    @Test
    @Transactional
    void patchNonExistingStudentQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentQuestion.setId(longCount.incrementAndGet());

        // Create the StudentQuestion
        StudentQuestionDTO studentQuestionDTO = studentQuestionMapper.toDto(studentQuestion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentQuestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, studentQuestionDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studentQuestionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStudentQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentQuestion.setId(longCount.incrementAndGet());

        // Create the StudentQuestion
        StudentQuestionDTO studentQuestionDTO = studentQuestionMapper.toDto(studentQuestion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentQuestionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studentQuestionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStudentQuestion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentQuestion.setId(longCount.incrementAndGet());

        // Create the StudentQuestion
        StudentQuestionDTO studentQuestionDTO = studentQuestionMapper.toDto(studentQuestion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentQuestionMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(studentQuestionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudentQuestion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStudentQuestion() throws Exception {
        // Initialize the database
        insertedStudentQuestion = studentQuestionRepository.saveAndFlush(studentQuestion);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the studentQuestion
        restStudentQuestionMockMvc
            .perform(delete(ENTITY_API_URL_ID, studentQuestion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return studentQuestionRepository.count();
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

    protected StudentQuestion getPersistedStudentQuestion(StudentQuestion studentQuestion) {
        return studentQuestionRepository.findById(studentQuestion.getId()).orElseThrow();
    }

    protected void assertPersistedStudentQuestionToMatchAllProperties(StudentQuestion expectedStudentQuestion) {
        assertStudentQuestionAllPropertiesEquals(expectedStudentQuestion, getPersistedStudentQuestion(expectedStudentQuestion));
    }

    protected void assertPersistedStudentQuestionToMatchUpdatableProperties(StudentQuestion expectedStudentQuestion) {
        assertStudentQuestionAllUpdatablePropertiesEquals(expectedStudentQuestion, getPersistedStudentQuestion(expectedStudentQuestion));
    }
}
