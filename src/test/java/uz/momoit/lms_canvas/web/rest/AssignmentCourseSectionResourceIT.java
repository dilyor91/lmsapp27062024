package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.AssignmentCourseSectionAsserts.*;
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
import uz.momoit.lms_canvas.domain.AssignmentCourseSection;
import uz.momoit.lms_canvas.repository.AssignmentCourseSectionRepository;
import uz.momoit.lms_canvas.service.dto.AssignmentCourseSectionDTO;
import uz.momoit.lms_canvas.service.mapper.AssignmentCourseSectionMapper;

/**
 * Integration tests for the {@link AssignmentCourseSectionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AssignmentCourseSectionResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/assignment-course-sections";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AssignmentCourseSectionRepository assignmentCourseSectionRepository;

    @Autowired
    private AssignmentCourseSectionMapper assignmentCourseSectionMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAssignmentCourseSectionMockMvc;

    private AssignmentCourseSection assignmentCourseSection;

    private AssignmentCourseSection insertedAssignmentCourseSection;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AssignmentCourseSection createEntity() {
        return new AssignmentCourseSection().startDate(DEFAULT_START_DATE).endDate(DEFAULT_END_DATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AssignmentCourseSection createUpdatedEntity() {
        return new AssignmentCourseSection().startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE);
    }

    @BeforeEach
    public void initTest() {
        assignmentCourseSection = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedAssignmentCourseSection != null) {
            assignmentCourseSectionRepository.delete(insertedAssignmentCourseSection);
            insertedAssignmentCourseSection = null;
        }
    }

    @Test
    @Transactional
    void createAssignmentCourseSection() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the AssignmentCourseSection
        AssignmentCourseSectionDTO assignmentCourseSectionDTO = assignmentCourseSectionMapper.toDto(assignmentCourseSection);
        var returnedAssignmentCourseSectionDTO = om.readValue(
            restAssignmentCourseSectionMockMvc
                .perform(
                    post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assignmentCourseSectionDTO))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AssignmentCourseSectionDTO.class
        );

        // Validate the AssignmentCourseSection in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedAssignmentCourseSection = assignmentCourseSectionMapper.toEntity(returnedAssignmentCourseSectionDTO);
        assertAssignmentCourseSectionUpdatableFieldsEquals(
            returnedAssignmentCourseSection,
            getPersistedAssignmentCourseSection(returnedAssignmentCourseSection)
        );

        insertedAssignmentCourseSection = returnedAssignmentCourseSection;
    }

    @Test
    @Transactional
    void createAssignmentCourseSectionWithExistingId() throws Exception {
        // Create the AssignmentCourseSection with an existing ID
        assignmentCourseSection.setId(1L);
        AssignmentCourseSectionDTO assignmentCourseSectionDTO = assignmentCourseSectionMapper.toDto(assignmentCourseSection);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssignmentCourseSectionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assignmentCourseSectionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AssignmentCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAssignmentCourseSections() throws Exception {
        // Initialize the database
        insertedAssignmentCourseSection = assignmentCourseSectionRepository.saveAndFlush(assignmentCourseSection);

        // Get all the assignmentCourseSectionList
        restAssignmentCourseSectionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assignmentCourseSection.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    void getAssignmentCourseSection() throws Exception {
        // Initialize the database
        insertedAssignmentCourseSection = assignmentCourseSectionRepository.saveAndFlush(assignmentCourseSection);

        // Get the assignmentCourseSection
        restAssignmentCourseSectionMockMvc
            .perform(get(ENTITY_API_URL_ID, assignmentCourseSection.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(assignmentCourseSection.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAssignmentCourseSection() throws Exception {
        // Get the assignmentCourseSection
        restAssignmentCourseSectionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAssignmentCourseSection() throws Exception {
        // Initialize the database
        insertedAssignmentCourseSection = assignmentCourseSectionRepository.saveAndFlush(assignmentCourseSection);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the assignmentCourseSection
        AssignmentCourseSection updatedAssignmentCourseSection = assignmentCourseSectionRepository
            .findById(assignmentCourseSection.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedAssignmentCourseSection are not directly saved in db
        em.detach(updatedAssignmentCourseSection);
        updatedAssignmentCourseSection.startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE);
        AssignmentCourseSectionDTO assignmentCourseSectionDTO = assignmentCourseSectionMapper.toDto(updatedAssignmentCourseSection);

        restAssignmentCourseSectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, assignmentCourseSectionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(assignmentCourseSectionDTO))
            )
            .andExpect(status().isOk());

        // Validate the AssignmentCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAssignmentCourseSectionToMatchAllProperties(updatedAssignmentCourseSection);
    }

    @Test
    @Transactional
    void putNonExistingAssignmentCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentCourseSection.setId(longCount.incrementAndGet());

        // Create the AssignmentCourseSection
        AssignmentCourseSectionDTO assignmentCourseSectionDTO = assignmentCourseSectionMapper.toDto(assignmentCourseSection);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssignmentCourseSectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, assignmentCourseSectionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(assignmentCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AssignmentCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAssignmentCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentCourseSection.setId(longCount.incrementAndGet());

        // Create the AssignmentCourseSection
        AssignmentCourseSectionDTO assignmentCourseSectionDTO = assignmentCourseSectionMapper.toDto(assignmentCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssignmentCourseSectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(assignmentCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AssignmentCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAssignmentCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentCourseSection.setId(longCount.incrementAndGet());

        // Create the AssignmentCourseSection
        AssignmentCourseSectionDTO assignmentCourseSectionDTO = assignmentCourseSectionMapper.toDto(assignmentCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssignmentCourseSectionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assignmentCourseSectionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AssignmentCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAssignmentCourseSectionWithPatch() throws Exception {
        // Initialize the database
        insertedAssignmentCourseSection = assignmentCourseSectionRepository.saveAndFlush(assignmentCourseSection);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the assignmentCourseSection using partial update
        AssignmentCourseSection partialUpdatedAssignmentCourseSection = new AssignmentCourseSection();
        partialUpdatedAssignmentCourseSection.setId(assignmentCourseSection.getId());

        partialUpdatedAssignmentCourseSection.startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE);

        restAssignmentCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAssignmentCourseSection.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAssignmentCourseSection))
            )
            .andExpect(status().isOk());

        // Validate the AssignmentCourseSection in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAssignmentCourseSectionUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAssignmentCourseSection, assignmentCourseSection),
            getPersistedAssignmentCourseSection(assignmentCourseSection)
        );
    }

    @Test
    @Transactional
    void fullUpdateAssignmentCourseSectionWithPatch() throws Exception {
        // Initialize the database
        insertedAssignmentCourseSection = assignmentCourseSectionRepository.saveAndFlush(assignmentCourseSection);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the assignmentCourseSection using partial update
        AssignmentCourseSection partialUpdatedAssignmentCourseSection = new AssignmentCourseSection();
        partialUpdatedAssignmentCourseSection.setId(assignmentCourseSection.getId());

        partialUpdatedAssignmentCourseSection.startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE);

        restAssignmentCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAssignmentCourseSection.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAssignmentCourseSection))
            )
            .andExpect(status().isOk());

        // Validate the AssignmentCourseSection in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAssignmentCourseSectionUpdatableFieldsEquals(
            partialUpdatedAssignmentCourseSection,
            getPersistedAssignmentCourseSection(partialUpdatedAssignmentCourseSection)
        );
    }

    @Test
    @Transactional
    void patchNonExistingAssignmentCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentCourseSection.setId(longCount.incrementAndGet());

        // Create the AssignmentCourseSection
        AssignmentCourseSectionDTO assignmentCourseSectionDTO = assignmentCourseSectionMapper.toDto(assignmentCourseSection);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssignmentCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, assignmentCourseSectionDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(assignmentCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AssignmentCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAssignmentCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentCourseSection.setId(longCount.incrementAndGet());

        // Create the AssignmentCourseSection
        AssignmentCourseSectionDTO assignmentCourseSectionDTO = assignmentCourseSectionMapper.toDto(assignmentCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssignmentCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(assignmentCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AssignmentCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAssignmentCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assignmentCourseSection.setId(longCount.incrementAndGet());

        // Create the AssignmentCourseSection
        AssignmentCourseSectionDTO assignmentCourseSectionDTO = assignmentCourseSectionMapper.toDto(assignmentCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssignmentCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(assignmentCourseSectionDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AssignmentCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAssignmentCourseSection() throws Exception {
        // Initialize the database
        insertedAssignmentCourseSection = assignmentCourseSectionRepository.saveAndFlush(assignmentCourseSection);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the assignmentCourseSection
        restAssignmentCourseSectionMockMvc
            .perform(delete(ENTITY_API_URL_ID, assignmentCourseSection.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return assignmentCourseSectionRepository.count();
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

    protected AssignmentCourseSection getPersistedAssignmentCourseSection(AssignmentCourseSection assignmentCourseSection) {
        return assignmentCourseSectionRepository.findById(assignmentCourseSection.getId()).orElseThrow();
    }

    protected void assertPersistedAssignmentCourseSectionToMatchAllProperties(AssignmentCourseSection expectedAssignmentCourseSection) {
        assertAssignmentCourseSectionAllPropertiesEquals(
            expectedAssignmentCourseSection,
            getPersistedAssignmentCourseSection(expectedAssignmentCourseSection)
        );
    }

    protected void assertPersistedAssignmentCourseSectionToMatchUpdatableProperties(
        AssignmentCourseSection expectedAssignmentCourseSection
    ) {
        assertAssignmentCourseSectionAllUpdatablePropertiesEquals(
            expectedAssignmentCourseSection,
            getPersistedAssignmentCourseSection(expectedAssignmentCourseSection)
        );
    }
}
