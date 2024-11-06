package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.CommunityAsserts.*;
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
import uz.momoit.lms_canvas.domain.Community;
import uz.momoit.lms_canvas.repository.CommunityRepository;
import uz.momoit.lms_canvas.repository.UserRepository;
import uz.momoit.lms_canvas.service.dto.CommunityDTO;
import uz.momoit.lms_canvas.service.mapper.CommunityMapper;

/**
 * Integration tests for the {@link CommunityResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CommunityResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_BODY = "AAAAAAAAAA";
    private static final String UPDATED_BODY = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SET_AS_ANONYMOUS = false;
    private static final Boolean UPDATED_SET_AS_ANONYMOUS = true;

    private static final Boolean DEFAULT_ONLY_ME = false;
    private static final Boolean UPDATED_ONLY_ME = true;

    private static final Boolean DEFAULT_TO_ALL_STUDENTS = false;
    private static final Boolean UPDATED_TO_ALL_STUDENTS = true;

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    private static final String ENTITY_API_URL = "/api/communities";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommunityMapper communityMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommunityMockMvc;

    private Community community;

    private Community insertedCommunity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Community createEntity() {
        return new Community()
            .title(DEFAULT_TITLE)
            .body(DEFAULT_BODY)
            .setAsAnonymous(DEFAULT_SET_AS_ANONYMOUS)
            .onlyMe(DEFAULT_ONLY_ME)
            .toAllStudents(DEFAULT_TO_ALL_STUDENTS)
            .status(DEFAULT_STATUS);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Community createUpdatedEntity() {
        return new Community()
            .title(UPDATED_TITLE)
            .body(UPDATED_BODY)
            .setAsAnonymous(UPDATED_SET_AS_ANONYMOUS)
            .onlyMe(UPDATED_ONLY_ME)
            .toAllStudents(UPDATED_TO_ALL_STUDENTS)
            .status(UPDATED_STATUS);
    }

    @BeforeEach
    public void initTest() {
        community = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCommunity != null) {
            communityRepository.delete(insertedCommunity);
            insertedCommunity = null;
        }
    }

    @Test
    @Transactional
    void createCommunity() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Community
        CommunityDTO communityDTO = communityMapper.toDto(community);
        var returnedCommunityDTO = om.readValue(
            restCommunityMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CommunityDTO.class
        );

        // Validate the Community in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCommunity = communityMapper.toEntity(returnedCommunityDTO);
        assertCommunityUpdatableFieldsEquals(returnedCommunity, getPersistedCommunity(returnedCommunity));

        insertedCommunity = returnedCommunity;
    }

    @Test
    @Transactional
    void createCommunityWithExistingId() throws Exception {
        // Create the Community with an existing ID
        community.setId(1L);
        CommunityDTO communityDTO = communityMapper.toDto(community);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommunityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Community in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCommunities() throws Exception {
        // Initialize the database
        insertedCommunity = communityRepository.saveAndFlush(community);

        // Get all the communityList
        restCommunityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(community.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].body").value(hasItem(DEFAULT_BODY)))
            .andExpect(jsonPath("$.[*].setAsAnonymous").value(hasItem(DEFAULT_SET_AS_ANONYMOUS.booleanValue())))
            .andExpect(jsonPath("$.[*].onlyMe").value(hasItem(DEFAULT_ONLY_ME.booleanValue())))
            .andExpect(jsonPath("$.[*].toAllStudents").value(hasItem(DEFAULT_TO_ALL_STUDENTS.booleanValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())));
    }

    @Test
    @Transactional
    void getCommunity() throws Exception {
        // Initialize the database
        insertedCommunity = communityRepository.saveAndFlush(community);

        // Get the community
        restCommunityMockMvc
            .perform(get(ENTITY_API_URL_ID, community.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(community.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.body").value(DEFAULT_BODY))
            .andExpect(jsonPath("$.setAsAnonymous").value(DEFAULT_SET_AS_ANONYMOUS.booleanValue()))
            .andExpect(jsonPath("$.onlyMe").value(DEFAULT_ONLY_ME.booleanValue()))
            .andExpect(jsonPath("$.toAllStudents").value(DEFAULT_TO_ALL_STUDENTS.booleanValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingCommunity() throws Exception {
        // Get the community
        restCommunityMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCommunity() throws Exception {
        // Initialize the database
        insertedCommunity = communityRepository.saveAndFlush(community);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the community
        Community updatedCommunity = communityRepository.findById(community.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCommunity are not directly saved in db
        em.detach(updatedCommunity);
        updatedCommunity
            .title(UPDATED_TITLE)
            .body(UPDATED_BODY)
            .setAsAnonymous(UPDATED_SET_AS_ANONYMOUS)
            .onlyMe(UPDATED_ONLY_ME)
            .toAllStudents(UPDATED_TO_ALL_STUDENTS)
            .status(UPDATED_STATUS);
        CommunityDTO communityDTO = communityMapper.toDto(updatedCommunity);

        restCommunityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, communityDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityDTO))
            )
            .andExpect(status().isOk());

        // Validate the Community in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCommunityToMatchAllProperties(updatedCommunity);
    }

    @Test
    @Transactional
    void putNonExistingCommunity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        community.setId(longCount.incrementAndGet());

        // Create the Community
        CommunityDTO communityDTO = communityMapper.toDto(community);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommunityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, communityDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Community in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommunity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        community.setId(longCount.incrementAndGet());

        // Create the Community
        CommunityDTO communityDTO = communityMapper.toDto(community);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Community in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommunity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        community.setId(longCount.incrementAndGet());

        // Create the Community
        CommunityDTO communityDTO = communityMapper.toDto(community);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Community in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommunityWithPatch() throws Exception {
        // Initialize the database
        insertedCommunity = communityRepository.saveAndFlush(community);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the community using partial update
        Community partialUpdatedCommunity = new Community();
        partialUpdatedCommunity.setId(community.getId());

        partialUpdatedCommunity.status(UPDATED_STATUS);

        restCommunityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommunity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommunity))
            )
            .andExpect(status().isOk());

        // Validate the Community in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommunityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCommunity, community),
            getPersistedCommunity(community)
        );
    }

    @Test
    @Transactional
    void fullUpdateCommunityWithPatch() throws Exception {
        // Initialize the database
        insertedCommunity = communityRepository.saveAndFlush(community);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the community using partial update
        Community partialUpdatedCommunity = new Community();
        partialUpdatedCommunity.setId(community.getId());

        partialUpdatedCommunity
            .title(UPDATED_TITLE)
            .body(UPDATED_BODY)
            .setAsAnonymous(UPDATED_SET_AS_ANONYMOUS)
            .onlyMe(UPDATED_ONLY_ME)
            .toAllStudents(UPDATED_TO_ALL_STUDENTS)
            .status(UPDATED_STATUS);

        restCommunityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommunity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommunity))
            )
            .andExpect(status().isOk());

        // Validate the Community in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommunityUpdatableFieldsEquals(partialUpdatedCommunity, getPersistedCommunity(partialUpdatedCommunity));
    }

    @Test
    @Transactional
    void patchNonExistingCommunity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        community.setId(longCount.incrementAndGet());

        // Create the Community
        CommunityDTO communityDTO = communityMapper.toDto(community);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommunityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, communityDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(communityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Community in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommunity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        community.setId(longCount.incrementAndGet());

        // Create the Community
        CommunityDTO communityDTO = communityMapper.toDto(community);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(communityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Community in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommunity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        community.setId(longCount.incrementAndGet());

        // Create the Community
        CommunityDTO communityDTO = communityMapper.toDto(community);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(communityDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Community in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommunity() throws Exception {
        // Initialize the database
        insertedCommunity = communityRepository.saveAndFlush(community);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the community
        restCommunityMockMvc
            .perform(delete(ENTITY_API_URL_ID, community.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return communityRepository.count();
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

    protected Community getPersistedCommunity(Community community) {
        return communityRepository.findById(community.getId()).orElseThrow();
    }

    protected void assertPersistedCommunityToMatchAllProperties(Community expectedCommunity) {
        assertCommunityAllPropertiesEquals(expectedCommunity, getPersistedCommunity(expectedCommunity));
    }

    protected void assertPersistedCommunityToMatchUpdatableProperties(Community expectedCommunity) {
        assertCommunityAllUpdatablePropertiesEquals(expectedCommunity, getPersistedCommunity(expectedCommunity));
    }
}
