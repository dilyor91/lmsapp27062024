package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.WikiPageAsserts.*;
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
import uz.momoit.lms_canvas.domain.WikiPage;
import uz.momoit.lms_canvas.domain.enumeration.WhoAllowed;
import uz.momoit.lms_canvas.repository.WikiPageRepository;
import uz.momoit.lms_canvas.service.dto.WikiPageDTO;
import uz.momoit.lms_canvas.service.mapper.WikiPageMapper;

/**
 * Integration tests for the {@link WikiPageResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WikiPageResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final WhoAllowed DEFAULT_WHO_ALLOWED = WhoAllowed.ONLY_TEACHERS;
    private static final WhoAllowed UPDATED_WHO_ALLOWED = WhoAllowed.TEACHER_AND_STUDENTS;

    private static final Boolean DEFAULT_ADD_TO_STUDENTS = false;
    private static final Boolean UPDATED_ADD_TO_STUDENTS = true;

    private static final Instant DEFAULT_ADD_TO_STUDENTS_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ADD_TO_STUDENTS_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_PUBLISHED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PUBLISHED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_PUBLISHED = false;
    private static final Boolean UPDATED_PUBLISHED = true;

    private static final Boolean DEFAULT_NOTIFY_USERS_CHANGES = false;
    private static final Boolean UPDATED_NOTIFY_USERS_CHANGES = true;

    private static final String ENTITY_API_URL = "/api/wiki-pages";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private WikiPageRepository wikiPageRepository;

    @Autowired
    private WikiPageMapper wikiPageMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWikiPageMockMvc;

    private WikiPage wikiPage;

    private WikiPage insertedWikiPage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WikiPage createEntity(EntityManager em) {
        WikiPage wikiPage = new WikiPage()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT)
            .whoAllowed(DEFAULT_WHO_ALLOWED)
            .addToStudents(DEFAULT_ADD_TO_STUDENTS)
            .addToStudentsDate(DEFAULT_ADD_TO_STUDENTS_DATE)
            .publishedAt(DEFAULT_PUBLISHED_AT)
            .published(DEFAULT_PUBLISHED)
            .notifyUsersChanges(DEFAULT_NOTIFY_USERS_CHANGES);
        return wikiPage;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WikiPage createUpdatedEntity(EntityManager em) {
        WikiPage wikiPage = new WikiPage()
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .whoAllowed(UPDATED_WHO_ALLOWED)
            .addToStudents(UPDATED_ADD_TO_STUDENTS)
            .addToStudentsDate(UPDATED_ADD_TO_STUDENTS_DATE)
            .publishedAt(UPDATED_PUBLISHED_AT)
            .published(UPDATED_PUBLISHED)
            .notifyUsersChanges(UPDATED_NOTIFY_USERS_CHANGES);
        return wikiPage;
    }

    @BeforeEach
    public void initTest() {
        wikiPage = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedWikiPage != null) {
            wikiPageRepository.delete(insertedWikiPage);
            insertedWikiPage = null;
        }
    }

    @Test
    @Transactional
    void createWikiPage() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the WikiPage
        WikiPageDTO wikiPageDTO = wikiPageMapper.toDto(wikiPage);
        var returnedWikiPageDTO = om.readValue(
            restWikiPageMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(wikiPageDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            WikiPageDTO.class
        );

        // Validate the WikiPage in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedWikiPage = wikiPageMapper.toEntity(returnedWikiPageDTO);
        assertWikiPageUpdatableFieldsEquals(returnedWikiPage, getPersistedWikiPage(returnedWikiPage));

        insertedWikiPage = returnedWikiPage;
    }

    @Test
    @Transactional
    void createWikiPageWithExistingId() throws Exception {
        // Create the WikiPage with an existing ID
        wikiPage.setId(1L);
        WikiPageDTO wikiPageDTO = wikiPageMapper.toDto(wikiPage);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWikiPageMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(wikiPageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WikiPage in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllWikiPages() throws Exception {
        // Initialize the database
        insertedWikiPage = wikiPageRepository.saveAndFlush(wikiPage);

        // Get all the wikiPageList
        restWikiPageMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wikiPage.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].whoAllowed").value(hasItem(DEFAULT_WHO_ALLOWED.toString())))
            .andExpect(jsonPath("$.[*].addToStudents").value(hasItem(DEFAULT_ADD_TO_STUDENTS.booleanValue())))
            .andExpect(jsonPath("$.[*].addToStudentsDate").value(hasItem(DEFAULT_ADD_TO_STUDENTS_DATE.toString())))
            .andExpect(jsonPath("$.[*].publishedAt").value(hasItem(DEFAULT_PUBLISHED_AT.toString())))
            .andExpect(jsonPath("$.[*].published").value(hasItem(DEFAULT_PUBLISHED.booleanValue())))
            .andExpect(jsonPath("$.[*].notifyUsersChanges").value(hasItem(DEFAULT_NOTIFY_USERS_CHANGES.booleanValue())));
    }

    @Test
    @Transactional
    void getWikiPage() throws Exception {
        // Initialize the database
        insertedWikiPage = wikiPageRepository.saveAndFlush(wikiPage);

        // Get the wikiPage
        restWikiPageMockMvc
            .perform(get(ENTITY_API_URL_ID, wikiPage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(wikiPage.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.whoAllowed").value(DEFAULT_WHO_ALLOWED.toString()))
            .andExpect(jsonPath("$.addToStudents").value(DEFAULT_ADD_TO_STUDENTS.booleanValue()))
            .andExpect(jsonPath("$.addToStudentsDate").value(DEFAULT_ADD_TO_STUDENTS_DATE.toString()))
            .andExpect(jsonPath("$.publishedAt").value(DEFAULT_PUBLISHED_AT.toString()))
            .andExpect(jsonPath("$.published").value(DEFAULT_PUBLISHED.booleanValue()))
            .andExpect(jsonPath("$.notifyUsersChanges").value(DEFAULT_NOTIFY_USERS_CHANGES.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingWikiPage() throws Exception {
        // Get the wikiPage
        restWikiPageMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingWikiPage() throws Exception {
        // Initialize the database
        insertedWikiPage = wikiPageRepository.saveAndFlush(wikiPage);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the wikiPage
        WikiPage updatedWikiPage = wikiPageRepository.findById(wikiPage.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedWikiPage are not directly saved in db
        em.detach(updatedWikiPage);
        updatedWikiPage
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .whoAllowed(UPDATED_WHO_ALLOWED)
            .addToStudents(UPDATED_ADD_TO_STUDENTS)
            .addToStudentsDate(UPDATED_ADD_TO_STUDENTS_DATE)
            .publishedAt(UPDATED_PUBLISHED_AT)
            .published(UPDATED_PUBLISHED)
            .notifyUsersChanges(UPDATED_NOTIFY_USERS_CHANGES);
        WikiPageDTO wikiPageDTO = wikiPageMapper.toDto(updatedWikiPage);

        restWikiPageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, wikiPageDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(wikiPageDTO))
            )
            .andExpect(status().isOk());

        // Validate the WikiPage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedWikiPageToMatchAllProperties(updatedWikiPage);
    }

    @Test
    @Transactional
    void putNonExistingWikiPage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        wikiPage.setId(longCount.incrementAndGet());

        // Create the WikiPage
        WikiPageDTO wikiPageDTO = wikiPageMapper.toDto(wikiPage);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWikiPageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, wikiPageDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(wikiPageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WikiPage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchWikiPage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        wikiPage.setId(longCount.incrementAndGet());

        // Create the WikiPage
        WikiPageDTO wikiPageDTO = wikiPageMapper.toDto(wikiPage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWikiPageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(wikiPageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WikiPage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamWikiPage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        wikiPage.setId(longCount.incrementAndGet());

        // Create the WikiPage
        WikiPageDTO wikiPageDTO = wikiPageMapper.toDto(wikiPage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWikiPageMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(wikiPageDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the WikiPage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateWikiPageWithPatch() throws Exception {
        // Initialize the database
        insertedWikiPage = wikiPageRepository.saveAndFlush(wikiPage);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the wikiPage using partial update
        WikiPage partialUpdatedWikiPage = new WikiPage();
        partialUpdatedWikiPage.setId(wikiPage.getId());

        partialUpdatedWikiPage
            .content(UPDATED_CONTENT)
            .addToStudentsDate(UPDATED_ADD_TO_STUDENTS_DATE)
            .published(UPDATED_PUBLISHED)
            .notifyUsersChanges(UPDATED_NOTIFY_USERS_CHANGES);

        restWikiPageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWikiPage.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWikiPage))
            )
            .andExpect(status().isOk());

        // Validate the WikiPage in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWikiPageUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedWikiPage, wikiPage), getPersistedWikiPage(wikiPage));
    }

    @Test
    @Transactional
    void fullUpdateWikiPageWithPatch() throws Exception {
        // Initialize the database
        insertedWikiPage = wikiPageRepository.saveAndFlush(wikiPage);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the wikiPage using partial update
        WikiPage partialUpdatedWikiPage = new WikiPage();
        partialUpdatedWikiPage.setId(wikiPage.getId());

        partialUpdatedWikiPage
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .whoAllowed(UPDATED_WHO_ALLOWED)
            .addToStudents(UPDATED_ADD_TO_STUDENTS)
            .addToStudentsDate(UPDATED_ADD_TO_STUDENTS_DATE)
            .publishedAt(UPDATED_PUBLISHED_AT)
            .published(UPDATED_PUBLISHED)
            .notifyUsersChanges(UPDATED_NOTIFY_USERS_CHANGES);

        restWikiPageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWikiPage.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWikiPage))
            )
            .andExpect(status().isOk());

        // Validate the WikiPage in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWikiPageUpdatableFieldsEquals(partialUpdatedWikiPage, getPersistedWikiPage(partialUpdatedWikiPage));
    }

    @Test
    @Transactional
    void patchNonExistingWikiPage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        wikiPage.setId(longCount.incrementAndGet());

        // Create the WikiPage
        WikiPageDTO wikiPageDTO = wikiPageMapper.toDto(wikiPage);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWikiPageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, wikiPageDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(wikiPageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WikiPage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchWikiPage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        wikiPage.setId(longCount.incrementAndGet());

        // Create the WikiPage
        WikiPageDTO wikiPageDTO = wikiPageMapper.toDto(wikiPage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWikiPageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(wikiPageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WikiPage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamWikiPage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        wikiPage.setId(longCount.incrementAndGet());

        // Create the WikiPage
        WikiPageDTO wikiPageDTO = wikiPageMapper.toDto(wikiPage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWikiPageMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(wikiPageDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the WikiPage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteWikiPage() throws Exception {
        // Initialize the database
        insertedWikiPage = wikiPageRepository.saveAndFlush(wikiPage);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the wikiPage
        restWikiPageMockMvc
            .perform(delete(ENTITY_API_URL_ID, wikiPage.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return wikiPageRepository.count();
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

    protected WikiPage getPersistedWikiPage(WikiPage wikiPage) {
        return wikiPageRepository.findById(wikiPage.getId()).orElseThrow();
    }

    protected void assertPersistedWikiPageToMatchAllProperties(WikiPage expectedWikiPage) {
        assertWikiPageAllPropertiesEquals(expectedWikiPage, getPersistedWikiPage(expectedWikiPage));
    }

    protected void assertPersistedWikiPageToMatchUpdatableProperties(WikiPage expectedWikiPage) {
        assertWikiPageAllUpdatablePropertiesEquals(expectedWikiPage, getPersistedWikiPage(expectedWikiPage));
    }
}
