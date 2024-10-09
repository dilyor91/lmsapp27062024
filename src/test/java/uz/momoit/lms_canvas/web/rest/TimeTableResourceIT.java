package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.TimeTableAsserts.*;
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
import uz.momoit.lms_canvas.domain.TimeTable;
import uz.momoit.lms_canvas.repository.TimeTableRepository;
import uz.momoit.lms_canvas.service.dto.TimeTableDTO;
import uz.momoit.lms_canvas.service.mapper.TimeTableMapper;

/**
 * Integration tests for the {@link TimeTableResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TimeTableResourceIT {

    private static final Integer DEFAULT_WEEK_NUMBER = 1;
    private static final Integer UPDATED_WEEK_NUMBER = 2;

    private static final Integer DEFAULT_WEEK_DAY_NUMBER = 1;
    private static final Integer UPDATED_WEEK_DAY_NUMBER = 2;

    private static final Integer DEFAULT_PAIR_NUMBER = 1;
    private static final Integer UPDATED_PAIR_NUMBER = 2;

    private static final Instant DEFAULT_ACTIAL_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ACTIAL_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/time-tables";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TimeTableRepository timeTableRepository;

    @Autowired
    private TimeTableMapper timeTableMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTimeTableMockMvc;

    private TimeTable timeTable;

    private TimeTable insertedTimeTable;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TimeTable createEntity() {
        return new TimeTable()
            .weekNumber(DEFAULT_WEEK_NUMBER)
            .weekDayNumber(DEFAULT_WEEK_DAY_NUMBER)
            .pairNumber(DEFAULT_PAIR_NUMBER)
            .actialDate(DEFAULT_ACTIAL_DATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TimeTable createUpdatedEntity() {
        return new TimeTable()
            .weekNumber(UPDATED_WEEK_NUMBER)
            .weekDayNumber(UPDATED_WEEK_DAY_NUMBER)
            .pairNumber(UPDATED_PAIR_NUMBER)
            .actialDate(UPDATED_ACTIAL_DATE);
    }

    @BeforeEach
    public void initTest() {
        timeTable = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedTimeTable != null) {
            timeTableRepository.delete(insertedTimeTable);
            insertedTimeTable = null;
        }
    }

    @Test
    @Transactional
    void createTimeTable() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the TimeTable
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(timeTable);
        var returnedTimeTableDTO = om.readValue(
            restTimeTableMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(timeTableDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TimeTableDTO.class
        );

        // Validate the TimeTable in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedTimeTable = timeTableMapper.toEntity(returnedTimeTableDTO);
        assertTimeTableUpdatableFieldsEquals(returnedTimeTable, getPersistedTimeTable(returnedTimeTable));

        insertedTimeTable = returnedTimeTable;
    }

    @Test
    @Transactional
    void createTimeTableWithExistingId() throws Exception {
        // Create the TimeTable with an existing ID
        timeTable.setId(1L);
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(timeTable);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTimeTableMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(timeTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TimeTable in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTimeTables() throws Exception {
        // Initialize the database
        insertedTimeTable = timeTableRepository.saveAndFlush(timeTable);

        // Get all the timeTableList
        restTimeTableMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timeTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].weekNumber").value(hasItem(DEFAULT_WEEK_NUMBER)))
            .andExpect(jsonPath("$.[*].weekDayNumber").value(hasItem(DEFAULT_WEEK_DAY_NUMBER)))
            .andExpect(jsonPath("$.[*].pairNumber").value(hasItem(DEFAULT_PAIR_NUMBER)))
            .andExpect(jsonPath("$.[*].actialDate").value(hasItem(DEFAULT_ACTIAL_DATE.toString())));
    }

    @Test
    @Transactional
    void getTimeTable() throws Exception {
        // Initialize the database
        insertedTimeTable = timeTableRepository.saveAndFlush(timeTable);

        // Get the timeTable
        restTimeTableMockMvc
            .perform(get(ENTITY_API_URL_ID, timeTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(timeTable.getId().intValue()))
            .andExpect(jsonPath("$.weekNumber").value(DEFAULT_WEEK_NUMBER))
            .andExpect(jsonPath("$.weekDayNumber").value(DEFAULT_WEEK_DAY_NUMBER))
            .andExpect(jsonPath("$.pairNumber").value(DEFAULT_PAIR_NUMBER))
            .andExpect(jsonPath("$.actialDate").value(DEFAULT_ACTIAL_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTimeTable() throws Exception {
        // Get the timeTable
        restTimeTableMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTimeTable() throws Exception {
        // Initialize the database
        insertedTimeTable = timeTableRepository.saveAndFlush(timeTable);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the timeTable
        TimeTable updatedTimeTable = timeTableRepository.findById(timeTable.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTimeTable are not directly saved in db
        em.detach(updatedTimeTable);
        updatedTimeTable
            .weekNumber(UPDATED_WEEK_NUMBER)
            .weekDayNumber(UPDATED_WEEK_DAY_NUMBER)
            .pairNumber(UPDATED_PAIR_NUMBER)
            .actialDate(UPDATED_ACTIAL_DATE);
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(updatedTimeTable);

        restTimeTableMockMvc
            .perform(
                put(ENTITY_API_URL_ID, timeTableDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(timeTableDTO))
            )
            .andExpect(status().isOk());

        // Validate the TimeTable in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTimeTableToMatchAllProperties(updatedTimeTable);
    }

    @Test
    @Transactional
    void putNonExistingTimeTable() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        timeTable.setId(longCount.incrementAndGet());

        // Create the TimeTable
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(timeTable);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTimeTableMockMvc
            .perform(
                put(ENTITY_API_URL_ID, timeTableDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(timeTableDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TimeTable in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTimeTable() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        timeTable.setId(longCount.incrementAndGet());

        // Create the TimeTable
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(timeTable);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTimeTableMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(timeTableDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TimeTable in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTimeTable() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        timeTable.setId(longCount.incrementAndGet());

        // Create the TimeTable
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(timeTable);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTimeTableMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(timeTableDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TimeTable in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTimeTableWithPatch() throws Exception {
        // Initialize the database
        insertedTimeTable = timeTableRepository.saveAndFlush(timeTable);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the timeTable using partial update
        TimeTable partialUpdatedTimeTable = new TimeTable();
        partialUpdatedTimeTable.setId(timeTable.getId());

        partialUpdatedTimeTable.weekNumber(UPDATED_WEEK_NUMBER).weekDayNumber(UPDATED_WEEK_DAY_NUMBER);

        restTimeTableMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTimeTable.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTimeTable))
            )
            .andExpect(status().isOk());

        // Validate the TimeTable in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTimeTableUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedTimeTable, timeTable),
            getPersistedTimeTable(timeTable)
        );
    }

    @Test
    @Transactional
    void fullUpdateTimeTableWithPatch() throws Exception {
        // Initialize the database
        insertedTimeTable = timeTableRepository.saveAndFlush(timeTable);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the timeTable using partial update
        TimeTable partialUpdatedTimeTable = new TimeTable();
        partialUpdatedTimeTable.setId(timeTable.getId());

        partialUpdatedTimeTable
            .weekNumber(UPDATED_WEEK_NUMBER)
            .weekDayNumber(UPDATED_WEEK_DAY_NUMBER)
            .pairNumber(UPDATED_PAIR_NUMBER)
            .actialDate(UPDATED_ACTIAL_DATE);

        restTimeTableMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTimeTable.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTimeTable))
            )
            .andExpect(status().isOk());

        // Validate the TimeTable in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTimeTableUpdatableFieldsEquals(partialUpdatedTimeTable, getPersistedTimeTable(partialUpdatedTimeTable));
    }

    @Test
    @Transactional
    void patchNonExistingTimeTable() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        timeTable.setId(longCount.incrementAndGet());

        // Create the TimeTable
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(timeTable);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTimeTableMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, timeTableDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(timeTableDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TimeTable in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTimeTable() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        timeTable.setId(longCount.incrementAndGet());

        // Create the TimeTable
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(timeTable);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTimeTableMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(timeTableDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TimeTable in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTimeTable() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        timeTable.setId(longCount.incrementAndGet());

        // Create the TimeTable
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(timeTable);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTimeTableMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(timeTableDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TimeTable in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTimeTable() throws Exception {
        // Initialize the database
        insertedTimeTable = timeTableRepository.saveAndFlush(timeTable);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the timeTable
        restTimeTableMockMvc
            .perform(delete(ENTITY_API_URL_ID, timeTable.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return timeTableRepository.count();
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

    protected TimeTable getPersistedTimeTable(TimeTable timeTable) {
        return timeTableRepository.findById(timeTable.getId()).orElseThrow();
    }

    protected void assertPersistedTimeTableToMatchAllProperties(TimeTable expectedTimeTable) {
        assertTimeTableAllPropertiesEquals(expectedTimeTable, getPersistedTimeTable(expectedTimeTable));
    }

    protected void assertPersistedTimeTableToMatchUpdatableProperties(TimeTable expectedTimeTable) {
        assertTimeTableAllUpdatablePropertiesEquals(expectedTimeTable, getPersistedTimeTable(expectedTimeTable));
    }
}
