package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.AnnouncementAsserts.*;
import static uz.momoit.lms_canvas.web.rest.TestUtil.createUpdateProxyForBean;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import uz.momoit.lms_canvas.IntegrationTest;
import uz.momoit.lms_canvas.domain.Announcement;
import uz.momoit.lms_canvas.repository.AnnouncementRepository;
import uz.momoit.lms_canvas.service.AnnouncementService;
import uz.momoit.lms_canvas.service.dto.AnnouncementDTO;
import uz.momoit.lms_canvas.service.mapper.AnnouncementMapper;

/**
 * Integration tests for the {@link AnnouncementResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class AnnouncementResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Long DEFAULT_ATTACHMENT_ID = 1L;
    private static final Long UPDATED_ATTACHMENT_ID = 2L;

    private static final Boolean DEFAULT_DELAY_POST = false;
    private static final Boolean UPDATED_DELAY_POST = true;

    private static final Instant DEFAULT_POST_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_POST_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_PUBLISHED = false;
    private static final Boolean UPDATED_PUBLISHED = true;

    private static final String ENTITY_API_URL = "/api/announcements";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Mock
    private AnnouncementRepository announcementRepositoryMock;

    @Autowired
    private AnnouncementMapper announcementMapper;

    @Mock
    private AnnouncementService announcementServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAnnouncementMockMvc;

    private Announcement announcement;

    private Announcement insertedAnnouncement;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Announcement createEntity(EntityManager em) {
        Announcement announcement = new Announcement()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT)
            .attachmentId(DEFAULT_ATTACHMENT_ID)
            .delayPost(DEFAULT_DELAY_POST)
            .postAt(DEFAULT_POST_AT)
            .published(DEFAULT_PUBLISHED);
        return announcement;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Announcement createUpdatedEntity(EntityManager em) {
        Announcement announcement = new Announcement()
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .attachmentId(UPDATED_ATTACHMENT_ID)
            .delayPost(UPDATED_DELAY_POST)
            .postAt(UPDATED_POST_AT)
            .published(UPDATED_PUBLISHED);
        return announcement;
    }

    @BeforeEach
    public void initTest() {
        announcement = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedAnnouncement != null) {
            announcementRepository.delete(insertedAnnouncement);
            insertedAnnouncement = null;
        }
    }

    @Test
    @Transactional
    void createAnnouncement() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Announcement
        AnnouncementDTO announcementDTO = announcementMapper.toDto(announcement);
        var returnedAnnouncementDTO = om.readValue(
            restAnnouncementMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(announcementDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AnnouncementDTO.class
        );

        // Validate the Announcement in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedAnnouncement = announcementMapper.toEntity(returnedAnnouncementDTO);
        assertAnnouncementUpdatableFieldsEquals(returnedAnnouncement, getPersistedAnnouncement(returnedAnnouncement));

        insertedAnnouncement = returnedAnnouncement;
    }

    @Test
    @Transactional
    void createAnnouncementWithExistingId() throws Exception {
        // Create the Announcement with an existing ID
        announcement.setId(1L);
        AnnouncementDTO announcementDTO = announcementMapper.toDto(announcement);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnnouncementMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(announcementDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Announcement in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTitleIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        announcement.setTitle(null);

        // Create the Announcement, which fails.
        AnnouncementDTO announcementDTO = announcementMapper.toDto(announcement);

        restAnnouncementMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(announcementDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkContentIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        announcement.setContent(null);

        // Create the Announcement, which fails.
        AnnouncementDTO announcementDTO = announcementMapper.toDto(announcement);

        restAnnouncementMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(announcementDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAnnouncements() throws Exception {
        // Initialize the database
        insertedAnnouncement = announcementRepository.saveAndFlush(announcement);

        // Get all the announcementList
        restAnnouncementMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(announcement.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].attachmentId").value(hasItem(DEFAULT_ATTACHMENT_ID.intValue())))
            .andExpect(jsonPath("$.[*].delayPost").value(hasItem(DEFAULT_DELAY_POST.booleanValue())))
            .andExpect(jsonPath("$.[*].postAt").value(hasItem(DEFAULT_POST_AT.toString())))
            .andExpect(jsonPath("$.[*].published").value(hasItem(DEFAULT_PUBLISHED.booleanValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllAnnouncementsWithEagerRelationshipsIsEnabled() throws Exception {
        when(announcementServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAnnouncementMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(announcementServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllAnnouncementsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(announcementServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAnnouncementMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(announcementRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getAnnouncement() throws Exception {
        // Initialize the database
        insertedAnnouncement = announcementRepository.saveAndFlush(announcement);

        // Get the announcement
        restAnnouncementMockMvc
            .perform(get(ENTITY_API_URL_ID, announcement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(announcement.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.attachmentId").value(DEFAULT_ATTACHMENT_ID.intValue()))
            .andExpect(jsonPath("$.delayPost").value(DEFAULT_DELAY_POST.booleanValue()))
            .andExpect(jsonPath("$.postAt").value(DEFAULT_POST_AT.toString()))
            .andExpect(jsonPath("$.published").value(DEFAULT_PUBLISHED.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingAnnouncement() throws Exception {
        // Get the announcement
        restAnnouncementMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAnnouncement() throws Exception {
        // Initialize the database
        insertedAnnouncement = announcementRepository.saveAndFlush(announcement);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the announcement
        Announcement updatedAnnouncement = announcementRepository.findById(announcement.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedAnnouncement are not directly saved in db
        em.detach(updatedAnnouncement);
        updatedAnnouncement
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .attachmentId(UPDATED_ATTACHMENT_ID)
            .delayPost(UPDATED_DELAY_POST)
            .postAt(UPDATED_POST_AT)
            .published(UPDATED_PUBLISHED);
        AnnouncementDTO announcementDTO = announcementMapper.toDto(updatedAnnouncement);

        restAnnouncementMockMvc
            .perform(
                put(ENTITY_API_URL_ID, announcementDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(announcementDTO))
            )
            .andExpect(status().isOk());

        // Validate the Announcement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAnnouncementToMatchAllProperties(updatedAnnouncement);
    }

    @Test
    @Transactional
    void putNonExistingAnnouncement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcement.setId(longCount.incrementAndGet());

        // Create the Announcement
        AnnouncementDTO announcementDTO = announcementMapper.toDto(announcement);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnouncementMockMvc
            .perform(
                put(ENTITY_API_URL_ID, announcementDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(announcementDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Announcement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAnnouncement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcement.setId(longCount.incrementAndGet());

        // Create the Announcement
        AnnouncementDTO announcementDTO = announcementMapper.toDto(announcement);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(announcementDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Announcement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAnnouncement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcement.setId(longCount.incrementAndGet());

        // Create the Announcement
        AnnouncementDTO announcementDTO = announcementMapper.toDto(announcement);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(announcementDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Announcement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAnnouncementWithPatch() throws Exception {
        // Initialize the database
        insertedAnnouncement = announcementRepository.saveAndFlush(announcement);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the announcement using partial update
        Announcement partialUpdatedAnnouncement = new Announcement();
        partialUpdatedAnnouncement.setId(announcement.getId());

        partialUpdatedAnnouncement.title(UPDATED_TITLE).delayPost(UPDATED_DELAY_POST).postAt(UPDATED_POST_AT);

        restAnnouncementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnnouncement.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAnnouncement))
            )
            .andExpect(status().isOk());

        // Validate the Announcement in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAnnouncementUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAnnouncement, announcement),
            getPersistedAnnouncement(announcement)
        );
    }

    @Test
    @Transactional
    void fullUpdateAnnouncementWithPatch() throws Exception {
        // Initialize the database
        insertedAnnouncement = announcementRepository.saveAndFlush(announcement);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the announcement using partial update
        Announcement partialUpdatedAnnouncement = new Announcement();
        partialUpdatedAnnouncement.setId(announcement.getId());

        partialUpdatedAnnouncement
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .attachmentId(UPDATED_ATTACHMENT_ID)
            .delayPost(UPDATED_DELAY_POST)
            .postAt(UPDATED_POST_AT)
            .published(UPDATED_PUBLISHED);

        restAnnouncementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnnouncement.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAnnouncement))
            )
            .andExpect(status().isOk());

        // Validate the Announcement in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAnnouncementUpdatableFieldsEquals(partialUpdatedAnnouncement, getPersistedAnnouncement(partialUpdatedAnnouncement));
    }

    @Test
    @Transactional
    void patchNonExistingAnnouncement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcement.setId(longCount.incrementAndGet());

        // Create the Announcement
        AnnouncementDTO announcementDTO = announcementMapper.toDto(announcement);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnouncementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, announcementDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(announcementDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Announcement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAnnouncement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcement.setId(longCount.incrementAndGet());

        // Create the Announcement
        AnnouncementDTO announcementDTO = announcementMapper.toDto(announcement);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(announcementDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Announcement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAnnouncement() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        announcement.setId(longCount.incrementAndGet());

        // Create the Announcement
        AnnouncementDTO announcementDTO = announcementMapper.toDto(announcement);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnouncementMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(announcementDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Announcement in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAnnouncement() throws Exception {
        // Initialize the database
        insertedAnnouncement = announcementRepository.saveAndFlush(announcement);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the announcement
        restAnnouncementMockMvc
            .perform(delete(ENTITY_API_URL_ID, announcement.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return announcementRepository.count();
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

    protected Announcement getPersistedAnnouncement(Announcement announcement) {
        return announcementRepository.findById(announcement.getId()).orElseThrow();
    }

    protected void assertPersistedAnnouncementToMatchAllProperties(Announcement expectedAnnouncement) {
        assertAnnouncementAllPropertiesEquals(expectedAnnouncement, getPersistedAnnouncement(expectedAnnouncement));
    }

    protected void assertPersistedAnnouncementToMatchUpdatableProperties(Announcement expectedAnnouncement) {
        assertAnnouncementAllUpdatablePropertiesEquals(expectedAnnouncement, getPersistedAnnouncement(expectedAnnouncement));
    }
}
