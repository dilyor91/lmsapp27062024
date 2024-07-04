package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.QuizCourseSectionAsserts.*;
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
import uz.momoit.lms_canvas.domain.QuizCourseSection;
import uz.momoit.lms_canvas.repository.QuizCourseSectionRepository;
import uz.momoit.lms_canvas.service.dto.QuizCourseSectionDTO;
import uz.momoit.lms_canvas.service.mapper.QuizCourseSectionMapper;

/**
 * Integration tests for the {@link QuizCourseSectionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class QuizCourseSectionResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/quiz-course-sections";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private QuizCourseSectionRepository quizCourseSectionRepository;

    @Autowired
    private QuizCourseSectionMapper quizCourseSectionMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuizCourseSectionMockMvc;

    private QuizCourseSection quizCourseSection;

    private QuizCourseSection insertedQuizCourseSection;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuizCourseSection createEntity(EntityManager em) {
        QuizCourseSection quizCourseSection = new QuizCourseSection().startDate(DEFAULT_START_DATE).endDate(DEFAULT_END_DATE);
        return quizCourseSection;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuizCourseSection createUpdatedEntity(EntityManager em) {
        QuizCourseSection quizCourseSection = new QuizCourseSection().startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE);
        return quizCourseSection;
    }

    @BeforeEach
    public void initTest() {
        quizCourseSection = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedQuizCourseSection != null) {
            quizCourseSectionRepository.delete(insertedQuizCourseSection);
            insertedQuizCourseSection = null;
        }
    }

    @Test
    @Transactional
    void createQuizCourseSection() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the QuizCourseSection
        QuizCourseSectionDTO quizCourseSectionDTO = quizCourseSectionMapper.toDto(quizCourseSection);
        var returnedQuizCourseSectionDTO = om.readValue(
            restQuizCourseSectionMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizCourseSectionDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            QuizCourseSectionDTO.class
        );

        // Validate the QuizCourseSection in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedQuizCourseSection = quizCourseSectionMapper.toEntity(returnedQuizCourseSectionDTO);
        assertQuizCourseSectionUpdatableFieldsEquals(returnedQuizCourseSection, getPersistedQuizCourseSection(returnedQuizCourseSection));

        insertedQuizCourseSection = returnedQuizCourseSection;
    }

    @Test
    @Transactional
    void createQuizCourseSectionWithExistingId() throws Exception {
        // Create the QuizCourseSection with an existing ID
        quizCourseSection.setId(1L);
        QuizCourseSectionDTO quizCourseSectionDTO = quizCourseSectionMapper.toDto(quizCourseSection);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizCourseSectionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizCourseSectionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the QuizCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkStartDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        quizCourseSection.setStartDate(null);

        // Create the QuizCourseSection, which fails.
        QuizCourseSectionDTO quizCourseSectionDTO = quizCourseSectionMapper.toDto(quizCourseSection);

        restQuizCourseSectionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizCourseSectionDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEndDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        quizCourseSection.setEndDate(null);

        // Create the QuizCourseSection, which fails.
        QuizCourseSectionDTO quizCourseSectionDTO = quizCourseSectionMapper.toDto(quizCourseSection);

        restQuizCourseSectionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizCourseSectionDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllQuizCourseSections() throws Exception {
        // Initialize the database
        insertedQuizCourseSection = quizCourseSectionRepository.saveAndFlush(quizCourseSection);

        // Get all the quizCourseSectionList
        restQuizCourseSectionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quizCourseSection.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }

    @Test
    @Transactional
    void getQuizCourseSection() throws Exception {
        // Initialize the database
        insertedQuizCourseSection = quizCourseSectionRepository.saveAndFlush(quizCourseSection);

        // Get the quizCourseSection
        restQuizCourseSectionMockMvc
            .perform(get(ENTITY_API_URL_ID, quizCourseSection.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(quizCourseSection.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingQuizCourseSection() throws Exception {
        // Get the quizCourseSection
        restQuizCourseSectionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingQuizCourseSection() throws Exception {
        // Initialize the database
        insertedQuizCourseSection = quizCourseSectionRepository.saveAndFlush(quizCourseSection);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizCourseSection
        QuizCourseSection updatedQuizCourseSection = quizCourseSectionRepository.findById(quizCourseSection.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedQuizCourseSection are not directly saved in db
        em.detach(updatedQuizCourseSection);
        updatedQuizCourseSection.startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE);
        QuizCourseSectionDTO quizCourseSectionDTO = quizCourseSectionMapper.toDto(updatedQuizCourseSection);

        restQuizCourseSectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quizCourseSectionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizCourseSectionDTO))
            )
            .andExpect(status().isOk());

        // Validate the QuizCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedQuizCourseSectionToMatchAllProperties(updatedQuizCourseSection);
    }

    @Test
    @Transactional
    void putNonExistingQuizCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizCourseSection.setId(longCount.incrementAndGet());

        // Create the QuizCourseSection
        QuizCourseSectionDTO quizCourseSectionDTO = quizCourseSectionMapper.toDto(quizCourseSection);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizCourseSectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quizCourseSectionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchQuizCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizCourseSection.setId(longCount.incrementAndGet());

        // Create the QuizCourseSection
        QuizCourseSectionDTO quizCourseSectionDTO = quizCourseSectionMapper.toDto(quizCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizCourseSectionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quizCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamQuizCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizCourseSection.setId(longCount.incrementAndGet());

        // Create the QuizCourseSection
        QuizCourseSectionDTO quizCourseSectionDTO = quizCourseSectionMapper.toDto(quizCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizCourseSectionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quizCourseSectionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuizCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateQuizCourseSectionWithPatch() throws Exception {
        // Initialize the database
        insertedQuizCourseSection = quizCourseSectionRepository.saveAndFlush(quizCourseSection);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizCourseSection using partial update
        QuizCourseSection partialUpdatedQuizCourseSection = new QuizCourseSection();
        partialUpdatedQuizCourseSection.setId(quizCourseSection.getId());

        partialUpdatedQuizCourseSection.startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE);

        restQuizCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuizCourseSection.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuizCourseSection))
            )
            .andExpect(status().isOk());

        // Validate the QuizCourseSection in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuizCourseSectionUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedQuizCourseSection, quizCourseSection),
            getPersistedQuizCourseSection(quizCourseSection)
        );
    }

    @Test
    @Transactional
    void fullUpdateQuizCourseSectionWithPatch() throws Exception {
        // Initialize the database
        insertedQuizCourseSection = quizCourseSectionRepository.saveAndFlush(quizCourseSection);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quizCourseSection using partial update
        QuizCourseSection partialUpdatedQuizCourseSection = new QuizCourseSection();
        partialUpdatedQuizCourseSection.setId(quizCourseSection.getId());

        partialUpdatedQuizCourseSection.startDate(UPDATED_START_DATE).endDate(UPDATED_END_DATE);

        restQuizCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuizCourseSection.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuizCourseSection))
            )
            .andExpect(status().isOk());

        // Validate the QuizCourseSection in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuizCourseSectionUpdatableFieldsEquals(
            partialUpdatedQuizCourseSection,
            getPersistedQuizCourseSection(partialUpdatedQuizCourseSection)
        );
    }

    @Test
    @Transactional
    void patchNonExistingQuizCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizCourseSection.setId(longCount.incrementAndGet());

        // Create the QuizCourseSection
        QuizCourseSectionDTO quizCourseSectionDTO = quizCourseSectionMapper.toDto(quizCourseSection);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, quizCourseSectionDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(quizCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchQuizCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizCourseSection.setId(longCount.incrementAndGet());

        // Create the QuizCourseSection
        QuizCourseSectionDTO quizCourseSectionDTO = quizCourseSectionMapper.toDto(quizCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizCourseSectionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(quizCourseSectionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuizCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamQuizCourseSection() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quizCourseSection.setId(longCount.incrementAndGet());

        // Create the QuizCourseSection
        QuizCourseSectionDTO quizCourseSectionDTO = quizCourseSectionMapper.toDto(quizCourseSection);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuizCourseSectionMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(quizCourseSectionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuizCourseSection in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteQuizCourseSection() throws Exception {
        // Initialize the database
        insertedQuizCourseSection = quizCourseSectionRepository.saveAndFlush(quizCourseSection);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the quizCourseSection
        restQuizCourseSectionMockMvc
            .perform(delete(ENTITY_API_URL_ID, quizCourseSection.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return quizCourseSectionRepository.count();
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

    protected QuizCourseSection getPersistedQuizCourseSection(QuizCourseSection quizCourseSection) {
        return quizCourseSectionRepository.findById(quizCourseSection.getId()).orElseThrow();
    }

    protected void assertPersistedQuizCourseSectionToMatchAllProperties(QuizCourseSection expectedQuizCourseSection) {
        assertQuizCourseSectionAllPropertiesEquals(expectedQuizCourseSection, getPersistedQuizCourseSection(expectedQuizCourseSection));
    }

    protected void assertPersistedQuizCourseSectionToMatchUpdatableProperties(QuizCourseSection expectedQuizCourseSection) {
        assertQuizCourseSectionAllUpdatablePropertiesEquals(
            expectedQuizCourseSection,
            getPersistedQuizCourseSection(expectedQuizCourseSection)
        );
    }
}
