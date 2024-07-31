package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.AssignmentCommentAsserts.*;
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
import uz.momoit.lms_canvas.domain.AssignmentComment;
import uz.momoit.lms_canvas.repository.AssignmentCommentRepository;
import uz.momoit.lms_canvas.service.dto.AssignmentCommentDTO;
import uz.momoit.lms_canvas.service.mapper.AssignmentCommentMapper;

/**
 * Integration tests for the {@link AssignmentCommentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AssignmentCommentResourceIT {

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final Instant DEFAULT_COMMENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_COMMENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/assignment-comments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AssignmentCommentRepository assignmentCommentRepository;

    @Autowired
    private AssignmentCommentMapper assignmentCommentMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAssignmentCommentMockMvc;

    private AssignmentComment assignmentComment;

    private AssignmentComment insertedAssignmentComment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AssignmentComment createEntity(EntityManager em) {
        AssignmentComment assignmentComment = new AssignmentComment().comment(DEFAULT_COMMENT).commentDate(DEFAULT_COMMENT_DATE);
        return assignmentComment;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AssignmentComment createUpdatedEntity(EntityManager em) {
        AssignmentComment assignmentComment = new AssignmentComment().comment(UPDATED_COMMENT).commentDate(UPDATED_COMMENT_DATE);
        return assignmentComment;
    }

    @BeforeEach
    public void initTest() {
        assignmentComment = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedAssignmentComment != null) {
            assignmentCommentRepository.delete(insertedAssignmentComment);
            insertedAssignmentComment = null;
        }
    }

    @Test
    @Transactional
    void createAssignmentComment() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the AssignmentComment
        AssignmentCommentDTO assignmentCommentDTO = assignmentCommentMapper.toDto(assignmentComment);
        var returnedAssignmentCommentDTO = om.readValue(
            restAssignmentCommentMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assignmentCommentDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AssignmentCommentDTO.class
        );

        // Validate the AssignmentComment in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedAssignmentComment = assignmentCommentMapper.toEntity(returnedAssignmentCommentDTO);
        assertAssignmentCommentUpdatableFieldsEquals(returnedAssignmentComment, getPersistedAssignmentComment(returnedAssignmentComment));

        insertedAssignmentComment = returnedAssignmentComment;
    }

    @Test
    @Transactional
    void createAssignmentCommentWithExistingId() throws Exception {
        // Create the AssignmentComment with an existing ID
        assignmentComment.setId(1L);
        AssignmentCommentDTO assignmentCommentDTO = assignmentCommentMapper.toDto(assignmentComment);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssignmentCommentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assignmentCommentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AssignmentComment in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCommentIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        assignmentComment.setComment(null);

        // Create the AssignmentComment, which fails.
        AssignmentCommentDTO assignmentCommentDTO = assignmentCommentMapper.toDto(assignmentComment);

        restAssignmentCommentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assignmentCommentDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCommentDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        assignmentComment.setCommentDate(null);

        // Create the AssignmentComment, which fails.
        AssignmentCommentDTO assignmentCommentDTO = assignmentCommentMapper.toDto(assignmentComment);

        restAssignmentCommentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assignmentCommentDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAssignmentComments() throws Exception {
        // Initialize the database
        insertedAssignmentComment = assignmentCommentRepository.saveAndFlush(assignmentComment);

        // Get all the assignmentCommentList
        restAssignmentCommentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assignmentComment.getId().intValue())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)))
            .andExpect(jsonPath("$.[*].commentDate").value(hasItem(DEFAULT_COMMENT_DATE.toString())));
    }

    @Test
    @Transactional
    void getAssignmentComment() throws Exception {
        // Initialize the database
        insertedAssignmentComment = assignmentCommentRepository.saveAndFlush(assignmentComment);

        // Get the assignmentComment
        restAssignmentCommentMockMvc
            .perform(get(ENTITY_API_URL_ID, assignmentComment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(assignmentComment.getId().intValue()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT))
            .andExpect(jsonPath("$.commentDate").value(DEFAULT_COMMENT_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAssignmentComment() throws Exception {
        // Get the assignmentComment
        restAssignmentCommentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAssignmentComment() throws Exception {
        // Initialize the database
        insertedAssignmentComment = assignmentCommentRepository.saveAndFlush(assignmentComment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the assignmentComment
        AssignmentComment updatedAssignmentComment = assignmentCommentRepository.findById(assignmentComment.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedAssignmentComment are not directly saved in db
        em.detach(updatedAssignmentComment);
        updatedAssignmentComment.comment(UPDATED_COMMENT).commentDate(UPDATED_COMMENT_DATE);
        AssignmentCommentDTO assignmentCommentDTO = assignmentCommentMapper.toDto(updatedAssignmentComment);

        restAssignmentCommentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, assignmentCommentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(assignmentCommentDTO))
            )
            .andExpect(status().isOk());

        // Validate the AssignmentComment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAssignmentCommentToMatchAllProperties(updatedAssignmentComment);
    }

    @Test
    @Transactional
    void putNonExistingAssignmentComment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentComment.setId(longCount.incrementAndGet());

        // Create the AssignmentComment
        AssignmentCommentDTO assignmentCommentDTO = assignmentCommentMapper.toDto(assignmentComment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssignmentCommentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, assignmentCommentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(assignmentCommentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AssignmentComment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAssignmentComment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentComment.setId(longCount.incrementAndGet());

        // Create the AssignmentComment
        AssignmentCommentDTO assignmentCommentDTO = assignmentCommentMapper.toDto(assignmentComment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssignmentCommentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(assignmentCommentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AssignmentComment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAssignmentComment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentComment.setId(longCount.incrementAndGet());

        // Create the AssignmentComment
        AssignmentCommentDTO assignmentCommentDTO = assignmentCommentMapper.toDto(assignmentComment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssignmentCommentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assignmentCommentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AssignmentComment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAssignmentCommentWithPatch() throws Exception {
        // Initialize the database
        insertedAssignmentComment = assignmentCommentRepository.saveAndFlush(assignmentComment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the assignmentComment using partial update
        AssignmentComment partialUpdatedAssignmentComment = new AssignmentComment();
        partialUpdatedAssignmentComment.setId(assignmentComment.getId());

        restAssignmentCommentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAssignmentComment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAssignmentComment))
            )
            .andExpect(status().isOk());

        // Validate the AssignmentComment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAssignmentCommentUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAssignmentComment, assignmentComment),
            getPersistedAssignmentComment(assignmentComment)
        );
    }

    @Test
    @Transactional
    void fullUpdateAssignmentCommentWithPatch() throws Exception {
        // Initialize the database
        insertedAssignmentComment = assignmentCommentRepository.saveAndFlush(assignmentComment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the assignmentComment using partial update
        AssignmentComment partialUpdatedAssignmentComment = new AssignmentComment();
        partialUpdatedAssignmentComment.setId(assignmentComment.getId());

        partialUpdatedAssignmentComment.comment(UPDATED_COMMENT).commentDate(UPDATED_COMMENT_DATE);

        restAssignmentCommentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAssignmentComment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAssignmentComment))
            )
            .andExpect(status().isOk());

        // Validate the AssignmentComment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAssignmentCommentUpdatableFieldsEquals(
            partialUpdatedAssignmentComment,
            getPersistedAssignmentComment(partialUpdatedAssignmentComment)
        );
    }

    @Test
    @Transactional
    void patchNonExistingAssignmentComment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentComment.setId(longCount.incrementAndGet());

        // Create the AssignmentComment
        AssignmentCommentDTO assignmentCommentDTO = assignmentCommentMapper.toDto(assignmentComment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssignmentCommentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, assignmentCommentDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(assignmentCommentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AssignmentComment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAssignmentComment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentComment.setId(longCount.incrementAndGet());

        // Create the AssignmentComment
        AssignmentCommentDTO assignmentCommentDTO = assignmentCommentMapper.toDto(assignmentComment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssignmentCommentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(assignmentCommentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AssignmentComment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAssignmentComment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentComment.setId(longCount.incrementAndGet());

        // Create the AssignmentComment
        AssignmentCommentDTO assignmentCommentDTO = assignmentCommentMapper.toDto(assignmentComment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssignmentCommentMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(assignmentCommentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AssignmentComment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAssignmentComment() throws Exception {
        // Initialize the database
        insertedAssignmentComment = assignmentCommentRepository.saveAndFlush(assignmentComment);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the assignmentComment
        restAssignmentCommentMockMvc
            .perform(delete(ENTITY_API_URL_ID, assignmentComment.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return assignmentCommentRepository.count();
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

    protected AssignmentComment getPersistedAssignmentComment(AssignmentComment assignmentComment) {
        return assignmentCommentRepository.findById(assignmentComment.getId()).orElseThrow();
    }

    protected void assertPersistedAssignmentCommentToMatchAllProperties(AssignmentComment expectedAssignmentComment) {
        assertAssignmentCommentAllPropertiesEquals(expectedAssignmentComment, getPersistedAssignmentComment(expectedAssignmentComment));
    }

    protected void assertPersistedAssignmentCommentToMatchUpdatableProperties(AssignmentComment expectedAssignmentComment) {
        assertAssignmentCommentAllUpdatablePropertiesEquals(
            expectedAssignmentComment,
            getPersistedAssignmentComment(expectedAssignmentComment)
        );
    }
}
