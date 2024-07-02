package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.StudentOptionAsserts.*;
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
import uz.momoit.lms_canvas.domain.StudentOption;
import uz.momoit.lms_canvas.repository.StudentOptionRepository;
import uz.momoit.lms_canvas.service.dto.StudentOptionDTO;
import uz.momoit.lms_canvas.service.mapper.StudentOptionMapper;

/**
 * Integration tests for the {@link StudentOptionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StudentOptionResourceIT {

    private static final Integer DEFAULT_ORD_NUM = 1;
    private static final Integer UPDATED_ORD_NUM = 2;

    private static final String ENTITY_API_URL = "/api/student-options";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private StudentOptionRepository studentOptionRepository;

    @Autowired
    private StudentOptionMapper studentOptionMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStudentOptionMockMvc;

    private StudentOption studentOption;

    private StudentOption insertedStudentOption;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentOption createEntity(EntityManager em) {
        StudentOption studentOption = new StudentOption().ordNum(DEFAULT_ORD_NUM);
        return studentOption;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentOption createUpdatedEntity(EntityManager em) {
        StudentOption studentOption = new StudentOption().ordNum(UPDATED_ORD_NUM);
        return studentOption;
    }

    @BeforeEach
    public void initTest() {
        studentOption = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedStudentOption != null) {
            studentOptionRepository.delete(insertedStudentOption);
            insertedStudentOption = null;
        }
    }

    @Test
    @Transactional
    void createStudentOption() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the StudentOption
        StudentOptionDTO studentOptionDTO = studentOptionMapper.toDto(studentOption);
        var returnedStudentOptionDTO = om.readValue(
            restStudentOptionMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentOptionDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            StudentOptionDTO.class
        );

        // Validate the StudentOption in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedStudentOption = studentOptionMapper.toEntity(returnedStudentOptionDTO);
        assertStudentOptionUpdatableFieldsEquals(returnedStudentOption, getPersistedStudentOption(returnedStudentOption));

        insertedStudentOption = returnedStudentOption;
    }

    @Test
    @Transactional
    void createStudentOptionWithExistingId() throws Exception {
        // Create the StudentOption with an existing ID
        studentOption.setId(1L);
        StudentOptionDTO studentOptionDTO = studentOptionMapper.toDto(studentOption);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentOptionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentOptionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StudentOption in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllStudentOptions() throws Exception {
        // Initialize the database
        insertedStudentOption = studentOptionRepository.saveAndFlush(studentOption);

        // Get all the studentOptionList
        restStudentOptionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentOption.getId().intValue())))
            .andExpect(jsonPath("$.[*].ordNum").value(hasItem(DEFAULT_ORD_NUM)));
    }

    @Test
    @Transactional
    void getStudentOption() throws Exception {
        // Initialize the database
        insertedStudentOption = studentOptionRepository.saveAndFlush(studentOption);

        // Get the studentOption
        restStudentOptionMockMvc
            .perform(get(ENTITY_API_URL_ID, studentOption.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(studentOption.getId().intValue()))
            .andExpect(jsonPath("$.ordNum").value(DEFAULT_ORD_NUM));
    }

    @Test
    @Transactional
    void getNonExistingStudentOption() throws Exception {
        // Get the studentOption
        restStudentOptionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingStudentOption() throws Exception {
        // Initialize the database
        insertedStudentOption = studentOptionRepository.saveAndFlush(studentOption);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentOption
        StudentOption updatedStudentOption = studentOptionRepository.findById(studentOption.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedStudentOption are not directly saved in db
        em.detach(updatedStudentOption);
        updatedStudentOption.ordNum(UPDATED_ORD_NUM);
        StudentOptionDTO studentOptionDTO = studentOptionMapper.toDto(updatedStudentOption);

        restStudentOptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studentOptionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentOptionDTO))
            )
            .andExpect(status().isOk());

        // Validate the StudentOption in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedStudentOptionToMatchAllProperties(updatedStudentOption);
    }

    @Test
    @Transactional
    void putNonExistingStudentOption() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentOption.setId(longCount.incrementAndGet());

        // Create the StudentOption
        StudentOptionDTO studentOptionDTO = studentOptionMapper.toDto(studentOption);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentOptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, studentOptionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentOptionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentOption in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStudentOption() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentOption.setId(longCount.incrementAndGet());

        // Create the StudentOption
        StudentOptionDTO studentOptionDTO = studentOptionMapper.toDto(studentOption);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentOptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(studentOptionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentOption in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStudentOption() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentOption.setId(longCount.incrementAndGet());

        // Create the StudentOption
        StudentOptionDTO studentOptionDTO = studentOptionMapper.toDto(studentOption);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentOptionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(studentOptionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudentOption in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStudentOptionWithPatch() throws Exception {
        // Initialize the database
        insertedStudentOption = studentOptionRepository.saveAndFlush(studentOption);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentOption using partial update
        StudentOption partialUpdatedStudentOption = new StudentOption();
        partialUpdatedStudentOption.setId(studentOption.getId());

        partialUpdatedStudentOption.ordNum(UPDATED_ORD_NUM);

        restStudentOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudentOption.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudentOption))
            )
            .andExpect(status().isOk());

        // Validate the StudentOption in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudentOptionUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedStudentOption, studentOption),
            getPersistedStudentOption(studentOption)
        );
    }

    @Test
    @Transactional
    void fullUpdateStudentOptionWithPatch() throws Exception {
        // Initialize the database
        insertedStudentOption = studentOptionRepository.saveAndFlush(studentOption);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the studentOption using partial update
        StudentOption partialUpdatedStudentOption = new StudentOption();
        partialUpdatedStudentOption.setId(studentOption.getId());

        partialUpdatedStudentOption.ordNum(UPDATED_ORD_NUM);

        restStudentOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStudentOption.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedStudentOption))
            )
            .andExpect(status().isOk());

        // Validate the StudentOption in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertStudentOptionUpdatableFieldsEquals(partialUpdatedStudentOption, getPersistedStudentOption(partialUpdatedStudentOption));
    }

    @Test
    @Transactional
    void patchNonExistingStudentOption() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentOption.setId(longCount.incrementAndGet());

        // Create the StudentOption
        StudentOptionDTO studentOptionDTO = studentOptionMapper.toDto(studentOption);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, studentOptionDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studentOptionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentOption in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStudentOption() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentOption.setId(longCount.incrementAndGet());

        // Create the StudentOption
        StudentOptionDTO studentOptionDTO = studentOptionMapper.toDto(studentOption);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(studentOptionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the StudentOption in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStudentOption() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        studentOption.setId(longCount.incrementAndGet());

        // Create the StudentOption
        StudentOptionDTO studentOptionDTO = studentOptionMapper.toDto(studentOption);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStudentOptionMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(studentOptionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StudentOption in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStudentOption() throws Exception {
        // Initialize the database
        insertedStudentOption = studentOptionRepository.saveAndFlush(studentOption);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the studentOption
        restStudentOptionMockMvc
            .perform(delete(ENTITY_API_URL_ID, studentOption.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return studentOptionRepository.count();
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

    protected StudentOption getPersistedStudentOption(StudentOption studentOption) {
        return studentOptionRepository.findById(studentOption.getId()).orElseThrow();
    }

    protected void assertPersistedStudentOptionToMatchAllProperties(StudentOption expectedStudentOption) {
        assertStudentOptionAllPropertiesEquals(expectedStudentOption, getPersistedStudentOption(expectedStudentOption));
    }

    protected void assertPersistedStudentOptionToMatchUpdatableProperties(StudentOption expectedStudentOption) {
        assertStudentOptionAllUpdatablePropertiesEquals(expectedStudentOption, getPersistedStudentOption(expectedStudentOption));
    }
}
