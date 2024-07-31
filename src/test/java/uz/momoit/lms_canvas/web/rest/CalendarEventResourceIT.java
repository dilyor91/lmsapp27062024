package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.CalendarEventAsserts.*;
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
import uz.momoit.lms_canvas.domain.CalendarEvent;
import uz.momoit.lms_canvas.domain.enumeration.EventFrequency;
import uz.momoit.lms_canvas.repository.CalendarEventRepository;
import uz.momoit.lms_canvas.repository.UserRepository;
import uz.momoit.lms_canvas.service.dto.CalendarEventDTO;
import uz.momoit.lms_canvas.service.mapper.CalendarEventMapper;

/**
 * Integration tests for the {@link CalendarEventResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CalendarEventResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_START_TIME = 1;
    private static final Integer UPDATED_START_TIME = 2;

    private static final Integer DEFAULT_END_TIME = 1;
    private static final Integer UPDATED_END_TIME = 2;

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final EventFrequency DEFAULT_EVENT_FREQUENCY = EventFrequency.NOREPEAT;
    private static final EventFrequency UPDATED_EVENT_FREQUENCY = EventFrequency.DAILY;

    private static final String ENTITY_API_URL = "/api/calendar-events";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CalendarEventRepository calendarEventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CalendarEventMapper calendarEventMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCalendarEventMockMvc;

    private CalendarEvent calendarEvent;

    private CalendarEvent insertedCalendarEvent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CalendarEvent createEntity(EntityManager em) {
        CalendarEvent calendarEvent = new CalendarEvent()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT)
            .date(DEFAULT_DATE)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .location(DEFAULT_LOCATION)
            .address(DEFAULT_ADDRESS)
            .eventFrequency(DEFAULT_EVENT_FREQUENCY);
        return calendarEvent;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CalendarEvent createUpdatedEntity(EntityManager em) {
        CalendarEvent calendarEvent = new CalendarEvent()
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .location(UPDATED_LOCATION)
            .address(UPDATED_ADDRESS)
            .eventFrequency(UPDATED_EVENT_FREQUENCY);
        return calendarEvent;
    }

    @BeforeEach
    public void initTest() {
        calendarEvent = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedCalendarEvent != null) {
            calendarEventRepository.delete(insertedCalendarEvent);
            insertedCalendarEvent = null;
        }
    }

    @Test
    @Transactional
    void createCalendarEvent() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CalendarEvent
        CalendarEventDTO calendarEventDTO = calendarEventMapper.toDto(calendarEvent);
        var returnedCalendarEventDTO = om.readValue(
            restCalendarEventMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(calendarEventDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CalendarEventDTO.class
        );

        // Validate the CalendarEvent in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCalendarEvent = calendarEventMapper.toEntity(returnedCalendarEventDTO);
        assertCalendarEventUpdatableFieldsEquals(returnedCalendarEvent, getPersistedCalendarEvent(returnedCalendarEvent));

        insertedCalendarEvent = returnedCalendarEvent;
    }

    @Test
    @Transactional
    void createCalendarEventWithExistingId() throws Exception {
        // Create the CalendarEvent with an existing ID
        calendarEvent.setId(1L);
        CalendarEventDTO calendarEventDTO = calendarEventMapper.toDto(calendarEvent);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCalendarEventMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(calendarEventDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CalendarEvent in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCalendarEvents() throws Exception {
        // Initialize the database
        insertedCalendarEvent = calendarEventRepository.saveAndFlush(calendarEvent);

        // Get all the calendarEventList
        restCalendarEventMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(calendarEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME)))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME)))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].eventFrequency").value(hasItem(DEFAULT_EVENT_FREQUENCY.toString())));
    }

    @Test
    @Transactional
    void getCalendarEvent() throws Exception {
        // Initialize the database
        insertedCalendarEvent = calendarEventRepository.saveAndFlush(calendarEvent);

        // Get the calendarEvent
        restCalendarEventMockMvc
            .perform(get(ENTITY_API_URL_ID, calendarEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(calendarEvent.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.eventFrequency").value(DEFAULT_EVENT_FREQUENCY.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCalendarEvent() throws Exception {
        // Get the calendarEvent
        restCalendarEventMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCalendarEvent() throws Exception {
        // Initialize the database
        insertedCalendarEvent = calendarEventRepository.saveAndFlush(calendarEvent);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the calendarEvent
        CalendarEvent updatedCalendarEvent = calendarEventRepository.findById(calendarEvent.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCalendarEvent are not directly saved in db
        em.detach(updatedCalendarEvent);
        updatedCalendarEvent
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .location(UPDATED_LOCATION)
            .address(UPDATED_ADDRESS)
            .eventFrequency(UPDATED_EVENT_FREQUENCY);
        CalendarEventDTO calendarEventDTO = calendarEventMapper.toDto(updatedCalendarEvent);

        restCalendarEventMockMvc
            .perform(
                put(ENTITY_API_URL_ID, calendarEventDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(calendarEventDTO))
            )
            .andExpect(status().isOk());

        // Validate the CalendarEvent in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCalendarEventToMatchAllProperties(updatedCalendarEvent);
    }

    @Test
    @Transactional
    void putNonExistingCalendarEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarEvent.setId(longCount.incrementAndGet());

        // Create the CalendarEvent
        CalendarEventDTO calendarEventDTO = calendarEventMapper.toDto(calendarEvent);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCalendarEventMockMvc
            .perform(
                put(ENTITY_API_URL_ID, calendarEventDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(calendarEventDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CalendarEvent in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCalendarEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarEvent.setId(longCount.incrementAndGet());

        // Create the CalendarEvent
        CalendarEventDTO calendarEventDTO = calendarEventMapper.toDto(calendarEvent);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCalendarEventMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(calendarEventDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CalendarEvent in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCalendarEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarEvent.setId(longCount.incrementAndGet());

        // Create the CalendarEvent
        CalendarEventDTO calendarEventDTO = calendarEventMapper.toDto(calendarEvent);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCalendarEventMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(calendarEventDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CalendarEvent in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCalendarEventWithPatch() throws Exception {
        // Initialize the database
        insertedCalendarEvent = calendarEventRepository.saveAndFlush(calendarEvent);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the calendarEvent using partial update
        CalendarEvent partialUpdatedCalendarEvent = new CalendarEvent();
        partialUpdatedCalendarEvent.setId(calendarEvent.getId());

        partialUpdatedCalendarEvent.title(UPDATED_TITLE).location(UPDATED_LOCATION).address(UPDATED_ADDRESS);

        restCalendarEventMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCalendarEvent.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCalendarEvent))
            )
            .andExpect(status().isOk());

        // Validate the CalendarEvent in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCalendarEventUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCalendarEvent, calendarEvent),
            getPersistedCalendarEvent(calendarEvent)
        );
    }

    @Test
    @Transactional
    void fullUpdateCalendarEventWithPatch() throws Exception {
        // Initialize the database
        insertedCalendarEvent = calendarEventRepository.saveAndFlush(calendarEvent);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the calendarEvent using partial update
        CalendarEvent partialUpdatedCalendarEvent = new CalendarEvent();
        partialUpdatedCalendarEvent.setId(calendarEvent.getId());

        partialUpdatedCalendarEvent
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .location(UPDATED_LOCATION)
            .address(UPDATED_ADDRESS)
            .eventFrequency(UPDATED_EVENT_FREQUENCY);

        restCalendarEventMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCalendarEvent.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCalendarEvent))
            )
            .andExpect(status().isOk());

        // Validate the CalendarEvent in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCalendarEventUpdatableFieldsEquals(partialUpdatedCalendarEvent, getPersistedCalendarEvent(partialUpdatedCalendarEvent));
    }

    @Test
    @Transactional
    void patchNonExistingCalendarEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarEvent.setId(longCount.incrementAndGet());

        // Create the CalendarEvent
        CalendarEventDTO calendarEventDTO = calendarEventMapper.toDto(calendarEvent);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCalendarEventMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, calendarEventDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(calendarEventDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CalendarEvent in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCalendarEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarEvent.setId(longCount.incrementAndGet());

        // Create the CalendarEvent
        CalendarEventDTO calendarEventDTO = calendarEventMapper.toDto(calendarEvent);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCalendarEventMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(calendarEventDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CalendarEvent in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCalendarEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarEvent.setId(longCount.incrementAndGet());

        // Create the CalendarEvent
        CalendarEventDTO calendarEventDTO = calendarEventMapper.toDto(calendarEvent);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCalendarEventMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(calendarEventDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CalendarEvent in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCalendarEvent() throws Exception {
        // Initialize the database
        insertedCalendarEvent = calendarEventRepository.saveAndFlush(calendarEvent);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the calendarEvent
        restCalendarEventMockMvc
            .perform(delete(ENTITY_API_URL_ID, calendarEvent.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return calendarEventRepository.count();
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

    protected CalendarEvent getPersistedCalendarEvent(CalendarEvent calendarEvent) {
        return calendarEventRepository.findById(calendarEvent.getId()).orElseThrow();
    }

    protected void assertPersistedCalendarEventToMatchAllProperties(CalendarEvent expectedCalendarEvent) {
        assertCalendarEventAllPropertiesEquals(expectedCalendarEvent, getPersistedCalendarEvent(expectedCalendarEvent));
    }

    protected void assertPersistedCalendarEventToMatchUpdatableProperties(CalendarEvent expectedCalendarEvent) {
        assertCalendarEventAllUpdatablePropertiesEquals(expectedCalendarEvent, getPersistedCalendarEvent(expectedCalendarEvent));
    }
}
