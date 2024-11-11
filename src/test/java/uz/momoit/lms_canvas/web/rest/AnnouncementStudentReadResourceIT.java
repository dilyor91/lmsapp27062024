package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.AnnouncementStudentReadAsserts.*;
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
import uz.momoit.lms_canvas.domain.AnnouncementStudentRead;
import uz.momoit.lms_canvas.repository.AnnouncementStudentReadRepository;
import uz.momoit.lms_canvas.service.dto.AnnouncementStudentReadDTO;
import uz.momoit.lms_canvas.service.mapper.AnnouncementStudentReadMapper;

/**
 * Integration tests for the {@link AnnouncementStudentReadResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AnnouncementStudentReadResourceIT {

    private static final Boolean DEFAULT_READ = false;
    private static final Boolean UPDATED_READ = true;

    private static final Instant DEFAULT_READ_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_READ_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/announcement-student-reads";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AnnouncementStudentReadRepository announcementStudentReadRepository;

    @Autowired
    private AnnouncementStudentReadMapper announcementStudentReadMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAnnouncementStudentReadMockMvc;

    private AnnouncementStudentRead announcementStudentRead;

    private AnnouncementStudentRead insertedAnnouncementStudentRead;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnnouncementStudentRead createEntity() {
        return new AnnouncementStudentRead().read(DEFAULT_READ).readAt(DEFAULT_READ_AT);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnnouncementStudentRead createUpdatedEntity() {
        return new AnnouncementStudentRead().read(UPDATED_READ).readAt(UPDATED_READ_AT);
    }

    @BeforeEach
    public void initTest() {
        announcementStudentRead = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedAnnouncementStudentRead != null) {
            announcementStudentReadRepository.delete(insertedAnnouncementStudentRead);
            insertedAnnouncementStudentRead = null;
        }
    }

    @Test
    @Transactional
    void createAnnouncementStudentRead() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the AnnouncementStudentRead
        AnnouncementStudentReadDTO announcementStudentReadDTO = announcementStudentReadMapper.toDto(announcementStudentRead);
        var returnedAnnouncementStudentReadDTO = om.readValue(
            restAnnouncementStudentReadMockMvc
                .perform(
                    post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(announcementStudentReadDTO))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AnnouncementStudentReadDTO.class
        );

        // Validate the AnnouncementStudentRead in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedAnnouncementStudentRead = announcementStudentReadMapper.toEntity(returnedAnnouncementStudentReadDTO);
        assertAnnouncementStudentReadUpdatableFieldsEquals(
            returnedAnnouncementStudentRead,
            getPersistedAnnouncementStudentRead(returnedAnnouncementStudentRead)
        );

        insertedAnnouncementStudentRead = returnedAnnouncementStudentRead;
    }

    @Test
    @Transactional
    void createAnnouncementStudentReadWithExistingId() throws Exception {
        // Create the AnnouncementStudentRead with an existing ID
        announcementStudentRead.setId(1L);
        AnnouncementStudentReadDTO announcementStudentReadDTO = announcementStudentReadMapper.toDto(announcementStudentRead);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnnouncementStudentReadMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(announcementStudentReadDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AnnouncementStudentRead in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAnnouncementStudentReads() throws Exception {
        // Initialize the database
        insertedAnnouncementStudentRead = announcementStudentReadRepository.saveAndFlush(announcementStudentRead);

        // Get all the announcementStudentReadList
        restAnnouncementStudentReadMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(announcementStudentRead.getId().intValue())))
            .andExpect(jsonPath("$.[*].read").value(hasItem(DEFAULT_READ.booleanValue())))
            .andExpect(jsonPath("$.[*].readAt").value(hasItem(DEFAULT_READ_AT.toString())));
    }

    @Test
    @Transactional
    void getAnnouncementStudentRead() throws Exception {
        // Initialize the database
        insertedAnnouncementStudentRead = announcementStudentReadRepository.saveAndFlush(announcementStudentRead);

        // Get the announcementStudentRead
        restAnnouncementStudentReadMockMvc
            .perform(get(ENTITY_API_URL_ID, announcementStudentRead.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(announcementStudentRead.getId().intValue()))
            .andExpect(jsonPath("$.read").value(DEFAULT_READ.booleanValue()))
            .andExpect(jsonPath("$.readAt").value(DEFAULT_READ_AT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAnnouncementStudentRead() throws Exception {
        // Get the announcementStudentRead
        restAnnouncementStudentReadMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAnnouncementStudentRead() throws Exception {
        // Initialize the database
        insertedAnnouncementStudentRead = announcementStudentReadRepository.saveAndFlush(announcementStudentRead);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the announcementStudentRead
        AnnouncementStudentRead updatedAnnouncementStudentRead = announcementStudentReadRepository
            .findById(announcementStudentRead.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedAnnouncementStudentRead are not directly saved in db
        em.detach(updatedAnnouncementStudentRead);
        updatedAnnouncementStudentRead.read(UPDATED_READ).readAt(UPDATED_READ_AT);
        AnnouncementStudentReadDTO announcementStudentReadDTO = announcementStudentReadMapper.toDto(updatedAnnouncementStudentRead);

        restAnnouncementStudentReadMockMvc
            .perform(
                put(ENTITY_API_URL_ID, announcementStudentReadDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(announcementStudentReadDTO))
            )
            .andExpect(status().isOk());

        // Validate the AnnouncementStudentRead in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAnnouncementStudentReadToMatchAllProperties(updatedAnnouncementStudentRead);
    }

    @Test
    @Transactional
    void putNonExistingAnnouncementStudentRead() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementStudentRead.setId(longCount.incrementAndGet());

        // Create the AnnouncementStudentRead
        AnnouncementStudentReadDTO announcementStudentReadDTO = announcementStudentReadMapper.toDto(announcementStudentRead);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnouncementStudentReadMockMvc
            .perform(
                put(ENTITY_API_URL_ID, announcementStudentReadDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(announcementStudentReadDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnnouncementStudentRead in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAnnouncementStudentRead() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementStudentRead.setId(longCount.incrementAndGet());

        // Create the AnnouncementStudentRead
        AnnouncementStudentReadDTO announcementStudentReadDTO = announcementStudentReadMapper.toDto(announcementStudentRead);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementStudentReadMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(announcementStudentReadDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnnouncementStudentRead in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAnnouncementStudentRead() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementStudentRead.setId(longCount.incrementAndGet());

        // Create the AnnouncementStudentRead
        AnnouncementStudentReadDTO announcementStudentReadDTO = announcementStudentReadMapper.toDto(announcementStudentRead);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementStudentReadMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(announcementStudentReadDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AnnouncementStudentRead in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAnnouncementStudentReadWithPatch() throws Exception {
        // Initialize the database
        insertedAnnouncementStudentRead = announcementStudentReadRepository.saveAndFlush(announcementStudentRead);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the announcementStudentRead using partial update
        AnnouncementStudentRead partialUpdatedAnnouncementStudentRead = new AnnouncementStudentRead();
        partialUpdatedAnnouncementStudentRead.setId(announcementStudentRead.getId());

        partialUpdatedAnnouncementStudentRead.read(UPDATED_READ);

        restAnnouncementStudentReadMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnnouncementStudentRead.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAnnouncementStudentRead))
            )
            .andExpect(status().isOk());

        // Validate the AnnouncementStudentRead in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAnnouncementStudentReadUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAnnouncementStudentRead, announcementStudentRead),
            getPersistedAnnouncementStudentRead(announcementStudentRead)
        );
    }

    @Test
    @Transactional
    void fullUpdateAnnouncementStudentReadWithPatch() throws Exception {
        // Initialize the database
        insertedAnnouncementStudentRead = announcementStudentReadRepository.saveAndFlush(announcementStudentRead);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the announcementStudentRead using partial update
        AnnouncementStudentRead partialUpdatedAnnouncementStudentRead = new AnnouncementStudentRead();
        partialUpdatedAnnouncementStudentRead.setId(announcementStudentRead.getId());

        partialUpdatedAnnouncementStudentRead.read(UPDATED_READ).readAt(UPDATED_READ_AT);

        restAnnouncementStudentReadMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnnouncementStudentRead.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAnnouncementStudentRead))
            )
            .andExpect(status().isOk());

        // Validate the AnnouncementStudentRead in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAnnouncementStudentReadUpdatableFieldsEquals(
            partialUpdatedAnnouncementStudentRead,
            getPersistedAnnouncementStudentRead(partialUpdatedAnnouncementStudentRead)
        );
    }

    @Test
    @Transactional
    void patchNonExistingAnnouncementStudentRead() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementStudentRead.setId(longCount.incrementAndGet());

        // Create the AnnouncementStudentRead
        AnnouncementStudentReadDTO announcementStudentReadDTO = announcementStudentReadMapper.toDto(announcementStudentRead);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnouncementStudentReadMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, announcementStudentReadDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(announcementStudentReadDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnnouncementStudentRead in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAnnouncementStudentRead() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementStudentRead.setId(longCount.incrementAndGet());

        // Create the AnnouncementStudentRead
        AnnouncementStudentReadDTO announcementStudentReadDTO = announcementStudentReadMapper.toDto(announcementStudentRead);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementStudentReadMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(announcementStudentReadDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnnouncementStudentRead in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAnnouncementStudentRead() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcementStudentRead.setId(longCount.incrementAndGet());

        // Create the AnnouncementStudentRead
        AnnouncementStudentReadDTO announcementStudentReadDTO = announcementStudentReadMapper.toDto(announcementStudentRead);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementStudentReadMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(announcementStudentReadDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AnnouncementStudentRead in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAnnouncementStudentRead() throws Exception {
        // Initialize the database
        insertedAnnouncementStudentRead = announcementStudentReadRepository.saveAndFlush(announcementStudentRead);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the announcementStudentRead
        restAnnouncementStudentReadMockMvc
            .perform(delete(ENTITY_API_URL_ID, announcementStudentRead.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return announcementStudentReadRepository.count();
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

    protected AnnouncementStudentRead getPersistedAnnouncementStudentRead(AnnouncementStudentRead announcementStudentRead) {
        return announcementStudentReadRepository.findById(announcementStudentRead.getId()).orElseThrow();
    }

    protected void assertPersistedAnnouncementStudentReadToMatchAllProperties(AnnouncementStudentRead expectedAnnouncementStudentRead) {
        assertAnnouncementStudentReadAllPropertiesEquals(
            expectedAnnouncementStudentRead,
            getPersistedAnnouncementStudentRead(expectedAnnouncementStudentRead)
        );
    }

    protected void assertPersistedAnnouncementStudentReadToMatchUpdatableProperties(
        AnnouncementStudentRead expectedAnnouncementStudentRead
    ) {
        assertAnnouncementStudentReadAllUpdatablePropertiesEquals(
            expectedAnnouncementStudentRead,
            getPersistedAnnouncementStudentRead(expectedAnnouncementStudentRead)
        );
    }
}
