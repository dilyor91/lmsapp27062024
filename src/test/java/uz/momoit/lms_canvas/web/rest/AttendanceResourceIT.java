package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.AttendanceAsserts.*;
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
import uz.momoit.lms_canvas.domain.Attendance;
import uz.momoit.lms_canvas.domain.enumeration.AttendanceEnum;
import uz.momoit.lms_canvas.repository.AttendanceRepository;
import uz.momoit.lms_canvas.repository.UserRepository;
import uz.momoit.lms_canvas.service.dto.AttendanceDTO;
import uz.momoit.lms_canvas.service.mapper.AttendanceMapper;

/**
 * Integration tests for the {@link AttendanceResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AttendanceResourceIT {

    private static final AttendanceEnum DEFAULT_ATTENDANCE_ENUM = AttendanceEnum.PRESENT;
    private static final AttendanceEnum UPDATED_ATTENDANCE_ENUM = AttendanceEnum.LATE;

    private static final String ENTITY_API_URL = "/api/attendances";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceMapper attendanceMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAttendanceMockMvc;

    private Attendance attendance;

    private Attendance insertedAttendance;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attendance createEntity(EntityManager em) {
        Attendance attendance = new Attendance().attendanceEnum(DEFAULT_ATTENDANCE_ENUM);
        return attendance;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attendance createUpdatedEntity(EntityManager em) {
        Attendance attendance = new Attendance().attendanceEnum(UPDATED_ATTENDANCE_ENUM);
        return attendance;
    }

    @BeforeEach
    public void initTest() {
        attendance = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedAttendance != null) {
            attendanceRepository.delete(insertedAttendance);
            insertedAttendance = null;
        }
    }

    @Test
    @Transactional
    void createAttendance() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Attendance
        AttendanceDTO attendanceDTO = attendanceMapper.toDto(attendance);
        var returnedAttendanceDTO = om.readValue(
            restAttendanceMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(attendanceDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AttendanceDTO.class
        );

        // Validate the Attendance in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedAttendance = attendanceMapper.toEntity(returnedAttendanceDTO);
        assertAttendanceUpdatableFieldsEquals(returnedAttendance, getPersistedAttendance(returnedAttendance));

        insertedAttendance = returnedAttendance;
    }

    @Test
    @Transactional
    void createAttendanceWithExistingId() throws Exception {
        // Create the Attendance with an existing ID
        attendance.setId(1L);
        AttendanceDTO attendanceDTO = attendanceMapper.toDto(attendance);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttendanceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(attendanceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAttendances() throws Exception {
        // Initialize the database
        insertedAttendance = attendanceRepository.saveAndFlush(attendance);

        // Get all the attendanceList
        restAttendanceMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attendance.getId().intValue())))
            .andExpect(jsonPath("$.[*].attendanceEnum").value(hasItem(DEFAULT_ATTENDANCE_ENUM.toString())));
    }

    @Test
    @Transactional
    void getAttendance() throws Exception {
        // Initialize the database
        insertedAttendance = attendanceRepository.saveAndFlush(attendance);

        // Get the attendance
        restAttendanceMockMvc
            .perform(get(ENTITY_API_URL_ID, attendance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(attendance.getId().intValue()))
            .andExpect(jsonPath("$.attendanceEnum").value(DEFAULT_ATTENDANCE_ENUM.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAttendance() throws Exception {
        // Get the attendance
        restAttendanceMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAttendance() throws Exception {
        // Initialize the database
        insertedAttendance = attendanceRepository.saveAndFlush(attendance);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the attendance
        Attendance updatedAttendance = attendanceRepository.findById(attendance.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedAttendance are not directly saved in db
        em.detach(updatedAttendance);
        updatedAttendance.attendanceEnum(UPDATED_ATTENDANCE_ENUM);
        AttendanceDTO attendanceDTO = attendanceMapper.toDto(updatedAttendance);

        restAttendanceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, attendanceDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(attendanceDTO))
            )
            .andExpect(status().isOk());

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAttendanceToMatchAllProperties(updatedAttendance);
    }

    @Test
    @Transactional
    void putNonExistingAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(longCount.incrementAndGet());

        // Create the Attendance
        AttendanceDTO attendanceDTO = attendanceMapper.toDto(attendance);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttendanceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, attendanceDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(attendanceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(longCount.incrementAndGet());

        // Create the Attendance
        AttendanceDTO attendanceDTO = attendanceMapper.toDto(attendance);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttendanceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(attendanceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(longCount.incrementAndGet());

        // Create the Attendance
        AttendanceDTO attendanceDTO = attendanceMapper.toDto(attendance);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttendanceMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(attendanceDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAttendanceWithPatch() throws Exception {
        // Initialize the database
        insertedAttendance = attendanceRepository.saveAndFlush(attendance);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the attendance using partial update
        Attendance partialUpdatedAttendance = new Attendance();
        partialUpdatedAttendance.setId(attendance.getId());

        partialUpdatedAttendance.attendanceEnum(UPDATED_ATTENDANCE_ENUM);

        restAttendanceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAttendance.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAttendance))
            )
            .andExpect(status().isOk());

        // Validate the Attendance in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAttendanceUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAttendance, attendance),
            getPersistedAttendance(attendance)
        );
    }

    @Test
    @Transactional
    void fullUpdateAttendanceWithPatch() throws Exception {
        // Initialize the database
        insertedAttendance = attendanceRepository.saveAndFlush(attendance);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the attendance using partial update
        Attendance partialUpdatedAttendance = new Attendance();
        partialUpdatedAttendance.setId(attendance.getId());

        partialUpdatedAttendance.attendanceEnum(UPDATED_ATTENDANCE_ENUM);

        restAttendanceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAttendance.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAttendance))
            )
            .andExpect(status().isOk());

        // Validate the Attendance in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAttendanceUpdatableFieldsEquals(partialUpdatedAttendance, getPersistedAttendance(partialUpdatedAttendance));
    }

    @Test
    @Transactional
    void patchNonExistingAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(longCount.incrementAndGet());

        // Create the Attendance
        AttendanceDTO attendanceDTO = attendanceMapper.toDto(attendance);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttendanceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, attendanceDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(attendanceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(longCount.incrementAndGet());

        // Create the Attendance
        AttendanceDTO attendanceDTO = attendanceMapper.toDto(attendance);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttendanceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(attendanceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(longCount.incrementAndGet());

        // Create the Attendance
        AttendanceDTO attendanceDTO = attendanceMapper.toDto(attendance);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttendanceMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(attendanceDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAttendance() throws Exception {
        // Initialize the database
        insertedAttendance = attendanceRepository.saveAndFlush(attendance);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the attendance
        restAttendanceMockMvc
            .perform(delete(ENTITY_API_URL_ID, attendance.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return attendanceRepository.count();
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

    protected Attendance getPersistedAttendance(Attendance attendance) {
        return attendanceRepository.findById(attendance.getId()).orElseThrow();
    }

    protected void assertPersistedAttendanceToMatchAllProperties(Attendance expectedAttendance) {
        assertAttendanceAllPropertiesEquals(expectedAttendance, getPersistedAttendance(expectedAttendance));
    }

    protected void assertPersistedAttendanceToMatchUpdatableProperties(Attendance expectedAttendance) {
        assertAttendanceAllUpdatablePropertiesEquals(expectedAttendance, getPersistedAttendance(expectedAttendance));
    }
}
