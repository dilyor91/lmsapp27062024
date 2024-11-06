package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.CalendarTodoAsserts.*;
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
import uz.momoit.lms_canvas.domain.CalendarTodo;
import uz.momoit.lms_canvas.repository.CalendarTodoRepository;
import uz.momoit.lms_canvas.repository.UserRepository;
import uz.momoit.lms_canvas.service.dto.CalendarTodoDTO;
import uz.momoit.lms_canvas.service.mapper.CalendarTodoMapper;

/**
 * Integration tests for the {@link CalendarTodoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CalendarTodoResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_TIME = "AAAAAAAAAA";
    private static final String UPDATED_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/calendar-todos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CalendarTodoRepository calendarTodoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CalendarTodoMapper calendarTodoMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCalendarTodoMockMvc;

    private CalendarTodo calendarTodo;

    private CalendarTodo insertedCalendarTodo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CalendarTodo createEntity() {
        return new CalendarTodo().title(DEFAULT_TITLE).date(DEFAULT_DATE).time(DEFAULT_TIME).details(DEFAULT_DETAILS);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CalendarTodo createUpdatedEntity() {
        return new CalendarTodo().title(UPDATED_TITLE).date(UPDATED_DATE).time(UPDATED_TIME).details(UPDATED_DETAILS);
    }

    @BeforeEach
    public void initTest() {
        calendarTodo = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCalendarTodo != null) {
            calendarTodoRepository.delete(insertedCalendarTodo);
            insertedCalendarTodo = null;
        }
    }

    @Test
    @Transactional
    void createCalendarTodo() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CalendarTodo
        CalendarTodoDTO calendarTodoDTO = calendarTodoMapper.toDto(calendarTodo);
        var returnedCalendarTodoDTO = om.readValue(
            restCalendarTodoMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(calendarTodoDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CalendarTodoDTO.class
        );

        // Validate the CalendarTodo in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCalendarTodo = calendarTodoMapper.toEntity(returnedCalendarTodoDTO);
        assertCalendarTodoUpdatableFieldsEquals(returnedCalendarTodo, getPersistedCalendarTodo(returnedCalendarTodo));

        insertedCalendarTodo = returnedCalendarTodo;
    }

    @Test
    @Transactional
    void createCalendarTodoWithExistingId() throws Exception {
        // Create the CalendarTodo with an existing ID
        calendarTodo.setId(1L);
        CalendarTodoDTO calendarTodoDTO = calendarTodoMapper.toDto(calendarTodo);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCalendarTodoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(calendarTodoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CalendarTodo in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCalendarTodos() throws Exception {
        // Initialize the database
        insertedCalendarTodo = calendarTodoRepository.saveAndFlush(calendarTodo);

        // Get all the calendarTodoList
        restCalendarTodoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(calendarTodo.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME)))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS)));
    }

    @Test
    @Transactional
    void getCalendarTodo() throws Exception {
        // Initialize the database
        insertedCalendarTodo = calendarTodoRepository.saveAndFlush(calendarTodo);

        // Get the calendarTodo
        restCalendarTodoMockMvc
            .perform(get(ENTITY_API_URL_ID, calendarTodo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(calendarTodo.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS));
    }

    @Test
    @Transactional
    void getNonExistingCalendarTodo() throws Exception {
        // Get the calendarTodo
        restCalendarTodoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCalendarTodo() throws Exception {
        // Initialize the database
        insertedCalendarTodo = calendarTodoRepository.saveAndFlush(calendarTodo);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the calendarTodo
        CalendarTodo updatedCalendarTodo = calendarTodoRepository.findById(calendarTodo.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCalendarTodo are not directly saved in db
        em.detach(updatedCalendarTodo);
        updatedCalendarTodo.title(UPDATED_TITLE).date(UPDATED_DATE).time(UPDATED_TIME).details(UPDATED_DETAILS);
        CalendarTodoDTO calendarTodoDTO = calendarTodoMapper.toDto(updatedCalendarTodo);

        restCalendarTodoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, calendarTodoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(calendarTodoDTO))
            )
            .andExpect(status().isOk());

        // Validate the CalendarTodo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCalendarTodoToMatchAllProperties(updatedCalendarTodo);
    }

    @Test
    @Transactional
    void putNonExistingCalendarTodo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarTodo.setId(longCount.incrementAndGet());

        // Create the CalendarTodo
        CalendarTodoDTO calendarTodoDTO = calendarTodoMapper.toDto(calendarTodo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCalendarTodoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, calendarTodoDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(calendarTodoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CalendarTodo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCalendarTodo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarTodo.setId(longCount.incrementAndGet());

        // Create the CalendarTodo
        CalendarTodoDTO calendarTodoDTO = calendarTodoMapper.toDto(calendarTodo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCalendarTodoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(calendarTodoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CalendarTodo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCalendarTodo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarTodo.setId(longCount.incrementAndGet());

        // Create the CalendarTodo
        CalendarTodoDTO calendarTodoDTO = calendarTodoMapper.toDto(calendarTodo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCalendarTodoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(calendarTodoDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CalendarTodo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCalendarTodoWithPatch() throws Exception {
        // Initialize the database
        insertedCalendarTodo = calendarTodoRepository.saveAndFlush(calendarTodo);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the calendarTodo using partial update
        CalendarTodo partialUpdatedCalendarTodo = new CalendarTodo();
        partialUpdatedCalendarTodo.setId(calendarTodo.getId());

        partialUpdatedCalendarTodo.date(UPDATED_DATE).time(UPDATED_TIME);

        restCalendarTodoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCalendarTodo.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCalendarTodo))
            )
            .andExpect(status().isOk());

        // Validate the CalendarTodo in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCalendarTodoUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCalendarTodo, calendarTodo),
            getPersistedCalendarTodo(calendarTodo)
        );
    }

    @Test
    @Transactional
    void fullUpdateCalendarTodoWithPatch() throws Exception {
        // Initialize the database
        insertedCalendarTodo = calendarTodoRepository.saveAndFlush(calendarTodo);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the calendarTodo using partial update
        CalendarTodo partialUpdatedCalendarTodo = new CalendarTodo();
        partialUpdatedCalendarTodo.setId(calendarTodo.getId());

        partialUpdatedCalendarTodo.title(UPDATED_TITLE).date(UPDATED_DATE).time(UPDATED_TIME).details(UPDATED_DETAILS);

        restCalendarTodoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCalendarTodo.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCalendarTodo))
            )
            .andExpect(status().isOk());

        // Validate the CalendarTodo in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCalendarTodoUpdatableFieldsEquals(partialUpdatedCalendarTodo, getPersistedCalendarTodo(partialUpdatedCalendarTodo));
    }

    @Test
    @Transactional
    void patchNonExistingCalendarTodo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarTodo.setId(longCount.incrementAndGet());

        // Create the CalendarTodo
        CalendarTodoDTO calendarTodoDTO = calendarTodoMapper.toDto(calendarTodo);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCalendarTodoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, calendarTodoDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(calendarTodoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CalendarTodo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCalendarTodo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarTodo.setId(longCount.incrementAndGet());

        // Create the CalendarTodo
        CalendarTodoDTO calendarTodoDTO = calendarTodoMapper.toDto(calendarTodo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCalendarTodoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(calendarTodoDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CalendarTodo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCalendarTodo() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        calendarTodo.setId(longCount.incrementAndGet());

        // Create the CalendarTodo
        CalendarTodoDTO calendarTodoDTO = calendarTodoMapper.toDto(calendarTodo);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCalendarTodoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(calendarTodoDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CalendarTodo in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCalendarTodo() throws Exception {
        // Initialize the database
        insertedCalendarTodo = calendarTodoRepository.saveAndFlush(calendarTodo);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the calendarTodo
        restCalendarTodoMockMvc
            .perform(delete(ENTITY_API_URL_ID, calendarTodo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return calendarTodoRepository.count();
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

    protected CalendarTodo getPersistedCalendarTodo(CalendarTodo calendarTodo) {
        return calendarTodoRepository.findById(calendarTodo.getId()).orElseThrow();
    }

    protected void assertPersistedCalendarTodoToMatchAllProperties(CalendarTodo expectedCalendarTodo) {
        assertCalendarTodoAllPropertiesEquals(expectedCalendarTodo, getPersistedCalendarTodo(expectedCalendarTodo));
    }

    protected void assertPersistedCalendarTodoToMatchUpdatableProperties(CalendarTodo expectedCalendarTodo) {
        assertCalendarTodoAllUpdatablePropertiesEquals(expectedCalendarTodo, getPersistedCalendarTodo(expectedCalendarTodo));
    }
}
