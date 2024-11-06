package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.CommunityMessageAsserts.*;
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
import uz.momoit.lms_canvas.domain.CommunityMessage;
import uz.momoit.lms_canvas.repository.CommunityMessageRepository;
import uz.momoit.lms_canvas.repository.UserRepository;
import uz.momoit.lms_canvas.service.dto.CommunityMessageDTO;
import uz.momoit.lms_canvas.service.mapper.CommunityMessageMapper;

/**
 * Integration tests for the {@link CommunityMessageResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CommunityMessageResourceIT {

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final Instant DEFAULT_SENDER_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SENDER_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/community-messages";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CommunityMessageRepository communityMessageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommunityMessageMapper communityMessageMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommunityMessageMockMvc;

    private CommunityMessage communityMessage;

    private CommunityMessage insertedCommunityMessage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommunityMessage createEntity() {
        return new CommunityMessage().message(DEFAULT_MESSAGE).senderDate(DEFAULT_SENDER_DATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommunityMessage createUpdatedEntity() {
        return new CommunityMessage().message(UPDATED_MESSAGE).senderDate(UPDATED_SENDER_DATE);
    }

    @BeforeEach
    public void initTest() {
        communityMessage = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCommunityMessage != null) {
            communityMessageRepository.delete(insertedCommunityMessage);
            insertedCommunityMessage = null;
        }
    }

    @Test
    @Transactional
    void createCommunityMessage() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CommunityMessage
        CommunityMessageDTO communityMessageDTO = communityMessageMapper.toDto(communityMessage);
        var returnedCommunityMessageDTO = om.readValue(
            restCommunityMessageMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityMessageDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CommunityMessageDTO.class
        );

        // Validate the CommunityMessage in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCommunityMessage = communityMessageMapper.toEntity(returnedCommunityMessageDTO);
        assertCommunityMessageUpdatableFieldsEquals(returnedCommunityMessage, getPersistedCommunityMessage(returnedCommunityMessage));

        insertedCommunityMessage = returnedCommunityMessage;
    }

    @Test
    @Transactional
    void createCommunityMessageWithExistingId() throws Exception {
        // Create the CommunityMessage with an existing ID
        communityMessage.setId(1L);
        CommunityMessageDTO communityMessageDTO = communityMessageMapper.toDto(communityMessage);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommunityMessageMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityMessageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CommunityMessage in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCommunityMessages() throws Exception {
        // Initialize the database
        insertedCommunityMessage = communityMessageRepository.saveAndFlush(communityMessage);

        // Get all the communityMessageList
        restCommunityMessageMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(communityMessage.getId().intValue())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE)))
            .andExpect(jsonPath("$.[*].senderDate").value(hasItem(DEFAULT_SENDER_DATE.toString())));
    }

    @Test
    @Transactional
    void getCommunityMessage() throws Exception {
        // Initialize the database
        insertedCommunityMessage = communityMessageRepository.saveAndFlush(communityMessage);

        // Get the communityMessage
        restCommunityMessageMockMvc
            .perform(get(ENTITY_API_URL_ID, communityMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(communityMessage.getId().intValue()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE))
            .andExpect(jsonPath("$.senderDate").value(DEFAULT_SENDER_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCommunityMessage() throws Exception {
        // Get the communityMessage
        restCommunityMessageMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCommunityMessage() throws Exception {
        // Initialize the database
        insertedCommunityMessage = communityMessageRepository.saveAndFlush(communityMessage);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityMessage
        CommunityMessage updatedCommunityMessage = communityMessageRepository.findById(communityMessage.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCommunityMessage are not directly saved in db
        em.detach(updatedCommunityMessage);
        updatedCommunityMessage.message(UPDATED_MESSAGE).senderDate(UPDATED_SENDER_DATE);
        CommunityMessageDTO communityMessageDTO = communityMessageMapper.toDto(updatedCommunityMessage);

        restCommunityMessageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, communityMessageDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityMessageDTO))
            )
            .andExpect(status().isOk());

        // Validate the CommunityMessage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCommunityMessageToMatchAllProperties(updatedCommunityMessage);
    }

    @Test
    @Transactional
    void putNonExistingCommunityMessage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityMessage.setId(longCount.incrementAndGet());

        // Create the CommunityMessage
        CommunityMessageDTO communityMessageDTO = communityMessageMapper.toDto(communityMessage);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommunityMessageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, communityMessageDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityMessageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityMessage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommunityMessage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityMessage.setId(longCount.incrementAndGet());

        // Create the CommunityMessage
        CommunityMessageDTO communityMessageDTO = communityMessageMapper.toDto(communityMessage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityMessageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(communityMessageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityMessage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommunityMessage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityMessage.setId(longCount.incrementAndGet());

        // Create the CommunityMessage
        CommunityMessageDTO communityMessageDTO = communityMessageMapper.toDto(communityMessage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityMessageMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(communityMessageDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommunityMessage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommunityMessageWithPatch() throws Exception {
        // Initialize the database
        insertedCommunityMessage = communityMessageRepository.saveAndFlush(communityMessage);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityMessage using partial update
        CommunityMessage partialUpdatedCommunityMessage = new CommunityMessage();
        partialUpdatedCommunityMessage.setId(communityMessage.getId());

        restCommunityMessageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommunityMessage.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommunityMessage))
            )
            .andExpect(status().isOk());

        // Validate the CommunityMessage in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommunityMessageUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCommunityMessage, communityMessage),
            getPersistedCommunityMessage(communityMessage)
        );
    }

    @Test
    @Transactional
    void fullUpdateCommunityMessageWithPatch() throws Exception {
        // Initialize the database
        insertedCommunityMessage = communityMessageRepository.saveAndFlush(communityMessage);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the communityMessage using partial update
        CommunityMessage partialUpdatedCommunityMessage = new CommunityMessage();
        partialUpdatedCommunityMessage.setId(communityMessage.getId());

        partialUpdatedCommunityMessage.message(UPDATED_MESSAGE).senderDate(UPDATED_SENDER_DATE);

        restCommunityMessageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommunityMessage.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCommunityMessage))
            )
            .andExpect(status().isOk());

        // Validate the CommunityMessage in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCommunityMessageUpdatableFieldsEquals(
            partialUpdatedCommunityMessage,
            getPersistedCommunityMessage(partialUpdatedCommunityMessage)
        );
    }

    @Test
    @Transactional
    void patchNonExistingCommunityMessage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityMessage.setId(longCount.incrementAndGet());

        // Create the CommunityMessage
        CommunityMessageDTO communityMessageDTO = communityMessageMapper.toDto(communityMessage);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommunityMessageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, communityMessageDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(communityMessageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityMessage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommunityMessage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityMessage.setId(longCount.incrementAndGet());

        // Create the CommunityMessage
        CommunityMessageDTO communityMessageDTO = communityMessageMapper.toDto(communityMessage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityMessageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(communityMessageDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommunityMessage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommunityMessage() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        communityMessage.setId(longCount.incrementAndGet());

        // Create the CommunityMessage
        CommunityMessageDTO communityMessageDTO = communityMessageMapper.toDto(communityMessage);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommunityMessageMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(communityMessageDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommunityMessage in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommunityMessage() throws Exception {
        // Initialize the database
        insertedCommunityMessage = communityMessageRepository.saveAndFlush(communityMessage);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the communityMessage
        restCommunityMessageMockMvc
            .perform(delete(ENTITY_API_URL_ID, communityMessage.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return communityMessageRepository.count();
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

    protected CommunityMessage getPersistedCommunityMessage(CommunityMessage communityMessage) {
        return communityMessageRepository.findById(communityMessage.getId()).orElseThrow();
    }

    protected void assertPersistedCommunityMessageToMatchAllProperties(CommunityMessage expectedCommunityMessage) {
        assertCommunityMessageAllPropertiesEquals(expectedCommunityMessage, getPersistedCommunityMessage(expectedCommunityMessage));
    }

    protected void assertPersistedCommunityMessageToMatchUpdatableProperties(CommunityMessage expectedCommunityMessage) {
        assertCommunityMessageAllUpdatablePropertiesEquals(
            expectedCommunityMessage,
            getPersistedCommunityMessage(expectedCommunityMessage)
        );
    }
}
