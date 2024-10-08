package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.CommunityAttachmentAsserts.*;
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
import uz.momoit.lms_canvas.domain.CommunityAttachment;
import uz.momoit.lms_canvas.repository.CommunityAttachmentRepository;
import uz.momoit.lms_canvas.service.dto.CommunityAttachmentDTO;
import uz.momoit.lms_canvas.service.mapper.CommunityAttachmentMapper;

/**
 * Integration tests for the {@link CommunityAttachmentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CommunityAttachmentResourceIT {

    private static final String ENTITY_API_URL = "/api/community-attachments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CommunityAttachmentRepository communityAttachmentRepository;

    @Autowired
    private CommunityAttachmentMapper communityAttachmentMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommunityAttachmentMockMvc;

    private CommunityAttachment communityAttachment;

    private CommunityAttachment insertedCommunityAttachment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommunityAttachment createEntity() {
        return new CommunityAttachment();
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommunityAttachment createUpdatedEntity() {
        return new CommunityAttachment();
    }

    @BeforeEach
    public void initTest() {
        communityAttachment = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCommunityAttachment != null) {
            communityAttachmentRepository.delete(insertedCommunityAttachment);
            insertedCommunityAttachment = null;
        }
    }

    @Test
    @Transactional
    void createCommunityAttachment() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CommunityAttachment
        CommunityAttachmentDTO communityAttachmentDTO = communityAttachmentMapper.toDto(communityAttachment);
        var returnedCommunityAttachmentDTO = om.readValue(
            restCommunityAttachmentMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityAttachmentDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CommunityAttachmentDTO.class
        );

        // Validate the CommunityAttachment in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCommunityAttachment = communityAttachmentMapper.toEntity(returnedCommunityAttachmentDTO);
        assertCommunityAttachmentUpdatableFieldsEquals(
            returnedCommunityAttachment,
            getPersistedCommunityAttachment(returnedCommunityAttachment)
        );

        insertedCommunityAttachment = returnedCommunityAttachment;
    }

    @Test
    @Transactional
    void createCommunityAttachmentWithExistingId() throws Exception {
        // Create the CommunityAttachment with an existing ID
        communityAttachment.setId(1L);
        CommunityAttachmentDTO communityAttachmentDTO = communityAttachmentMapper.toDto(communityAttachment);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommunityAttachmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityAttachmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CommunityAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCommunityAttachments() throws Exception {
        // Initialize the database
        insertedCommunityAttachment = communityAttachmentRepository.saveAndFlush(communityAttachment);

        // Get all the communityAttachmentList
        restCommunityAttachmentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(communityAttachment.getId().intValue())));
    }

    @Test
    @Transactional
    void getCommunityAttachment() throws Exception {
        // Initialize the database
        insertedCommunityAttachment = communityAttachmentRepository.saveAndFlush(communityAttachment);

        // Get the communityAttachment
        restCommunityAttachmentMockMvc
            .perform(get(ENTITY_API_URL_ID, communityAttachment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(communityAttachment.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCommunityAttachment() throws Exception {
        // Get the communityAttachment
        restCommunityAttachmentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCommunityAttachment() throws Exception {
        // Initialize the database
        insertedCommunityAttachment = communityAttachmentRepository.saveAndFlush(communityAttachment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityAttachment
        CommunityAttachment updatedCommunityAttachment = communityAttachmentRepository.findById(communityAttachment.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCommunityAttachment are not directly saved in db
        em.detach(updatedCommunityAttachment);
        CommunityAttachmentDTO communityAttachmentDTO = communityAttachmentMapper.toDto(updatedCommunityAttachment);

        restCommunityAttachmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, communityAttachmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityAttachmentDTO))
            )
            .andExpect(status().isOk());

        // Validate the CommunityAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCommunityAttachmentToMatchAllProperties(updatedCommunityAttachment);
    }

    @Test
    @Transactional
    void putNonExistingCommunityAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityAttachment.setId(longCount.incrementAndGet());

        // Create the CommunityAttachment
        CommunityAttachmentDTO communityAttachmentDTO = communityAttachmentMapper.toDto(communityAttachment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommunityAttachmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, communityAttachmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityAttachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommunityAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityAttachment.setId(longCount.incrementAndGet());

        // Create the CommunityAttachment
        CommunityAttachmentDTO communityAttachmentDTO = communityAttachmentMapper.toDto(communityAttachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityAttachmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityAttachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommunityAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityAttachment.setId(longCount.incrementAndGet());

        // Create the CommunityAttachment
        CommunityAttachmentDTO communityAttachmentDTO = communityAttachmentMapper.toDto(communityAttachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityAttachmentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityAttachmentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommunityAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommunityAttachmentWithPatch() throws Exception {
        // Initialize the database
        insertedCommunityAttachment = communityAttachmentRepository.saveAndFlush(communityAttachment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityAttachment using partial update
        CommunityAttachment partialUpdatedCommunityAttachment = new CommunityAttachment();
        partialUpdatedCommunityAttachment.setId(communityAttachment.getId());

        restCommunityAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommunityAttachment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommunityAttachment))
            )
            .andExpect(status().isOk());

        // Validate the CommunityAttachment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommunityAttachmentUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCommunityAttachment, communityAttachment),
            getPersistedCommunityAttachment(communityAttachment)
        );
    }

    @Test
    @Transactional
    void fullUpdateCommunityAttachmentWithPatch() throws Exception {
        // Initialize the database
        insertedCommunityAttachment = communityAttachmentRepository.saveAndFlush(communityAttachment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityAttachment using partial update
        CommunityAttachment partialUpdatedCommunityAttachment = new CommunityAttachment();
        partialUpdatedCommunityAttachment.setId(communityAttachment.getId());

        restCommunityAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommunityAttachment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommunityAttachment))
            )
            .andExpect(status().isOk());

        // Validate the CommunityAttachment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommunityAttachmentUpdatableFieldsEquals(
            partialUpdatedCommunityAttachment,
            getPersistedCommunityAttachment(partialUpdatedCommunityAttachment)
        );
    }

    @Test
    @Transactional
    void patchNonExistingCommunityAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityAttachment.setId(longCount.incrementAndGet());

        // Create the CommunityAttachment
        CommunityAttachmentDTO communityAttachmentDTO = communityAttachmentMapper.toDto(communityAttachment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommunityAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, communityAttachmentDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(communityAttachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommunityAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityAttachment.setId(longCount.incrementAndGet());

        // Create the CommunityAttachment
        CommunityAttachmentDTO communityAttachmentDTO = communityAttachmentMapper.toDto(communityAttachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(communityAttachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommunityAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityAttachment.setId(longCount.incrementAndGet());

        // Create the CommunityAttachment
        CommunityAttachmentDTO communityAttachmentDTO = communityAttachmentMapper.toDto(communityAttachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(communityAttachmentDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommunityAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommunityAttachment() throws Exception {
        // Initialize the database
        insertedCommunityAttachment = communityAttachmentRepository.saveAndFlush(communityAttachment);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the communityAttachment
        restCommunityAttachmentMockMvc
            .perform(delete(ENTITY_API_URL_ID, communityAttachment.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return communityAttachmentRepository.count();
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

    protected CommunityAttachment getPersistedCommunityAttachment(CommunityAttachment communityAttachment) {
        return communityAttachmentRepository.findById(communityAttachment.getId()).orElseThrow();
    }

    protected void assertPersistedCommunityAttachmentToMatchAllProperties(CommunityAttachment expectedCommunityAttachment) {
        assertCommunityAttachmentAllPropertiesEquals(
            expectedCommunityAttachment,
            getPersistedCommunityAttachment(expectedCommunityAttachment)
        );
    }

    protected void assertPersistedCommunityAttachmentToMatchUpdatableProperties(CommunityAttachment expectedCommunityAttachment) {
        assertCommunityAttachmentAllUpdatablePropertiesEquals(
            expectedCommunityAttachment,
            getPersistedCommunityAttachment(expectedCommunityAttachment)
        );
    }
}
