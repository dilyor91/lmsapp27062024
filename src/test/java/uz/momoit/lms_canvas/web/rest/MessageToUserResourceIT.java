package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.MessageToUserAsserts.*;
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
import uz.momoit.lms_canvas.domain.MessageToUser;
import uz.momoit.lms_canvas.repository.MessageToUserRepository;
import uz.momoit.lms_canvas.repository.UserRepository;
import uz.momoit.lms_canvas.service.dto.MessageToUserDTO;
import uz.momoit.lms_canvas.service.mapper.MessageToUserMapper;

/**
 * Integration tests for the {@link MessageToUserResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MessageToUserResourceIT {

    private static final Boolean DEFAULT_READ = false;
    private static final Boolean UPDATED_READ = true;

    private static final Instant DEFAULT_READ_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_READ_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    private static final String ENTITY_API_URL = "/api/message-to-users";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private MessageToUserRepository messageToUserRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageToUserMapper messageToUserMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMessageToUserMockMvc;

    private MessageToUser messageToUser;

    private MessageToUser insertedMessageToUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MessageToUser createEntity() {
        return new MessageToUser().read(DEFAULT_READ).readAt(DEFAULT_READ_AT).deleted(DEFAULT_DELETED);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MessageToUser createUpdatedEntity() {
        return new MessageToUser().read(UPDATED_READ).readAt(UPDATED_READ_AT).deleted(UPDATED_DELETED);
    }

    @BeforeEach
    public void initTest() {
        messageToUser = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedMessageToUser != null) {
            messageToUserRepository.delete(insertedMessageToUser);
            insertedMessageToUser = null;
        }
    }

    @Test
    @Transactional
    void createMessageToUser() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the MessageToUser
        MessageToUserDTO messageToUserDTO = messageToUserMapper.toDto(messageToUser);
        var returnedMessageToUserDTO = om.readValue(
            restMessageToUserMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(messageToUserDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            MessageToUserDTO.class
        );

        // Validate the MessageToUser in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedMessageToUser = messageToUserMapper.toEntity(returnedMessageToUserDTO);
        assertMessageToUserUpdatableFieldsEquals(returnedMessageToUser, getPersistedMessageToUser(returnedMessageToUser));

        insertedMessageToUser = returnedMessageToUser;
    }

    @Test
    @Transactional
    void createMessageToUserWithExistingId() throws Exception {
        // Create the MessageToUser with an existing ID
        messageToUser.setId(1L);
        MessageToUserDTO messageToUserDTO = messageToUserMapper.toDto(messageToUser);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMessageToUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(messageToUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MessageToUser in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMessageToUsers() throws Exception {
        // Initialize the database
        insertedMessageToUser = messageToUserRepository.saveAndFlush(messageToUser);

        // Get all the messageToUserList
        restMessageToUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(messageToUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].read").value(hasItem(DEFAULT_READ.booleanValue())))
            .andExpect(jsonPath("$.[*].readAt").value(hasItem(DEFAULT_READ_AT.toString())))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }

    @Test
    @Transactional
    void getMessageToUser() throws Exception {
        // Initialize the database
        insertedMessageToUser = messageToUserRepository.saveAndFlush(messageToUser);

        // Get the messageToUser
        restMessageToUserMockMvc
            .perform(get(ENTITY_API_URL_ID, messageToUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(messageToUser.getId().intValue()))
            .andExpect(jsonPath("$.read").value(DEFAULT_READ.booleanValue()))
            .andExpect(jsonPath("$.readAt").value(DEFAULT_READ_AT.toString()))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingMessageToUser() throws Exception {
        // Get the messageToUser
        restMessageToUserMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingMessageToUser() throws Exception {
        // Initialize the database
        insertedMessageToUser = messageToUserRepository.saveAndFlush(messageToUser);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the messageToUser
        MessageToUser updatedMessageToUser = messageToUserRepository.findById(messageToUser.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedMessageToUser are not directly saved in db
        em.detach(updatedMessageToUser);
        updatedMessageToUser.read(UPDATED_READ).readAt(UPDATED_READ_AT).deleted(UPDATED_DELETED);
        MessageToUserDTO messageToUserDTO = messageToUserMapper.toDto(updatedMessageToUser);

        restMessageToUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, messageToUserDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(messageToUserDTO))
            )
            .andExpect(status().isOk());

        // Validate the MessageToUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedMessageToUserToMatchAllProperties(updatedMessageToUser);
    }

    @Test
    @Transactional
    void putNonExistingMessageToUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageToUser.setId(longCount.incrementAndGet());

        // Create the MessageToUser
        MessageToUserDTO messageToUserDTO = messageToUserMapper.toDto(messageToUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMessageToUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, messageToUserDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(messageToUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageToUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMessageToUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageToUser.setId(longCount.incrementAndGet());

        // Create the MessageToUser
        MessageToUserDTO messageToUserDTO = messageToUserMapper.toDto(messageToUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageToUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(messageToUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageToUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMessageToUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageToUser.setId(longCount.incrementAndGet());

        // Create the MessageToUser
        MessageToUserDTO messageToUserDTO = messageToUserMapper.toDto(messageToUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageToUserMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(messageToUserDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MessageToUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMessageToUserWithPatch() throws Exception {
        // Initialize the database
        insertedMessageToUser = messageToUserRepository.saveAndFlush(messageToUser);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the messageToUser using partial update
        MessageToUser partialUpdatedMessageToUser = new MessageToUser();
        partialUpdatedMessageToUser.setId(messageToUser.getId());

        partialUpdatedMessageToUser.read(UPDATED_READ);

        restMessageToUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMessageToUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMessageToUser))
            )
            .andExpect(status().isOk());

        // Validate the MessageToUser in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMessageToUserUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedMessageToUser, messageToUser),
            getPersistedMessageToUser(messageToUser)
        );
    }

    @Test
    @Transactional
    void fullUpdateMessageToUserWithPatch() throws Exception {
        // Initialize the database
        insertedMessageToUser = messageToUserRepository.saveAndFlush(messageToUser);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the messageToUser using partial update
        MessageToUser partialUpdatedMessageToUser = new MessageToUser();
        partialUpdatedMessageToUser.setId(messageToUser.getId());

        partialUpdatedMessageToUser.read(UPDATED_READ).readAt(UPDATED_READ_AT).deleted(UPDATED_DELETED);

        restMessageToUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMessageToUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMessageToUser))
            )
            .andExpect(status().isOk());

        // Validate the MessageToUser in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMessageToUserUpdatableFieldsEquals(partialUpdatedMessageToUser, getPersistedMessageToUser(partialUpdatedMessageToUser));
    }

    @Test
    @Transactional
    void patchNonExistingMessageToUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageToUser.setId(longCount.incrementAndGet());

        // Create the MessageToUser
        MessageToUserDTO messageToUserDTO = messageToUserMapper.toDto(messageToUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMessageToUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, messageToUserDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(messageToUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageToUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMessageToUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageToUser.setId(longCount.incrementAndGet());

        // Create the MessageToUser
        MessageToUserDTO messageToUserDTO = messageToUserMapper.toDto(messageToUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageToUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(messageToUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageToUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMessageToUser() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageToUser.setId(longCount.incrementAndGet());

        // Create the MessageToUser
        MessageToUserDTO messageToUserDTO = messageToUserMapper.toDto(messageToUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageToUserMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(messageToUserDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MessageToUser in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMessageToUser() throws Exception {
        // Initialize the database
        insertedMessageToUser = messageToUserRepository.saveAndFlush(messageToUser);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the messageToUser
        restMessageToUserMockMvc
            .perform(delete(ENTITY_API_URL_ID, messageToUser.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return messageToUserRepository.count();
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

    protected MessageToUser getPersistedMessageToUser(MessageToUser messageToUser) {
        return messageToUserRepository.findById(messageToUser.getId()).orElseThrow();
    }

    protected void assertPersistedMessageToUserToMatchAllProperties(MessageToUser expectedMessageToUser) {
        assertMessageToUserAllPropertiesEquals(expectedMessageToUser, getPersistedMessageToUser(expectedMessageToUser));
    }

    protected void assertPersistedMessageToUserToMatchUpdatableProperties(MessageToUser expectedMessageToUser) {
        assertMessageToUserAllUpdatablePropertiesEquals(expectedMessageToUser, getPersistedMessageToUser(expectedMessageToUser));
    }
}
