package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.LessonMaterialAsserts.*;
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
import uz.momoit.lms_canvas.domain.LessonMaterial;
import uz.momoit.lms_canvas.domain.enumeration.LessonFileTypeEnum;
import uz.momoit.lms_canvas.repository.LessonMaterialRepository;
import uz.momoit.lms_canvas.service.dto.LessonMaterialDTO;
import uz.momoit.lms_canvas.service.mapper.LessonMaterialMapper;

/**
 * Integration tests for the {@link LessonMaterialResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LessonMaterialResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LessonFileTypeEnum DEFAULT_LESSON_FILE_TYPE = LessonFileTypeEnum.VIDEO;
    private static final LessonFileTypeEnum UPDATED_LESSON_FILE_TYPE = LessonFileTypeEnum.PDF;

    private static final String ENTITY_API_URL = "/api/lesson-materials";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private LessonMaterialRepository lessonMaterialRepository;

    @Autowired
    private LessonMaterialMapper lessonMaterialMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLessonMaterialMockMvc;

    private LessonMaterial lessonMaterial;

    private LessonMaterial insertedLessonMaterial;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LessonMaterial createEntity() {
        return new LessonMaterial().title(DEFAULT_TITLE).description(DEFAULT_DESCRIPTION).lessonFileType(DEFAULT_LESSON_FILE_TYPE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LessonMaterial createUpdatedEntity() {
        return new LessonMaterial().title(UPDATED_TITLE).description(UPDATED_DESCRIPTION).lessonFileType(UPDATED_LESSON_FILE_TYPE);
    }

    @BeforeEach
    public void initTest() {
        lessonMaterial = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedLessonMaterial != null) {
            lessonMaterialRepository.delete(insertedLessonMaterial);
            insertedLessonMaterial = null;
        }
    }

    @Test
    @Transactional
    void createLessonMaterial() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the LessonMaterial
        LessonMaterialDTO lessonMaterialDTO = lessonMaterialMapper.toDto(lessonMaterial);
        var returnedLessonMaterialDTO = om.readValue(
            restLessonMaterialMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(lessonMaterialDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            LessonMaterialDTO.class
        );

        // Validate the LessonMaterial in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedLessonMaterial = lessonMaterialMapper.toEntity(returnedLessonMaterialDTO);
        assertLessonMaterialUpdatableFieldsEquals(returnedLessonMaterial, getPersistedLessonMaterial(returnedLessonMaterial));

        insertedLessonMaterial = returnedLessonMaterial;
    }

    @Test
    @Transactional
    void createLessonMaterialWithExistingId() throws Exception {
        // Create the LessonMaterial with an existing ID
        lessonMaterial.setId(1L);
        LessonMaterialDTO lessonMaterialDTO = lessonMaterialMapper.toDto(lessonMaterial);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLessonMaterialMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(lessonMaterialDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LessonMaterial in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLessonMaterials() throws Exception {
        // Initialize the database
        insertedLessonMaterial = lessonMaterialRepository.saveAndFlush(lessonMaterial);

        // Get all the lessonMaterialList
        restLessonMaterialMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lessonMaterial.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].lessonFileType").value(hasItem(DEFAULT_LESSON_FILE_TYPE.toString())));
    }

    @Test
    @Transactional
    void getLessonMaterial() throws Exception {
        // Initialize the database
        insertedLessonMaterial = lessonMaterialRepository.saveAndFlush(lessonMaterial);

        // Get the lessonMaterial
        restLessonMaterialMockMvc
            .perform(get(ENTITY_API_URL_ID, lessonMaterial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(lessonMaterial.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.lessonFileType").value(DEFAULT_LESSON_FILE_TYPE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingLessonMaterial() throws Exception {
        // Get the lessonMaterial
        restLessonMaterialMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingLessonMaterial() throws Exception {
        // Initialize the database
        insertedLessonMaterial = lessonMaterialRepository.saveAndFlush(lessonMaterial);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the lessonMaterial
        LessonMaterial updatedLessonMaterial = lessonMaterialRepository.findById(lessonMaterial.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedLessonMaterial are not directly saved in db
        em.detach(updatedLessonMaterial);
        updatedLessonMaterial.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION).lessonFileType(UPDATED_LESSON_FILE_TYPE);
        LessonMaterialDTO lessonMaterialDTO = lessonMaterialMapper.toDto(updatedLessonMaterial);

        restLessonMaterialMockMvc
            .perform(
                put(ENTITY_API_URL_ID, lessonMaterialDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(lessonMaterialDTO))
            )
            .andExpect(status().isOk());

        // Validate the LessonMaterial in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedLessonMaterialToMatchAllProperties(updatedLessonMaterial);
    }

    @Test
    @Transactional
    void putNonExistingLessonMaterial() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        lessonMaterial.setId(longCount.incrementAndGet());

        // Create the LessonMaterial
        LessonMaterialDTO lessonMaterialDTO = lessonMaterialMapper.toDto(lessonMaterial);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLessonMaterialMockMvc
            .perform(
                put(ENTITY_API_URL_ID, lessonMaterialDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(lessonMaterialDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LessonMaterial in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLessonMaterial() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        lessonMaterial.setId(longCount.incrementAndGet());

        // Create the LessonMaterial
        LessonMaterialDTO lessonMaterialDTO = lessonMaterialMapper.toDto(lessonMaterial);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLessonMaterialMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(lessonMaterialDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LessonMaterial in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLessonMaterial() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        lessonMaterial.setId(longCount.incrementAndGet());

        // Create the LessonMaterial
        LessonMaterialDTO lessonMaterialDTO = lessonMaterialMapper.toDto(lessonMaterial);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLessonMaterialMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(lessonMaterialDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LessonMaterial in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLessonMaterialWithPatch() throws Exception {
        // Initialize the database
        insertedLessonMaterial = lessonMaterialRepository.saveAndFlush(lessonMaterial);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the lessonMaterial using partial update
        LessonMaterial partialUpdatedLessonMaterial = new LessonMaterial();
        partialUpdatedLessonMaterial.setId(lessonMaterial.getId());

        partialUpdatedLessonMaterial.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION);

        restLessonMaterialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLessonMaterial.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLessonMaterial))
            )
            .andExpect(status().isOk());

        // Validate the LessonMaterial in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLessonMaterialUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedLessonMaterial, lessonMaterial),
            getPersistedLessonMaterial(lessonMaterial)
        );
    }

    @Test
    @Transactional
    void fullUpdateLessonMaterialWithPatch() throws Exception {
        // Initialize the database
        insertedLessonMaterial = lessonMaterialRepository.saveAndFlush(lessonMaterial);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the lessonMaterial using partial update
        LessonMaterial partialUpdatedLessonMaterial = new LessonMaterial();
        partialUpdatedLessonMaterial.setId(lessonMaterial.getId());

        partialUpdatedLessonMaterial.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION).lessonFileType(UPDATED_LESSON_FILE_TYPE);

        restLessonMaterialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLessonMaterial.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLessonMaterial))
            )
            .andExpect(status().isOk());

        // Validate the LessonMaterial in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLessonMaterialUpdatableFieldsEquals(partialUpdatedLessonMaterial, getPersistedLessonMaterial(partialUpdatedLessonMaterial));
    }

    @Test
    @Transactional
    void patchNonExistingLessonMaterial() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        lessonMaterial.setId(longCount.incrementAndGet());

        // Create the LessonMaterial
        LessonMaterialDTO lessonMaterialDTO = lessonMaterialMapper.toDto(lessonMaterial);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLessonMaterialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, lessonMaterialDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(lessonMaterialDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LessonMaterial in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLessonMaterial() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        lessonMaterial.setId(longCount.incrementAndGet());

        // Create the LessonMaterial
        LessonMaterialDTO lessonMaterialDTO = lessonMaterialMapper.toDto(lessonMaterial);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLessonMaterialMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(lessonMaterialDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LessonMaterial in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLessonMaterial() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        lessonMaterial.setId(longCount.incrementAndGet());

        // Create the LessonMaterial
        LessonMaterialDTO lessonMaterialDTO = lessonMaterialMapper.toDto(lessonMaterial);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLessonMaterialMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(lessonMaterialDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LessonMaterial in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLessonMaterial() throws Exception {
        // Initialize the database
        insertedLessonMaterial = lessonMaterialRepository.saveAndFlush(lessonMaterial);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the lessonMaterial
        restLessonMaterialMockMvc
            .perform(delete(ENTITY_API_URL_ID, lessonMaterial.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return lessonMaterialRepository.count();
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

    protected LessonMaterial getPersistedLessonMaterial(LessonMaterial lessonMaterial) {
        return lessonMaterialRepository.findById(lessonMaterial.getId()).orElseThrow();
    }

    protected void assertPersistedLessonMaterialToMatchAllProperties(LessonMaterial expectedLessonMaterial) {
        assertLessonMaterialAllPropertiesEquals(expectedLessonMaterial, getPersistedLessonMaterial(expectedLessonMaterial));
    }

    protected void assertPersistedLessonMaterialToMatchUpdatableProperties(LessonMaterial expectedLessonMaterial) {
        assertLessonMaterialAllUpdatablePropertiesEquals(expectedLessonMaterial, getPersistedLessonMaterial(expectedLessonMaterial));
    }
}
