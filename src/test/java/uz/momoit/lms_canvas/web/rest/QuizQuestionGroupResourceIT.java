package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.QuizQuestionGroupAsserts.*;
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
import uz.momoit.lms_canvas.domain.QuizQuestionGroup;
import uz.momoit.lms_canvas.repository.QuizQuestionGroupRepository;
import uz.momoit.lms_canvas.service.dto.QuizQuestionGroupDTO;
import uz.momoit.lms_canvas.service.mapper.QuizQuestionGroupMapper;

/**
 * Integration tests for the {@link QuizQuestionGroupResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class QuizQuestionGroupResourceIT {

    private static final Integer DEFAULT_QUESTION_COUNT = 1;
    private static final Integer UPDATED_QUESTION_COUNT = 2;

    private static final String ENTITY_API_URL = "/api/quiz-question-groups";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private QuizQuestionGroupRepository quizQuestionGroupRepository;

    @Autowired
    private QuizQuestionGroupMapper quizQuestionGroupMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuizQuestionGroupMockMvc;

    private QuizQuestionGroup quizQuestionGroup;

    private QuizQuestionGroup insertedQuizQuestionGroup;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuizQuestionGroup createEntity(EntityManager em) {
        QuizQuestionGroup quizQuestionGroup = new QuizQuestionGroup().questionCount(DEFAULT_QUESTION_COUNT);
        return quizQuestionGroup;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuizQuestionGroup createUpdatedEntity(EntityManager em) {
        QuizQuestionGroup quizQuestionGroup = new QuizQuestionGroup().questionCount(UPDATED_QUESTION_COUNT);
        return quizQuestionGroup;
    }

    @BeforeEach
    public void initTest() {
        quizQuestionGroup = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedQuizQuestionGroup != null) {
            quizQuestionGroupRepository.delete(insertedQuizQuestionGroup);
            insertedQuizQuestionGroup = null;
        }
    }

    @Test
    @Transactional
    void createQuizQuestionGroup() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the QuizQuestionGroup
        QuizQuestionGroupDTO quizQuestionGroupDTO = quizQuestionGroupMapper.toDto(quizQuestionGroup);
        var returnedQuizQuestionGroupDTO = om.readValue(
            restQuizQuestionGroupMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizQuestionGroupDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            QuizQuestionGroupDTO.class
        );

        // Validate the QuizQuestionGroup in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedQuizQuestionGroup = quizQuestionGroupMapper.toEntity(returnedQuizQuestionGroupDTO);
        assertQuizQuestionGroupUpdatableFieldsEquals(returnedQuizQuestionGroup, getPersistedQuizQuestionGroup(returnedQuizQuestionGroup));

        insertedQuizQuestionGroup = returnedQuizQuestionGroup;
    }

    @Test
    @Transactional
    void createQuizQuestionGroupWithExistingId() throws Exception {
        // Create the QuizQuestionGroup with an existing ID
        quizQuestionGroup.setId(1L);
        QuizQuestionGroupDTO quizQuestionGroupDTO = quizQuestionGroupMapper.toDto(quizQuestionGroup);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizQuestionGroupMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizQuestionGroupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the QuizQuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllQuizQuestionGroups() throws Exception {
        // Initialize the database
        insertedQuizQuestionGroup = quizQuestionGroupRepository.saveAndFlush(quizQuestionGroup);

        // Get all the quizQuestionGroupList
        restQuizQuestionGroupMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quizQuestionGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].questionCount").value(hasItem(DEFAULT_QUESTION_COUNT)));
    }

    @Test
    @Transactional
    void getQuizQuestionGroup() throws Exception {
        // Initialize the database
        insertedQuizQuestionGroup = quizQuestionGroupRepository.saveAndFlush(quizQuestionGroup);

        // Get the quizQuestionGroup
        restQuizQuestionGroupMockMvc
            .perform(get(ENTITY_API_URL_ID, quizQuestionGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(quizQuestionGroup.getId().intValue()))
            .andExpect(jsonPath("$.questionCount").value(DEFAULT_QUESTION_COUNT));
    }

    @Test
    @Transactional
    void getNonExistingQuizQuestionGroup() throws Exception {
        // Get the quizQuestionGroup
        restQuizQuestionGroupMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingQuizQuestionGroup() throws Exception {
        // Initialize the database
        insertedQuizQuestionGroup = quizQuestionGroupRepository.saveAndFlush(quizQuestionGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizQuestionGroup
        QuizQuestionGroup updatedQuizQuestionGroup = quizQuestionGroupRepository.findById(quizQuestionGroup.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedQuizQuestionGroup are not directly saved in db
        em.detach(updatedQuizQuestionGroup);
        updatedQuizQuestionGroup.questionCount(UPDATED_QUESTION_COUNT);
        QuizQuestionGroupDTO quizQuestionGroupDTO = quizQuestionGroupMapper.toDto(updatedQuizQuestionGroup);

        restQuizQuestionGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quizQuestionGroupDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizQuestionGroupDTO))
            )
            .andExpect(status().isOk());

        // Validate the QuizQuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedQuizQuestionGroupToMatchAllProperties(updatedQuizQuestionGroup);
    }

    @Test
    @Transactional
    void putNonExistingQuizQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizQuestionGroup.setId(longCount.incrementAndGet());

        // Create the QuizQuestionGroup
        QuizQuestionGroupDTO quizQuestionGroupDTO = quizQuestionGroupMapper.toDto(quizQuestionGroup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizQuestionGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quizQuestionGroupDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizQuestionGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizQuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchQuizQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizQuestionGroup.setId(longCount.incrementAndGet());

        // Create the QuizQuestionGroup
        QuizQuestionGroupDTO quizQuestionGroupDTO = quizQuestionGroupMapper.toDto(quizQuestionGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizQuestionGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizQuestionGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizQuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamQuizQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizQuestionGroup.setId(longCount.incrementAndGet());

        // Create the QuizQuestionGroup
        QuizQuestionGroupDTO quizQuestionGroupDTO = quizQuestionGroupMapper.toDto(quizQuestionGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizQuestionGroupMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizQuestionGroupDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuizQuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateQuizQuestionGroupWithPatch() throws Exception {
        // Initialize the database
        insertedQuizQuestionGroup = quizQuestionGroupRepository.saveAndFlush(quizQuestionGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizQuestionGroup using partial update
        QuizQuestionGroup partialUpdatedQuizQuestionGroup = new QuizQuestionGroup();
        partialUpdatedQuizQuestionGroup.setId(quizQuestionGroup.getId());

        restQuizQuestionGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuizQuestionGroup.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuizQuestionGroup))
            )
            .andExpect(status().isOk());

        // Validate the QuizQuestionGroup in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuizQuestionGroupUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedQuizQuestionGroup, quizQuestionGroup),
            getPersistedQuizQuestionGroup(quizQuestionGroup)
        );
    }

    @Test
    @Transactional
    void fullUpdateQuizQuestionGroupWithPatch() throws Exception {
        // Initialize the database
        insertedQuizQuestionGroup = quizQuestionGroupRepository.saveAndFlush(quizQuestionGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizQuestionGroup using partial update
        QuizQuestionGroup partialUpdatedQuizQuestionGroup = new QuizQuestionGroup();
        partialUpdatedQuizQuestionGroup.setId(quizQuestionGroup.getId());

        partialUpdatedQuizQuestionGroup.questionCount(UPDATED_QUESTION_COUNT);

        restQuizQuestionGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuizQuestionGroup.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuizQuestionGroup))
            )
            .andExpect(status().isOk());

        // Validate the QuizQuestionGroup in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuizQuestionGroupUpdatableFieldsEquals(
            partialUpdatedQuizQuestionGroup,
            getPersistedQuizQuestionGroup(partialUpdatedQuizQuestionGroup)
        );
    }

    @Test
    @Transactional
    void patchNonExistingQuizQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizQuestionGroup.setId(longCount.incrementAndGet());

        // Create the QuizQuestionGroup
        QuizQuestionGroupDTO quizQuestionGroupDTO = quizQuestionGroupMapper.toDto(quizQuestionGroup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizQuestionGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, quizQuestionGroupDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(quizQuestionGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizQuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchQuizQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizQuestionGroup.setId(longCount.incrementAndGet());

        // Create the QuizQuestionGroup
        QuizQuestionGroupDTO quizQuestionGroupDTO = quizQuestionGroupMapper.toDto(quizQuestionGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizQuestionGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(quizQuestionGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizQuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamQuizQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizQuestionGroup.setId(longCount.incrementAndGet());

        // Create the QuizQuestionGroup
        QuizQuestionGroupDTO quizQuestionGroupDTO = quizQuestionGroupMapper.toDto(quizQuestionGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizQuestionGroupMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(quizQuestionGroupDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuizQuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteQuizQuestionGroup() throws Exception {
        // Initialize the database
        insertedQuizQuestionGroup = quizQuestionGroupRepository.saveAndFlush(quizQuestionGroup);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the quizQuestionGroup
        restQuizQuestionGroupMockMvc
            .perform(delete(ENTITY_API_URL_ID, quizQuestionGroup.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return quizQuestionGroupRepository.count();
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

    protected QuizQuestionGroup getPersistedQuizQuestionGroup(QuizQuestionGroup quizQuestionGroup) {
        return quizQuestionGroupRepository.findById(quizQuestionGroup.getId()).orElseThrow();
    }

    protected void assertPersistedQuizQuestionGroupToMatchAllProperties(QuizQuestionGroup expectedQuizQuestionGroup) {
        assertQuizQuestionGroupAllPropertiesEquals(expectedQuizQuestionGroup, getPersistedQuizQuestionGroup(expectedQuizQuestionGroup));
    }

    protected void assertPersistedQuizQuestionGroupToMatchUpdatableProperties(QuizQuestionGroup expectedQuizQuestionGroup) {
        assertQuizQuestionGroupAllUpdatablePropertiesEquals(
            expectedQuizQuestionGroup,
            getPersistedQuizQuestionGroup(expectedQuizQuestionGroup)
        );
    }
}
