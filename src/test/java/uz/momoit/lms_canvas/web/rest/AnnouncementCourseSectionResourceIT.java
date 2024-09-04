package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.AnnouncementCourseSectionAsserts.*;
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
import uz.momoit.lms_canvas.domain.AnnouncementCourseSection;
import uz.momoit.lms_canvas.repository.AnnouncementCourseSectionRepository;
import uz.momoit.lms_canvas.service.dto.AnnouncementCourseSectionDTO;
import uz.momoit.lms_canvas.service.mapper.AnnouncementCourseSectionMapper;

/**
 * Integration tests for the {@link AnnouncementCourseSectionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AnnouncementCourseSectionResourceIT {

    private static final String ENTITY_API_URL = "/api/announcement-course-sections";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AnnouncementCourseSectionRepository announcementCourseSectionRepository;

    @Autowired
    private AnnouncementCourseSectionMapper announcementCourseSectionMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAnnouncementCourseSectionMockMvc;

    private AnnouncementCourseSection announcementCourseSection;

    private AnnouncementCourseSection insertedAnnouncementCourseSection;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnnouncementCourseSection createEntity() {
        return new AnnouncementCourseSection();
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnnouncementCourseSection createUpdatedEntity() {
        return new AnnouncementCourseSection();
    }

    @BeforeEach
    public void initTest() {
        announcementCourseSection = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedAnnouncementCourseSection != null) {
            announcementCourseSectionRepository.delete(insertedAnnouncementCourseSection);
            insertedAnnouncementCourseSection = null;
        }
    }

    @Test
    @Transactional
    void createAnnouncementCourseSection() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the AnnouncementCourseSection
        AnnouncementCourseSectionDTO announcementCourseSectionDTO = announcementCourseSectionMapper.toDto(announcementCourseSection);
        var returnedAnnouncementCourseSectionDTO = om.readValue(
            restAnnouncementCourseSectionMockMvc
                .perform(
                    post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(announcementCourseSectionDTO))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AnnouncementCourseSectionDTO.class
        );

        // Validate the AnnouncementCourseSection in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedAnnouncementCourseSection = announcementCourseSectionMapper.toEntity(returnedAnnouncementCourseSectionDTO);
        assertAnnouncementCourseSectionUpdatableFieldsEquals(
            returnedAnnouncementCourseSection,
            getPersistedAnnouncementCourseSection(returnedAnnouncementCourseSection)
        );

        insertedAnnouncementCourseSection = returnedAnnouncementCourseSection;
    }

    @Test
    @Transactional
    void createAnnouncementCourseSectionWithExistingId() throws Exception {
        // Create the AnnouncementCourseSection with an existing ID
        announcementCourseSection.setId(1L);
        AnnouncementCourseSectionDTO announcementCourseSectionDTO = announcementCourseSectionMapper.toDto(announcementCourseSection);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnnouncementCourseSectionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(announcementCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnnouncementCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAnnouncementCourseSections() throws Exception {
        // Initialize the database
        insertedAnnouncementCourseSection = announcementCourseSectionRepository.saveAndFlush(announcementCourseSection);

        // Get all the announcementCourseSectionList
        restAnnouncementCourseSectionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(announcementCourseSection.getId().intValue())));
    }

    @Test
    @Transactional
    void getAnnouncementCourseSection() throws Exception {
        // Initialize the database
        insertedAnnouncementCourseSection = announcementCourseSectionRepository.saveAndFlush(announcementCourseSection);

        // Get the announcementCourseSection
        restAnnouncementCourseSectionMockMvc
            .perform(get(ENTITY_API_URL_ID, announcementCourseSection.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(announcementCourseSection.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingAnnouncementCourseSection() throws Exception {
        // Get the announcementCourseSection
        restAnnouncementCourseSectionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAnnouncementCourseSection() throws Exception {
        // Initialize the database
        insertedAnnouncementCourseSection = announcementCourseSectionRepository.saveAndFlush(announcementCourseSection);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the announcementCourseSection
        AnnouncementCourseSection updatedAnnouncementCourseSection = announcementCourseSectionRepository
            .findById(announcementCourseSection.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedAnnouncementCourseSection are not directly saved in db
        em.detach(updatedAnnouncementCourseSection);
        AnnouncementCourseSectionDTO announcementCourseSectionDTO = announcementCourseSectionMapper.toDto(updatedAnnouncementCourseSection);

        restAnnouncementCourseSectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, announcementCourseSectionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(announcementCourseSectionDTO))
            )
            .andExpect(status().isOk());

        // Validate the AnnouncementCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAnnouncementCourseSectionToMatchAllProperties(updatedAnnouncementCourseSection);
    }

    @Test
    @Transactional
    void putNonExistingAnnouncementCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementCourseSection.setId(longCount.incrementAndGet());

        // Create the AnnouncementCourseSection
        AnnouncementCourseSectionDTO announcementCourseSectionDTO = announcementCourseSectionMapper.toDto(announcementCourseSection);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnouncementCourseSectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, announcementCourseSectionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(announcementCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnnouncementCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAnnouncementCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementCourseSection.setId(longCount.incrementAndGet());

        // Create the AnnouncementCourseSection
        AnnouncementCourseSectionDTO announcementCourseSectionDTO = announcementCourseSectionMapper.toDto(announcementCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementCourseSectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(announcementCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnnouncementCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAnnouncementCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementCourseSection.setId(longCount.incrementAndGet());

        // Create the AnnouncementCourseSection
        AnnouncementCourseSectionDTO announcementCourseSectionDTO = announcementCourseSectionMapper.toDto(announcementCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementCourseSectionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(announcementCourseSectionDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AnnouncementCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAnnouncementCourseSectionWithPatch() throws Exception {
        // Initialize the database
        insertedAnnouncementCourseSection = announcementCourseSectionRepository.saveAndFlush(announcementCourseSection);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the announcementCourseSection using partial update
        AnnouncementCourseSection partialUpdatedAnnouncementCourseSection = new AnnouncementCourseSection();
        partialUpdatedAnnouncementCourseSection.setId(announcementCourseSection.getId());

        restAnnouncementCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnnouncementCourseSection.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAnnouncementCourseSection))
            )
            .andExpect(status().isOk());

        // Validate the AnnouncementCourseSection in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAnnouncementCourseSectionUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAnnouncementCourseSection, announcementCourseSection),
            getPersistedAnnouncementCourseSection(announcementCourseSection)
        );
    }

    @Test
    @Transactional
    void fullUpdateAnnouncementCourseSectionWithPatch() throws Exception {
        // Initialize the database
        insertedAnnouncementCourseSection = announcementCourseSectionRepository.saveAndFlush(announcementCourseSection);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the announcementCourseSection using partial update
        AnnouncementCourseSection partialUpdatedAnnouncementCourseSection = new AnnouncementCourseSection();
        partialUpdatedAnnouncementCourseSection.setId(announcementCourseSection.getId());

        restAnnouncementCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnnouncementCourseSection.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAnnouncementCourseSection))
            )
            .andExpect(status().isOk());

        // Validate the AnnouncementCourseSection in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAnnouncementCourseSectionUpdatableFieldsEquals(
            partialUpdatedAnnouncementCourseSection,
            getPersistedAnnouncementCourseSection(partialUpdatedAnnouncementCourseSection)
        );
    }

    @Test
    @Transactional
    void patchNonExistingAnnouncementCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementCourseSection.setId(longCount.incrementAndGet());

        // Create the AnnouncementCourseSection
        AnnouncementCourseSectionDTO announcementCourseSectionDTO = announcementCourseSectionMapper.toDto(announcementCourseSection);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnouncementCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, announcementCourseSectionDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(announcementCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnnouncementCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAnnouncementCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementCourseSection.setId(longCount.incrementAndGet());

        // Create the AnnouncementCourseSection
        AnnouncementCourseSectionDTO announcementCourseSectionDTO = announcementCourseSectionMapper.toDto(announcementCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(announcementCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnnouncementCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAnnouncementCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementCourseSection.setId(longCount.incrementAndGet());

        // Create the AnnouncementCourseSection
        AnnouncementCourseSectionDTO announcementCourseSectionDTO = announcementCourseSectionMapper.toDto(announcementCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(announcementCourseSectionDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AnnouncementCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAnnouncementCourseSection() throws Exception {
        // Initialize the database
        insertedAnnouncementCourseSection = announcementCourseSectionRepository.saveAndFlush(announcementCourseSection);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the announcementCourseSection
        restAnnouncementCourseSectionMockMvc
            .perform(delete(ENTITY_API_URL_ID, announcementCourseSection.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return announcementCourseSectionRepository.count();
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

    protected AnnouncementCourseSection getPersistedAnnouncementCourseSection(AnnouncementCourseSection announcementCourseSection) {
        return announcementCourseSectionRepository.findById(announcementCourseSection.getId()).orElseThrow();
    }

    protected void assertPersistedAnnouncementCourseSectionToMatchAllProperties(
        AnnouncementCourseSection expectedAnnouncementCourseSection
    ) {
        assertAnnouncementCourseSectionAllPropertiesEquals(
            expectedAnnouncementCourseSection,
            getPersistedAnnouncementCourseSection(expectedAnnouncementCourseSection)
        );
    }

    protected void assertPersistedAnnouncementCourseSectionToMatchUpdatableProperties(
        AnnouncementCourseSection expectedAnnouncementCourseSection
    ) {
        assertAnnouncementCourseSectionAllUpdatablePropertiesEquals(
            expectedAnnouncementCourseSection,
            getPersistedAnnouncementCourseSection(expectedAnnouncementCourseSection)
        );
    }
}
