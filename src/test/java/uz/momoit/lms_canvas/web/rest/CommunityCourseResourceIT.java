package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.CommunityCourseAsserts.*;
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
import uz.momoit.lms_canvas.domain.CommunityCourse;
import uz.momoit.lms_canvas.repository.CommunityCourseRepository;
import uz.momoit.lms_canvas.service.dto.CommunityCourseDTO;
import uz.momoit.lms_canvas.service.mapper.CommunityCourseMapper;

/**
 * Integration tests for the {@link CommunityCourseResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CommunityCourseResourceIT {

    private static final String ENTITY_API_URL = "/api/community-courses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CommunityCourseRepository communityCourseRepository;

    @Autowired
    private CommunityCourseMapper communityCourseMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommunityCourseMockMvc;

    private CommunityCourse communityCourse;

    private CommunityCourse insertedCommunityCourse;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommunityCourse createEntity() {
        return new CommunityCourse();
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommunityCourse createUpdatedEntity() {
        return new CommunityCourse();
    }

    @BeforeEach
    public void initTest() {
        communityCourse = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCommunityCourse != null) {
            communityCourseRepository.delete(insertedCommunityCourse);
            insertedCommunityCourse = null;
        }
    }

    @Test
    @Transactional
    void createCommunityCourse() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CommunityCourse
        CommunityCourseDTO communityCourseDTO = communityCourseMapper.toDto(communityCourse);
        var returnedCommunityCourseDTO = om.readValue(
            restCommunityCourseMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityCourseDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CommunityCourseDTO.class
        );

        // Validate the CommunityCourse in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCommunityCourse = communityCourseMapper.toEntity(returnedCommunityCourseDTO);
        assertCommunityCourseUpdatableFieldsEquals(returnedCommunityCourse, getPersistedCommunityCourse(returnedCommunityCourse));

        insertedCommunityCourse = returnedCommunityCourse;
    }

    @Test
    @Transactional
    void createCommunityCourseWithExistingId() throws Exception {
        // Create the CommunityCourse with an existing ID
        communityCourse.setId(1L);
        CommunityCourseDTO communityCourseDTO = communityCourseMapper.toDto(communityCourse);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommunityCourseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityCourseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CommunityCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCommunityCourses() throws Exception {
        // Initialize the database
        insertedCommunityCourse = communityCourseRepository.saveAndFlush(communityCourse);

        // Get all the communityCourseList
        restCommunityCourseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(communityCourse.getId().intValue())));
    }

    @Test
    @Transactional
    void getCommunityCourse() throws Exception {
        // Initialize the database
        insertedCommunityCourse = communityCourseRepository.saveAndFlush(communityCourse);

        // Get the communityCourse
        restCommunityCourseMockMvc
            .perform(get(ENTITY_API_URL_ID, communityCourse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(communityCourse.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCommunityCourse() throws Exception {
        // Get the communityCourse
        restCommunityCourseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCommunityCourse() throws Exception {
        // Initialize the database
        insertedCommunityCourse = communityCourseRepository.saveAndFlush(communityCourse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityCourse
        CommunityCourse updatedCommunityCourse = communityCourseRepository.findById(communityCourse.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCommunityCourse are not directly saved in db
        em.detach(updatedCommunityCourse);
        CommunityCourseDTO communityCourseDTO = communityCourseMapper.toDto(updatedCommunityCourse);

        restCommunityCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, communityCourseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityCourseDTO))
            )
            .andExpect(status().isOk());

        // Validate the CommunityCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCommunityCourseToMatchAllProperties(updatedCommunityCourse);
    }

    @Test
    @Transactional
    void putNonExistingCommunityCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityCourse.setId(longCount.incrementAndGet());

        // Create the CommunityCourse
        CommunityCourseDTO communityCourseDTO = communityCourseMapper.toDto(communityCourse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommunityCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, communityCourseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommunityCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityCourse.setId(longCount.incrementAndGet());

        // Create the CommunityCourse
        CommunityCourseDTO communityCourseDTO = communityCourseMapper.toDto(communityCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommunityCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityCourse.setId(longCount.incrementAndGet());

        // Create the CommunityCourse
        CommunityCourseDTO communityCourseDTO = communityCourseMapper.toDto(communityCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityCourseMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityCourseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommunityCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommunityCourseWithPatch() throws Exception {
        // Initialize the database
        insertedCommunityCourse = communityCourseRepository.saveAndFlush(communityCourse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityCourse using partial update
        CommunityCourse partialUpdatedCommunityCourse = new CommunityCourse();
        partialUpdatedCommunityCourse.setId(communityCourse.getId());

        restCommunityCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommunityCourse.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommunityCourse))
            )
            .andExpect(status().isOk());

        // Validate the CommunityCourse in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommunityCourseUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCommunityCourse, communityCourse),
            getPersistedCommunityCourse(communityCourse)
        );
    }

    @Test
    @Transactional
    void fullUpdateCommunityCourseWithPatch() throws Exception {
        // Initialize the database
        insertedCommunityCourse = communityCourseRepository.saveAndFlush(communityCourse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityCourse using partial update
        CommunityCourse partialUpdatedCommunityCourse = new CommunityCourse();
        partialUpdatedCommunityCourse.setId(communityCourse.getId());

        restCommunityCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommunityCourse.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommunityCourse))
            )
            .andExpect(status().isOk());

        // Validate the CommunityCourse in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommunityCourseUpdatableFieldsEquals(
            partialUpdatedCommunityCourse,
            getPersistedCommunityCourse(partialUpdatedCommunityCourse)
        );
    }

    @Test
    @Transactional
    void patchNonExistingCommunityCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityCourse.setId(longCount.incrementAndGet());

        // Create the CommunityCourse
        CommunityCourseDTO communityCourseDTO = communityCourseMapper.toDto(communityCourse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommunityCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, communityCourseDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(communityCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommunityCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityCourse.setId(longCount.incrementAndGet());

        // Create the CommunityCourse
        CommunityCourseDTO communityCourseDTO = communityCourseMapper.toDto(communityCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(communityCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommunityCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityCourse.setId(longCount.incrementAndGet());

        // Create the CommunityCourse
        CommunityCourseDTO communityCourseDTO = communityCourseMapper.toDto(communityCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityCourseMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(communityCourseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommunityCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommunityCourse() throws Exception {
        // Initialize the database
        insertedCommunityCourse = communityCourseRepository.saveAndFlush(communityCourse);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the communityCourse
        restCommunityCourseMockMvc
            .perform(delete(ENTITY_API_URL_ID, communityCourse.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return communityCourseRepository.count();
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

    protected CommunityCourse getPersistedCommunityCourse(CommunityCourse communityCourse) {
        return communityCourseRepository.findById(communityCourse.getId()).orElseThrow();
    }

    protected void assertPersistedCommunityCourseToMatchAllProperties(CommunityCourse expectedCommunityCourse) {
        assertCommunityCourseAllPropertiesEquals(expectedCommunityCourse, getPersistedCommunityCourse(expectedCommunityCourse));
    }

    protected void assertPersistedCommunityCourseToMatchUpdatableProperties(CommunityCourse expectedCommunityCourse) {
        assertCommunityCourseAllUpdatablePropertiesEquals(expectedCommunityCourse, getPersistedCommunityCourse(expectedCommunityCourse));
    }
}
