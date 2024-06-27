package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.QuestionGroupAsserts.*;
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
import uz.momoit.lms_canvas.domain.QuestionGroup;
import uz.momoit.lms_canvas.repository.QuestionGroupRepository;
import uz.momoit.lms_canvas.service.dto.QuestionGroupDTO;
import uz.momoit.lms_canvas.service.mapper.QuestionGroupMapper;

/**
 * Integration tests for the {@link QuestionGroupResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class QuestionGroupResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/question-groups";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private QuestionGroupRepository questionGroupRepository;

    @Autowired
    private QuestionGroupMapper questionGroupMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuestionGroupMockMvc;

    private QuestionGroup questionGroup;

    private QuestionGroup insertedQuestionGroup;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuestionGroup createEntity(EntityManager em) {
        QuestionGroup questionGroup = new QuestionGroup().name(DEFAULT_NAME);
        return questionGroup;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuestionGroup createUpdatedEntity(EntityManager em) {
        QuestionGroup questionGroup = new QuestionGroup().name(UPDATED_NAME);
        return questionGroup;
    }

    @BeforeEach
    public void initTest() {
        questionGroup = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedQuestionGroup != null) {
            questionGroupRepository.delete(insertedQuestionGroup);
            insertedQuestionGroup = null;
        }
    }

    @Test
    @Transactional
    void createQuestionGroup() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the QuestionGroup
        QuestionGroupDTO questionGroupDTO = questionGroupMapper.toDto(questionGroup);
        var returnedQuestionGroupDTO = om.readValue(
            restQuestionGroupMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(questionGroupDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            QuestionGroupDTO.class
        );

        // Validate the QuestionGroup in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedQuestionGroup = questionGroupMapper.toEntity(returnedQuestionGroupDTO);
        assertQuestionGroupUpdatableFieldsEquals(returnedQuestionGroup, getPersistedQuestionGroup(returnedQuestionGroup));

        insertedQuestionGroup = returnedQuestionGroup;
    }

    @Test
    @Transactional
    void createQuestionGroupWithExistingId() throws Exception {
        // Create the QuestionGroup with an existing ID
        questionGroup.setId(1L);
        QuestionGroupDTO questionGroupDTO = questionGroupMapper.toDto(questionGroup);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionGroupMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(questionGroupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the QuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        questionGroup.setName(null);

        // Create the QuestionGroup, which fails.
        QuestionGroupDTO questionGroupDTO = questionGroupMapper.toDto(questionGroup);

        restQuestionGroupMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(questionGroupDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllQuestionGroups() throws Exception {
        // Initialize the database
        insertedQuestionGroup = questionGroupRepository.saveAndFlush(questionGroup);

        // Get all the questionGroupList
        restQuestionGroupMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(questionGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getQuestionGroup() throws Exception {
        // Initialize the database
        insertedQuestionGroup = questionGroupRepository.saveAndFlush(questionGroup);

        // Get the questionGroup
        restQuestionGroupMockMvc
            .perform(get(ENTITY_API_URL_ID, questionGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(questionGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingQuestionGroup() throws Exception {
        // Get the questionGroup
        restQuestionGroupMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingQuestionGroup() throws Exception {
        // Initialize the database
        insertedQuestionGroup = questionGroupRepository.saveAndFlush(questionGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the questionGroup
        QuestionGroup updatedQuestionGroup = questionGroupRepository.findById(questionGroup.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedQuestionGroup are not directly saved in db
        em.detach(updatedQuestionGroup);
        updatedQuestionGroup.name(UPDATED_NAME);
        QuestionGroupDTO questionGroupDTO = questionGroupMapper.toDto(updatedQuestionGroup);

        restQuestionGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, questionGroupDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(questionGroupDTO))
            )
            .andExpect(status().isOk());

        // Validate the QuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedQuestionGroupToMatchAllProperties(updatedQuestionGroup);
    }

    @Test
    @Transactional
    void putNonExistingQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        questionGroup.setId(longCount.incrementAndGet());

        // Create the QuestionGroup
        QuestionGroupDTO questionGroupDTO = questionGroupMapper.toDto(questionGroup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, questionGroupDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(questionGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        questionGroup.setId(longCount.incrementAndGet());

        // Create the QuestionGroup
        QuestionGroupDTO questionGroupDTO = questionGroupMapper.toDto(questionGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(questionGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        questionGroup.setId(longCount.incrementAndGet());

        // Create the QuestionGroup
        QuestionGroupDTO questionGroupDTO = questionGroupMapper.toDto(questionGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionGroupMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(questionGroupDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateQuestionGroupWithPatch() throws Exception {
        // Initialize the database
        insertedQuestionGroup = questionGroupRepository.saveAndFlush(questionGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the questionGroup using partial update
        QuestionGroup partialUpdatedQuestionGroup = new QuestionGroup();
        partialUpdatedQuestionGroup.setId(questionGroup.getId());

        partialUpdatedQuestionGroup.name(UPDATED_NAME);

        restQuestionGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuestionGroup.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuestionGroup))
            )
            .andExpect(status().isOk());

        // Validate the QuestionGroup in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuestionGroupUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedQuestionGroup, questionGroup),
            getPersistedQuestionGroup(questionGroup)
        );
    }

    @Test
    @Transactional
    void fullUpdateQuestionGroupWithPatch() throws Exception {
        // Initialize the database
        insertedQuestionGroup = questionGroupRepository.saveAndFlush(questionGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the questionGroup using partial update
        QuestionGroup partialUpdatedQuestionGroup = new QuestionGroup();
        partialUpdatedQuestionGroup.setId(questionGroup.getId());

        partialUpdatedQuestionGroup.name(UPDATED_NAME);

        restQuestionGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuestionGroup.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuestionGroup))
            )
            .andExpect(status().isOk());

        // Validate the QuestionGroup in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuestionGroupUpdatableFieldsEquals(partialUpdatedQuestionGroup, getPersistedQuestionGroup(partialUpdatedQuestionGroup));
    }

    @Test
    @Transactional
    void patchNonExistingQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        questionGroup.setId(longCount.incrementAndGet());

        // Create the QuestionGroup
        QuestionGroupDTO questionGroupDTO = questionGroupMapper.toDto(questionGroup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, questionGroupDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(questionGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        questionGroup.setId(longCount.incrementAndGet());

        // Create the QuestionGroup
        QuestionGroupDTO questionGroupDTO = questionGroupMapper.toDto(questionGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(questionGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamQuestionGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        questionGroup.setId(longCount.incrementAndGet());

        // Create the QuestionGroup
        QuestionGroupDTO questionGroupDTO = questionGroupMapper.toDto(questionGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionGroupMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(questionGroupDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuestionGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteQuestionGroup() throws Exception {
        // Initialize the database
        insertedQuestionGroup = questionGroupRepository.saveAndFlush(questionGroup);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the questionGroup
        restQuestionGroupMockMvc
            .perform(delete(ENTITY_API_URL_ID, questionGroup.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return questionGroupRepository.count();
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

    protected QuestionGroup getPersistedQuestionGroup(QuestionGroup questionGroup) {
        return questionGroupRepository.findById(questionGroup.getId()).orElseThrow();
    }

    protected void assertPersistedQuestionGroupToMatchAllProperties(QuestionGroup expectedQuestionGroup) {
        assertQuestionGroupAllPropertiesEquals(expectedQuestionGroup, getPersistedQuestionGroup(expectedQuestionGroup));
    }

    protected void assertPersistedQuestionGroupToMatchUpdatableProperties(QuestionGroup expectedQuestionGroup) {
        assertQuestionGroupAllUpdatablePropertiesEquals(expectedQuestionGroup, getPersistedQuestionGroup(expectedQuestionGroup));
    }
}
