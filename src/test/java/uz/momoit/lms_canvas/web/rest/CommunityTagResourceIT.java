package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.CommunityTagAsserts.*;
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
import uz.momoit.lms_canvas.domain.CommunityTag;
import uz.momoit.lms_canvas.repository.CommunityTagRepository;
import uz.momoit.lms_canvas.service.dto.CommunityTagDTO;
import uz.momoit.lms_canvas.service.mapper.CommunityTagMapper;

/**
 * Integration tests for the {@link CommunityTagResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CommunityTagResourceIT {

    private static final String ENTITY_API_URL = "/api/community-tags";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CommunityTagRepository communityTagRepository;

    @Autowired
    private CommunityTagMapper communityTagMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommunityTagMockMvc;

    private CommunityTag communityTag;

    private CommunityTag insertedCommunityTag;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommunityTag createEntity() {
        return new CommunityTag();
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommunityTag createUpdatedEntity() {
        return new CommunityTag();
    }

    @BeforeEach
    public void initTest() {
        communityTag = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCommunityTag != null) {
            communityTagRepository.delete(insertedCommunityTag);
            insertedCommunityTag = null;
        }
    }

    @Test
    @Transactional
    void createCommunityTag() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CommunityTag
        CommunityTagDTO communityTagDTO = communityTagMapper.toDto(communityTag);
        var returnedCommunityTagDTO = om.readValue(
            restCommunityTagMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityTagDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CommunityTagDTO.class
        );

        // Validate the CommunityTag in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCommunityTag = communityTagMapper.toEntity(returnedCommunityTagDTO);
        assertCommunityTagUpdatableFieldsEquals(returnedCommunityTag, getPersistedCommunityTag(returnedCommunityTag));

        insertedCommunityTag = returnedCommunityTag;
    }

    @Test
    @Transactional
    void createCommunityTagWithExistingId() throws Exception {
        // Create the CommunityTag with an existing ID
        communityTag.setId(1L);
        CommunityTagDTO communityTagDTO = communityTagMapper.toDto(communityTag);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommunityTagMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityTagDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CommunityTag in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCommunityTags() throws Exception {
        // Initialize the database
        insertedCommunityTag = communityTagRepository.saveAndFlush(communityTag);

        // Get all the communityTagList
        restCommunityTagMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(communityTag.getId().intValue())));
    }

    @Test
    @Transactional
    void getCommunityTag() throws Exception {
        // Initialize the database
        insertedCommunityTag = communityTagRepository.saveAndFlush(communityTag);

        // Get the communityTag
        restCommunityTagMockMvc
            .perform(get(ENTITY_API_URL_ID, communityTag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(communityTag.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCommunityTag() throws Exception {
        // Get the communityTag
        restCommunityTagMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCommunityTag() throws Exception {
        // Initialize the database
        insertedCommunityTag = communityTagRepository.saveAndFlush(communityTag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityTag
        CommunityTag updatedCommunityTag = communityTagRepository.findById(communityTag.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCommunityTag are not directly saved in db
        em.detach(updatedCommunityTag);
        CommunityTagDTO communityTagDTO = communityTagMapper.toDto(updatedCommunityTag);

        restCommunityTagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, communityTagDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityTagDTO))
            )
            .andExpect(status().isOk());

        // Validate the CommunityTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCommunityTagToMatchAllProperties(updatedCommunityTag);
    }

    @Test
    @Transactional
    void putNonExistingCommunityTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityTag.setId(longCount.incrementAndGet());

        // Create the CommunityTag
        CommunityTagDTO communityTagDTO = communityTagMapper.toDto(communityTag);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommunityTagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, communityTagDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityTagDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommunityTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityTag.setId(longCount.incrementAndGet());

        // Create the CommunityTag
        CommunityTagDTO communityTagDTO = communityTagMapper.toDto(communityTag);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityTagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityTagDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommunityTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityTag.setId(longCount.incrementAndGet());

        // Create the CommunityTag
        CommunityTagDTO communityTagDTO = communityTagMapper.toDto(communityTag);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityTagMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityTagDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommunityTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommunityTagWithPatch() throws Exception {
        // Initialize the database
        insertedCommunityTag = communityTagRepository.saveAndFlush(communityTag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityTag using partial update
        CommunityTag partialUpdatedCommunityTag = new CommunityTag();
        partialUpdatedCommunityTag.setId(communityTag.getId());

        restCommunityTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommunityTag.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommunityTag))
            )
            .andExpect(status().isOk());

        // Validate the CommunityTag in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommunityTagUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCommunityTag, communityTag),
            getPersistedCommunityTag(communityTag)
        );
    }

    @Test
    @Transactional
    void fullUpdateCommunityTagWithPatch() throws Exception {
        // Initialize the database
        insertedCommunityTag = communityTagRepository.saveAndFlush(communityTag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityTag using partial update
        CommunityTag partialUpdatedCommunityTag = new CommunityTag();
        partialUpdatedCommunityTag.setId(communityTag.getId());

        restCommunityTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommunityTag.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommunityTag))
            )
            .andExpect(status().isOk());

        // Validate the CommunityTag in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommunityTagUpdatableFieldsEquals(partialUpdatedCommunityTag, getPersistedCommunityTag(partialUpdatedCommunityTag));
    }

    @Test
    @Transactional
    void patchNonExistingCommunityTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityTag.setId(longCount.incrementAndGet());

        // Create the CommunityTag
        CommunityTagDTO communityTagDTO = communityTagMapper.toDto(communityTag);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommunityTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, communityTagDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(communityTagDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommunityTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityTag.setId(longCount.incrementAndGet());

        // Create the CommunityTag
        CommunityTagDTO communityTagDTO = communityTagMapper.toDto(communityTag);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(communityTagDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommunityTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityTag.setId(longCount.incrementAndGet());

        // Create the CommunityTag
        CommunityTagDTO communityTagDTO = communityTagMapper.toDto(communityTag);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityTagMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(communityTagDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommunityTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommunityTag() throws Exception {
        // Initialize the database
        insertedCommunityTag = communityTagRepository.saveAndFlush(communityTag);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the communityTag
        restCommunityTagMockMvc
            .perform(delete(ENTITY_API_URL_ID, communityTag.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return communityTagRepository.count();
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

    protected CommunityTag getPersistedCommunityTag(CommunityTag communityTag) {
        return communityTagRepository.findById(communityTag.getId()).orElseThrow();
    }

    protected void assertPersistedCommunityTagToMatchAllProperties(CommunityTag expectedCommunityTag) {
        assertCommunityTagAllPropertiesEquals(expectedCommunityTag, getPersistedCommunityTag(expectedCommunityTag));
    }

    protected void assertPersistedCommunityTagToMatchUpdatableProperties(CommunityTag expectedCommunityTag) {
        assertCommunityTagAllUpdatablePropertiesEquals(expectedCommunityTag, getPersistedCommunityTag(expectedCommunityTag));
    }
}
