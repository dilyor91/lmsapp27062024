package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.AttendanceDetailAsserts.*;
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
import uz.momoit.lms_canvas.repository.UserRepository;

/**
 * Integration tests for the {@link AttendanceDetailResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AttendanceDetailResourceIT {

    private static final AttendanceEnum DEFAULT_ATTENDANCE_ENUM = AttendanceEnum.PRESENT;
    private static final AttendanceEnum UPDATED_ATTENDANCE_ENUM = AttendanceEnum.LATE;

    private static final String ENTITY_API_URL = "/api/attendance-details";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AttendanceDetailRepository attendanceDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceDetailMapper attendanceDetailMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAttendanceDetailMockMvc;

    private AttendanceDetail attendanceDetail;

    private AttendanceDetail insertedAttendanceDetail;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AttendanceDetail createEntity(EntityManager em) {
        AttendanceDetail attendanceDetail = new AttendanceDetail().attendanceEnum(DEFAULT_ATTENDANCE_ENUM);
        return attendanceDetail;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AttendanceDetail createUpdatedEntity(EntityManager em) {
        AttendanceDetail attendanceDetail = new AttendanceDetail().attendanceEnum(UPDATED_ATTENDANCE_ENUM);
        return attendanceDetail;
    }

    @BeforeEach
    public void initTest() {
        attendanceDetail = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedAttendanceDetail != null) {
            attendanceDetailRepository.delete(insertedAttendanceDetail);
            insertedAttendanceDetail = null;
        }
    }

    @Test
    @Transactional
    void createAttendanceDetail() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the AttendanceDetail
        AttendanceDetailDTO attendanceDetailDTO = attendanceDetailMapper.toDto(attendanceDetail);
        var returnedAttendanceDetailDTO = om.readValue(
            restAttendanceDetailMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(attendanceDetailDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AttendanceDetailDTO.class
        );

        // Validate the AttendanceDetail in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedAttendanceDetail = attendanceDetailMapper.toEntity(returnedAttendanceDetailDTO);
        assertAttendanceDetailUpdatableFieldsEquals(returnedAttendanceDetail, getPersistedAttendanceDetail(returnedAttendanceDetail));

        insertedAttendanceDetail = returnedAttendanceDetail;
    }

    @Test
    @Transactional
    void createAttendanceDetailWithExistingId() throws Exception {
        // Create the AttendanceDetail with an existing ID
        attendanceDetail.setId(1L);
        AttendanceDetailDTO attendanceDetailDTO = attendanceDetailMapper.toDto(attendanceDetail);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttendanceDetailMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(attendanceDetailDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AttendanceDetail in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAttendanceDetails() throws Exception {
        // Initialize the database
        insertedAttendanceDetail = attendanceDetailRepository.saveAndFlush(attendanceDetail);

        // Get all the attendanceDetailList
        restAttendanceDetailMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attendanceDetail.getId().intValue())))
            .andExpect(jsonPath("$.[*].attendanceEnum").value(hasItem(DEFAULT_ATTENDANCE_ENUM.toString())));
    }

    @Test
    @Transactional
    void getAttendanceDetail() throws Exception {
        // Initialize the database
        insertedAttendanceDetail = attendanceDetailRepository.saveAndFlush(attendanceDetail);

        // Get the attendanceDetail
        restAttendanceDetailMockMvc
            .perform(get(ENTITY_API_URL_ID, attendanceDetail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(attendanceDetail.getId().intValue()))
            .andExpect(jsonPath("$.attendanceEnum").value(DEFAULT_ATTENDANCE_ENUM.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAttendanceDetail() throws Exception {
        // Get the attendanceDetail
        restAttendanceDetailMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAttendanceDetail() throws Exception {
        // Initialize the database
        insertedAttendanceDetail = attendanceDetailRepository.saveAndFlush(attendanceDetail);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the attendanceDetail
        AttendanceDetail updatedAttendanceDetail = attendanceDetailRepository.findById(attendanceDetail.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedAttendanceDetail are not directly saved in db
        em.detach(updatedAttendanceDetail);
        updatedAttendanceDetail.attendanceEnum(UPDATED_ATTENDANCE_ENUM);
        AttendanceDetailDTO attendanceDetailDTO = attendanceDetailMapper.toDto(updatedAttendanceDetail);

        restAttendanceDetailMockMvc
            .perform(
                put(ENTITY_API_URL_ID, attendanceDetailDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(attendanceDetailDTO))
            )
            .andExpect(status().isOk());

        // Validate the AttendanceDetail in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAttendanceDetailToMatchAllProperties(updatedAttendanceDetail);
    }

    @Test
    @Transactional
    void putNonExistingAttendanceDetail() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendanceDetail.setId(longCount.incrementAndGet());

        // Create the AttendanceDetail
        AttendanceDetailDTO attendanceDetailDTO = attendanceDetailMapper.toDto(attendanceDetail);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttendanceDetailMockMvc
            .perform(
                put(ENTITY_API_URL_ID, attendanceDetailDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(attendanceDetailDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AttendanceDetail in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAttendanceDetail() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendanceDetail.setId(longCount.incrementAndGet());

        // Create the AttendanceDetail
        AttendanceDetailDTO attendanceDetailDTO = attendanceDetailMapper.toDto(attendanceDetail);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttendanceDetailMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(attendanceDetailDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AttendanceDetail in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAttendanceDetail() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendanceDetail.setId(longCount.incrementAndGet());

        // Create the AttendanceDetail
        AttendanceDetailDTO attendanceDetailDTO = attendanceDetailMapper.toDto(attendanceDetail);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttendanceDetailMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(attendanceDetailDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AttendanceDetail in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAttendanceDetailWithPatch() throws Exception {
        // Initialize the database
        insertedAttendanceDetail = attendanceDetailRepository.saveAndFlush(attendanceDetail);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the attendanceDetail using partial update
        AttendanceDetail partialUpdatedAttendanceDetail = new AttendanceDetail();
        partialUpdatedAttendanceDetail.setId(attendanceDetail.getId());

        restAttendanceDetailMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAttendanceDetail.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAttendanceDetail))
            )
            .andExpect(status().isOk());

        // Validate the AttendanceDetail in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAttendanceDetailUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAttendanceDetail, attendanceDetail),
            getPersistedAttendanceDetail(attendanceDetail)
        );
    }

    @Test
    @Transactional
    void fullUpdateAttendanceDetailWithPatch() throws Exception {
        // Initialize the database
        insertedAttendanceDetail = attendanceDetailRepository.saveAndFlush(attendanceDetail);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the attendanceDetail using partial update
        AttendanceDetail partialUpdatedAttendanceDetail = new AttendanceDetail();
        partialUpdatedAttendanceDetail.setId(attendanceDetail.getId());

        partialUpdatedAttendanceDetail.attendanceEnum(UPDATED_ATTENDANCE_ENUM);

        restAttendanceDetailMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAttendanceDetail.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAttendanceDetail))
            )
            .andExpect(status().isOk());

        // Validate the AttendanceDetail in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAttendanceDetailUpdatableFieldsEquals(
            partialUpdatedAttendanceDetail,
            getPersistedAttendanceDetail(partialUpdatedAttendanceDetail)
        );
    }

    @Test
    @Transactional
    void patchNonExistingAttendanceDetail() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendanceDetail.setId(longCount.incrementAndGet());

        // Create the AttendanceDetail
        AttendanceDetailDTO attendanceDetailDTO = attendanceDetailMapper.toDto(attendanceDetail);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAttendanceDetailMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, attendanceDetailDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(attendanceDetailDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AttendanceDetail in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAttendanceDetail() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendanceDetail.setId(longCount.incrementAndGet());

        // Create the AttendanceDetail
        AttendanceDetailDTO attendanceDetailDTO = attendanceDetailMapper.toDto(attendanceDetail);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttendanceDetailMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(attendanceDetailDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AttendanceDetail in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAttendanceDetail() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendanceDetail.setId(longCount.incrementAndGet());

        // Create the AttendanceDetail
        AttendanceDetailDTO attendanceDetailDTO = attendanceDetailMapper.toDto(attendanceDetail);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAttendanceDetailMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(attendanceDetailDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AttendanceDetail in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAttendanceDetail() throws Exception {
        // Initialize the database
        insertedAttendanceDetail = attendanceDetailRepository.saveAndFlush(attendanceDetail);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the attendanceDetail
        restAttendanceDetailMockMvc
            .perform(delete(ENTITY_API_URL_ID, attendanceDetail.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return attendanceDetailRepository.count();
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

    protected AttendanceDetail getPersistedAttendanceDetail(AttendanceDetail attendanceDetail) {
        return attendanceDetailRepository.findById(attendanceDetail.getId()).orElseThrow();
    }

    protected void assertPersistedAttendanceDetailToMatchAllProperties(AttendanceDetail expectedAttendanceDetail) {
        assertAttendanceDetailAllPropertiesEquals(expectedAttendanceDetail, getPersistedAttendanceDetail(expectedAttendanceDetail));
    }

    protected void assertPersistedAttendanceDetailToMatchUpdatableProperties(AttendanceDetail expectedAttendanceDetail) {
        assertAttendanceDetailAllUpdatablePropertiesEquals(
            expectedAttendanceDetail,
            getPersistedAttendanceDetail(expectedAttendanceDetail)
        );
    }
}
