package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.CourseWeekInfoAsserts.*;
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
import uz.momoit.lms_canvas.domain.CourseWeekInfo;
import uz.momoit.lms_canvas.repository.CourseWeekInfoRepository;
import uz.momoit.lms_canvas.service.dto.CourseWeekInfoDTO;
import uz.momoit.lms_canvas.service.mapper.CourseWeekInfoMapper;

/**
 * Integration tests for the {@link CourseWeekInfoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CourseWeekInfoResourceIT {

    private static final Integer DEFAULT_TOTAL_WEEK = 1;
    private static final Integer UPDATED_TOTAL_WEEK = 2;

    private static final Integer DEFAULT_LESSON_PER_WEEK = 1;
    private static final Integer UPDATED_LESSON_PER_WEEK = 2;

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_WEEK_DAY_COUNT = 1;
    private static final Integer UPDATED_WEEK_DAY_COUNT = 2;

    private static final String ENTITY_API_URL = "/api/course-week-infos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CourseWeekInfoRepository courseWeekInfoRepository;

    @Autowired
    private CourseWeekInfoMapper courseWeekInfoMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCourseWeekInfoMockMvc;

    private CourseWeekInfo courseWeekInfo;

    private CourseWeekInfo insertedCourseWeekInfo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourseWeekInfo createEntity() {
        return new CourseWeekInfo()
            .totalWeek(DEFAULT_TOTAL_WEEK)
            .lessonPerWeek(DEFAULT_LESSON_PER_WEEK)
            .startDate(DEFAULT_START_DATE)
            .weekDayCount(DEFAULT_WEEK_DAY_COUNT);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourseWeekInfo createUpdatedEntity() {
        return new CourseWeekInfo()
            .totalWeek(UPDATED_TOTAL_WEEK)
            .lessonPerWeek(UPDATED_LESSON_PER_WEEK)
            .startDate(UPDATED_START_DATE)
            .weekDayCount(UPDATED_WEEK_DAY_COUNT);
    }

    @BeforeEach
    public void initTest() {
        courseWeekInfo = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCourseWeekInfo != null) {
            courseWeekInfoRepository.delete(insertedCourseWeekInfo);
            insertedCourseWeekInfo = null;
        }
    }

    @Test
    @Transactional
    void createCourseWeekInfo() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CourseWeekInfo
        CourseWeekInfoDTO courseWeekInfoDTO = courseWeekInfoMapper.toDto(courseWeekInfo);
        var returnedCourseWeekInfoDTO = om.readValue(
            restCourseWeekInfoMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseWeekInfoDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CourseWeekInfoDTO.class
        );

        // Validate the CourseWeekInfo in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCourseWeekInfo = courseWeekInfoMapper.toEntity(returnedCourseWeekInfoDTO);
        assertCourseWeekInfoUpdatableFieldsEquals(returnedCourseWeekInfo, getPersistedCourseWeekInfo(returnedCourseWeekInfo));

        insertedCourseWeekInfo = returnedCourseWeekInfo;
    }

    @Test
    @Transactional
    void createCourseWeekInfoWithExistingId() throws Exception {
        // Create the CourseWeekInfo with an existing ID
        courseWeekInfo.setId(1L);
        CourseWeekInfoDTO courseWeekInfoDTO = courseWeekInfoMapper.toDto(courseWeekInfo);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourseWeekInfoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseWeekInfoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CourseWeekInfo in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCourseWeekInfos() throws Exception {
        // Initialize the database
        insertedCourseWeekInfo = courseWeekInfoRepository.saveAndFlush(courseWeekInfo);

        // Get all the courseWeekInfoList
        restCourseWeekInfoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courseWeekInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].totalWeek").value(hasItem(DEFAULT_TOTAL_WEEK)))
            .andExpect(jsonPath("$.[*].lessonPerWeek").value(hasItem(DEFAULT_LESSON_PER_WEEK)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].weekDayCount").value(hasItem(DEFAULT_WEEK_DAY_COUNT)));
    }

    @Test
    @Transactional
    void getCourseWeekInfo() throws Exception {
        // Initialize the database
        insertedCourseWeekInfo = courseWeekInfoRepository.saveAndFlush(courseWeekInfo);

        // Get the courseWeekInfo
        restCourseWeekInfoMockMvc
            .perform(get(ENTITY_API_URL_ID, courseWeekInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(courseWeekInfo.getId().intValue()))
            .andExpect(jsonPath("$.totalWeek").value(DEFAULT_TOTAL_WEEK))
            .andExpect(jsonPath("$.lessonPerWeek").value(DEFAULT_LESSON_PER_WEEK))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.weekDayCount").value(DEFAULT_WEEK_DAY_COUNT));
    }

    @Test
    @Transactional
    void getNonExistingCourseWeekInfo() throws Exception {
        // Get the courseWeekInfo
        restCourseWeekInfoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCourseWeekInfo() throws Exception {
        // Initialize the database
        insertedCourseWeekInfo = courseWeekInfoRepository.saveAndFlush(courseWeekInfo);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseWeekInfo
        CourseWeekInfo updatedCourseWeekInfo = courseWeekInfoRepository.findById(courseWeekInfo.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCourseWeekInfo are not directly saved in db
        em.detach(updatedCourseWeekInfo);
        updatedCourseWeekInfo
            .totalWeek(UPDATED_TOTAL_WEEK)
            .lessonPerWeek(UPDATED_LESSON_PER_WEEK)
            .startDate(UPDATED_START_DATE)
            .weekDayCount(UPDATED_WEEK_DAY_COUNT);
        CourseWeekInfoDTO courseWeekInfoDTO = courseWeekInfoMapper.toDto(updatedCourseWeekInfo);

        restCourseWeekInfoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, courseWeekInfoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseWeekInfoDTO))
            )
            .andExpect(status().isOk());

        // Validate the CourseWeekInfo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCourseWeekInfoToMatchAllProperties(updatedCourseWeekInfo);
    }

    @Test
    @Transactional
    void putNonExistingCourseWeekInfo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeekInfo.setId(longCount.incrementAndGet());

        // Create the CourseWeekInfo
        CourseWeekInfoDTO courseWeekInfoDTO = courseWeekInfoMapper.toDto(courseWeekInfo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourseWeekInfoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, courseWeekInfoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseWeekInfoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseWeekInfo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCourseWeekInfo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeekInfo.setId(longCount.incrementAndGet());

        // Create the CourseWeekInfo
        CourseWeekInfoDTO courseWeekInfoDTO = courseWeekInfoMapper.toDto(courseWeekInfo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseWeekInfoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseWeekInfoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseWeekInfo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCourseWeekInfo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeekInfo.setId(longCount.incrementAndGet());

        // Create the CourseWeekInfo
        CourseWeekInfoDTO courseWeekInfoDTO = courseWeekInfoMapper.toDto(courseWeekInfo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseWeekInfoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseWeekInfoDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CourseWeekInfo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCourseWeekInfoWithPatch() throws Exception {
        // Initialize the database
        insertedCourseWeekInfo = courseWeekInfoRepository.saveAndFlush(courseWeekInfo);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseWeekInfo using partial update
        CourseWeekInfo partialUpdatedCourseWeekInfo = new CourseWeekInfo();
        partialUpdatedCourseWeekInfo.setId(courseWeekInfo.getId());

        partialUpdatedCourseWeekInfo
            .lessonPerWeek(UPDATED_LESSON_PER_WEEK)
            .startDate(UPDATED_START_DATE)
            .weekDayCount(UPDATED_WEEK_DAY_COUNT);

        restCourseWeekInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourseWeekInfo.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourseWeekInfo))
            )
            .andExpect(status().isOk());

        // Validate the CourseWeekInfo in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourseWeekInfoUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCourseWeekInfo, courseWeekInfo),
            getPersistedCourseWeekInfo(courseWeekInfo)
        );
    }

    @Test
    @Transactional
    void fullUpdateCourseWeekInfoWithPatch() throws Exception {
        // Initialize the database
        insertedCourseWeekInfo = courseWeekInfoRepository.saveAndFlush(courseWeekInfo);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseWeekInfo using partial update
        CourseWeekInfo partialUpdatedCourseWeekInfo = new CourseWeekInfo();
        partialUpdatedCourseWeekInfo.setId(courseWeekInfo.getId());

        partialUpdatedCourseWeekInfo
            .totalWeek(UPDATED_TOTAL_WEEK)
            .lessonPerWeek(UPDATED_LESSON_PER_WEEK)
            .startDate(UPDATED_START_DATE)
            .weekDayCount(UPDATED_WEEK_DAY_COUNT);

        restCourseWeekInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourseWeekInfo.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourseWeekInfo))
            )
            .andExpect(status().isOk());

        // Validate the CourseWeekInfo in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourseWeekInfoUpdatableFieldsEquals(partialUpdatedCourseWeekInfo, getPersistedCourseWeekInfo(partialUpdatedCourseWeekInfo));
    }

    @Test
    @Transactional
    void patchNonExistingCourseWeekInfo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeekInfo.setId(longCount.incrementAndGet());

        // Create the CourseWeekInfo
        CourseWeekInfoDTO courseWeekInfoDTO = courseWeekInfoMapper.toDto(courseWeekInfo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourseWeekInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, courseWeekInfoDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courseWeekInfoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseWeekInfo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCourseWeekInfo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeekInfo.setId(longCount.incrementAndGet());

        // Create the CourseWeekInfo
        CourseWeekInfoDTO courseWeekInfoDTO = courseWeekInfoMapper.toDto(courseWeekInfo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseWeekInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courseWeekInfoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseWeekInfo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCourseWeekInfo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseWeekInfo.setId(longCount.incrementAndGet());

        // Create the CourseWeekInfo
        CourseWeekInfoDTO courseWeekInfoDTO = courseWeekInfoMapper.toDto(courseWeekInfo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseWeekInfoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(courseWeekInfoDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CourseWeekInfo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCourseWeekInfo() throws Exception {
        // Initialize the database
        insertedCourseWeekInfo = courseWeekInfoRepository.saveAndFlush(courseWeekInfo);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the courseWeekInfo
        restCourseWeekInfoMockMvc
            .perform(delete(ENTITY_API_URL_ID, courseWeekInfo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return courseWeekInfoRepository.count();
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

    protected CourseWeekInfo getPersistedCourseWeekInfo(CourseWeekInfo courseWeekInfo) {
        return courseWeekInfoRepository.findById(courseWeekInfo.getId()).orElseThrow();
    }

    protected void assertPersistedCourseWeekInfoToMatchAllProperties(CourseWeekInfo expectedCourseWeekInfo) {
        assertCourseWeekInfoAllPropertiesEquals(expectedCourseWeekInfo, getPersistedCourseWeekInfo(expectedCourseWeekInfo));
    }

    protected void assertPersistedCourseWeekInfoToMatchUpdatableProperties(CourseWeekInfo expectedCourseWeekInfo) {
        assertCourseWeekInfoAllUpdatablePropertiesEquals(expectedCourseWeekInfo, getPersistedCourseWeekInfo(expectedCourseWeekInfo));
    }
}
