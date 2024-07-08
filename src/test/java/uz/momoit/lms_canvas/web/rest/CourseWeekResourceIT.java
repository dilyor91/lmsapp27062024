package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.CourseWeekAsserts.*;
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
import uz.momoit.lms_canvas.domain.CourseWeek;
import uz.momoit.lms_canvas.repository.CourseWeekRepository;
import uz.momoit.lms_canvas.service.dto.CourseWeekDTO;
import uz.momoit.lms_canvas.service.mapper.CourseWeekMapper;

/**
 * Integration tests for the {@link CourseWeekResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CourseWeekResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PUBLISHED = false;
    private static final Boolean UPDATED_PUBLISHED = true;

    private static final Instant DEFAULT_WEEK_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_WEEK_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/course-weeks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CourseWeekRepository courseWeekRepository;

    @Autowired
    private CourseWeekMapper courseWeekMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCourseWeekMockMvc;

    private CourseWeek courseWeek;

    private CourseWeek insertedCourseWeek;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourseWeek createEntity(EntityManager em) {
        CourseWeek courseWeek = new CourseWeek().name(DEFAULT_NAME).published(DEFAULT_PUBLISHED).weekDate(DEFAULT_WEEK_DATE);
        return courseWeek;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourseWeek createUpdatedEntity(EntityManager em) {
        CourseWeek courseWeek = new CourseWeek().name(UPDATED_NAME).published(UPDATED_PUBLISHED).weekDate(UPDATED_WEEK_DATE);
        return courseWeek;
    }

    @BeforeEach
    public void initTest() {
        courseWeek = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedCourseWeek != null) {
            courseWeekRepository.delete(insertedCourseWeek);
            insertedCourseWeek = null;
        }
    }

    @Test
    @Transactional
    void createCourseWeek() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CourseWeek
        CourseWeekDTO courseWeekDTO = courseWeekMapper.toDto(courseWeek);
        var returnedCourseWeekDTO = om.readValue(
            restCourseWeekMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseWeekDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CourseWeekDTO.class
        );

        // Validate the CourseWeek in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCourseWeek = courseWeekMapper.toEntity(returnedCourseWeekDTO);
        assertCourseWeekUpdatableFieldsEquals(returnedCourseWeek, getPersistedCourseWeek(returnedCourseWeek));

        insertedCourseWeek = returnedCourseWeek;
    }

    @Test
    @Transactional
    void createCourseWeekWithExistingId() throws Exception {
        // Create the CourseWeek with an existing ID
        courseWeek.setId(1L);
        CourseWeekDTO courseWeekDTO = courseWeekMapper.toDto(courseWeek);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourseWeekMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseWeekDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CourseWeek in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCourseWeeks() throws Exception {
        // Initialize the database
        insertedCourseWeek = courseWeekRepository.saveAndFlush(courseWeek);

        // Get all the courseWeekList
        restCourseWeekMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courseWeek.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].published").value(hasItem(DEFAULT_PUBLISHED.booleanValue())))
            .andExpect(jsonPath("$.[*].weekDate").value(hasItem(DEFAULT_WEEK_DATE.toString())));
    }

    @Test
    @Transactional
    void getCourseWeek() throws Exception {
        // Initialize the database
        insertedCourseWeek = courseWeekRepository.saveAndFlush(courseWeek);

        // Get the courseWeek
        restCourseWeekMockMvc
            .perform(get(ENTITY_API_URL_ID, courseWeek.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(courseWeek.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.published").value(DEFAULT_PUBLISHED.booleanValue()))
            .andExpect(jsonPath("$.weekDate").value(DEFAULT_WEEK_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCourseWeek() throws Exception {
        // Get the courseWeek
        restCourseWeekMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCourseWeek() throws Exception {
        // Initialize the database
        insertedCourseWeek = courseWeekRepository.saveAndFlush(courseWeek);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseWeek
        CourseWeek updatedCourseWeek = courseWeekRepository.findById(courseWeek.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCourseWeek are not directly saved in db
        em.detach(updatedCourseWeek);
        updatedCourseWeek.name(UPDATED_NAME).published(UPDATED_PUBLISHED).weekDate(UPDATED_WEEK_DATE);
        CourseWeekDTO courseWeekDTO = courseWeekMapper.toDto(updatedCourseWeek);

        restCourseWeekMockMvc
            .perform(
                put(ENTITY_API_URL_ID, courseWeekDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseWeekDTO))
            )
            .andExpect(status().isOk());

        // Validate the CourseWeek in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCourseWeekToMatchAllProperties(updatedCourseWeek);
    }

    @Test
    @Transactional
    void putNonExistingCourseWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeek.setId(longCount.incrementAndGet());

        // Create the CourseWeek
        CourseWeekDTO courseWeekDTO = courseWeekMapper.toDto(courseWeek);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourseWeekMockMvc
            .perform(
                put(ENTITY_API_URL_ID, courseWeekDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseWeekDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseWeek in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCourseWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeek.setId(longCount.incrementAndGet());

        // Create the CourseWeek
        CourseWeekDTO courseWeekDTO = courseWeekMapper.toDto(courseWeek);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseWeekMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseWeekDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseWeek in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCourseWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeek.setId(longCount.incrementAndGet());

        // Create the CourseWeek
        CourseWeekDTO courseWeekDTO = courseWeekMapper.toDto(courseWeek);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseWeekMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseWeekDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CourseWeek in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCourseWeekWithPatch() throws Exception {
        // Initialize the database
        insertedCourseWeek = courseWeekRepository.saveAndFlush(courseWeek);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseWeek using partial update
        CourseWeek partialUpdatedCourseWeek = new CourseWeek();
        partialUpdatedCourseWeek.setId(courseWeek.getId());

        partialUpdatedCourseWeek.name(UPDATED_NAME);

        restCourseWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourseWeek.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourseWeek))
            )
            .andExpect(status().isOk());

        // Validate the CourseWeek in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourseWeekUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCourseWeek, courseWeek),
            getPersistedCourseWeek(courseWeek)
        );
    }

    @Test
    @Transactional
    void fullUpdateCourseWeekWithPatch() throws Exception {
        // Initialize the database
        insertedCourseWeek = courseWeekRepository.saveAndFlush(courseWeek);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseWeek using partial update
        CourseWeek partialUpdatedCourseWeek = new CourseWeek();
        partialUpdatedCourseWeek.setId(courseWeek.getId());

        partialUpdatedCourseWeek.name(UPDATED_NAME).published(UPDATED_PUBLISHED).weekDate(UPDATED_WEEK_DATE);

        restCourseWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourseWeek.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourseWeek))
            )
            .andExpect(status().isOk());

        // Validate the CourseWeek in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourseWeekUpdatableFieldsEquals(partialUpdatedCourseWeek, getPersistedCourseWeek(partialUpdatedCourseWeek));
    }

    @Test
    @Transactional
    void patchNonExistingCourseWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeek.setId(longCount.incrementAndGet());

        // Create the CourseWeek
        CourseWeekDTO courseWeekDTO = courseWeekMapper.toDto(courseWeek);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourseWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, courseWeekDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courseWeekDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseWeek in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCourseWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeek.setId(longCount.incrementAndGet());

        // Create the CourseWeek
        CourseWeekDTO courseWeekDTO = courseWeekMapper.toDto(courseWeek);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseWeekMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courseWeekDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseWeek in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCourseWeek() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeek.setId(longCount.incrementAndGet());

        // Create the CourseWeek
        CourseWeekDTO courseWeekDTO = courseWeekMapper.toDto(courseWeek);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseWeekMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(courseWeekDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CourseWeek in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCourseWeek() throws Exception {
        // Initialize the database
        insertedCourseWeek = courseWeekRepository.saveAndFlush(courseWeek);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the courseWeek
        restCourseWeekMockMvc
            .perform(delete(ENTITY_API_URL_ID, courseWeek.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return courseWeekRepository.count();
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

    protected CourseWeek getPersistedCourseWeek(CourseWeek courseWeek) {
        return courseWeekRepository.findById(courseWeek.getId()).orElseThrow();
    }

    protected void assertPersistedCourseWeekToMatchAllProperties(CourseWeek expectedCourseWeek) {
        assertCourseWeekAllPropertiesEquals(expectedCourseWeek, getPersistedCourseWeek(expectedCourseWeek));
    }

    protected void assertPersistedCourseWeekToMatchUpdatableProperties(CourseWeek expectedCourseWeek) {
        assertCourseWeekAllUpdatablePropertiesEquals(expectedCourseWeek, getPersistedCourseWeek(expectedCourseWeek));
    }
}
