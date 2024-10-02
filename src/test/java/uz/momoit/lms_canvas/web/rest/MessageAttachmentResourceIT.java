package uz.momoit.lms_canvas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static uz.momoit.lms_canvas.domain.MessageAttachmentAsserts.*;
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
import uz.momoit.lms_canvas.domain.MessageAttachment;
import uz.momoit.lms_canvas.repository.MessageAttachmentRepository;
import uz.momoit.lms_canvas.service.dto.MessageAttachmentDTO;
import uz.momoit.lms_canvas.service.mapper.MessageAttachmentMapper;

/**
 * Integration tests for the {@link MessageAttachmentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MessageAttachmentResourceIT {

    private static final String ENTITY_API_URL = "/api/message-attachments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private MessageAttachmentRepository messageAttachmentRepository;

    @Autowired
    private MessageAttachmentMapper messageAttachmentMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMessageAttachmentMockMvc;

    private MessageAttachment messageAttachment;

    private MessageAttachment insertedMessageAttachment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MessageAttachment createEntity() {
        return new MessageAttachment();
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MessageAttachment createUpdatedEntity() {
        return new MessageAttachment();
    }

    @BeforeEach
    public void initTest() {
        messageAttachment = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedMessageAttachment != null) {
            messageAttachmentRepository.delete(insertedMessageAttachment);
            insertedMessageAttachment = null;
        }
    }

    @Test
    @Transactional
    void createMessageAttachment() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the MessageAttachment
        MessageAttachmentDTO messageAttachmentDTO = messageAttachmentMapper.toDto(messageAttachment);
        var returnedMessageAttachmentDTO = om.readValue(
            restMessageAttachmentMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(messageAttachmentDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            MessageAttachmentDTO.class
        );

        // Validate the MessageAttachment in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedMessageAttachment = messageAttachmentMapper.toEntity(returnedMessageAttachmentDTO);
        assertMessageAttachmentUpdatableFieldsEquals(returnedMessageAttachment, getPersistedMessageAttachment(returnedMessageAttachment));

        insertedMessageAttachment = returnedMessageAttachment;
    }

    @Test
    @Transactional
    void createMessageAttachmentWithExistingId() throws Exception {
        // Create the MessageAttachment with an existing ID
        messageAttachment.setId(1L);
        MessageAttachmentDTO messageAttachmentDTO = messageAttachmentMapper.toDto(messageAttachment);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMessageAttachmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(messageAttachmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MessageAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMessageAttachments() throws Exception {
        // Initialize the database
        insertedMessageAttachment = messageAttachmentRepository.saveAndFlush(messageAttachment);

        // Get all the messageAttachmentList
        restMessageAttachmentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(messageAttachment.getId().intValue())));
    }

    @Test
    @Transactional
    void getMessageAttachment() throws Exception {
        // Initialize the database
        insertedMessageAttachment = messageAttachmentRepository.saveAndFlush(messageAttachment);

        // Get the messageAttachment
        restMessageAttachmentMockMvc
            .perform(get(ENTITY_API_URL_ID, messageAttachment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(messageAttachment.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingMessageAttachment() throws Exception {
        // Get the messageAttachment
        restMessageAttachmentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingMessageAttachment() throws Exception {
        // Initialize the database
        insertedMessageAttachment = messageAttachmentRepository.saveAndFlush(messageAttachment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the messageAttachment
        MessageAttachment updatedMessageAttachment = messageAttachmentRepository.findById(messageAttachment.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedMessageAttachment are not directly saved in db
        em.detach(updatedMessageAttachment);
        MessageAttachmentDTO messageAttachmentDTO = messageAttachmentMapper.toDto(updatedMessageAttachment);

        restMessageAttachmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, messageAttachmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(messageAttachmentDTO))
            )
            .andExpect(status().isOk());

        // Validate the MessageAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedMessageAttachmentToMatchAllProperties(updatedMessageAttachment);
    }

    @Test
    @Transactional
    void putNonExistingMessageAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageAttachment.setId(longCount.incrementAndGet());

        // Create the MessageAttachment
        MessageAttachmentDTO messageAttachmentDTO = messageAttachmentMapper.toDto(messageAttachment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMessageAttachmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, messageAttachmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(messageAttachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMessageAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageAttachment.setId(longCount.incrementAndGet());

        // Create the MessageAttachment
        MessageAttachmentDTO messageAttachmentDTO = messageAttachmentMapper.toDto(messageAttachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageAttachmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(messageAttachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMessageAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageAttachment.setId(longCount.incrementAndGet());

        // Create the MessageAttachment
        MessageAttachmentDTO messageAttachmentDTO = messageAttachmentMapper.toDto(messageAttachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageAttachmentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(messageAttachmentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MessageAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMessageAttachmentWithPatch() throws Exception {
        // Initialize the database
        insertedMessageAttachment = messageAttachmentRepository.saveAndFlush(messageAttachment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the messageAttachment using partial update
        MessageAttachment partialUpdatedMessageAttachment = new MessageAttachment();
        partialUpdatedMessageAttachment.setId(messageAttachment.getId());

        restMessageAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMessageAttachment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMessageAttachment))
            )
            .andExpect(status().isOk());

        // Validate the MessageAttachment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMessageAttachmentUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedMessageAttachment, messageAttachment),
            getPersistedMessageAttachment(messageAttachment)
        );
    }

    @Test
    @Transactional
    void fullUpdateMessageAttachmentWithPatch() throws Exception {
        // Initialize the database
        insertedMessageAttachment = messageAttachmentRepository.saveAndFlush(messageAttachment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the messageAttachment using partial update
        MessageAttachment partialUpdatedMessageAttachment = new MessageAttachment();
        partialUpdatedMessageAttachment.setId(messageAttachment.getId());

        restMessageAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMessageAttachment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMessageAttachment))
            )
            .andExpect(status().isOk());

        // Validate the MessageAttachment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMessageAttachmentUpdatableFieldsEquals(
            partialUpdatedMessageAttachment,
            getPersistedMessageAttachment(partialUpdatedMessageAttachment)
        );
    }

    @Test
    @Transactional
    void patchNonExistingMessageAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageAttachment.setId(longCount.incrementAndGet());

        // Create the MessageAttachment
        MessageAttachmentDTO messageAttachmentDTO = messageAttachmentMapper.toDto(messageAttachment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMessageAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, messageAttachmentDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(messageAttachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMessageAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageAttachment.setId(longCount.incrementAndGet());

        // Create the MessageAttachment
        MessageAttachmentDTO messageAttachmentDTO = messageAttachmentMapper.toDto(messageAttachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageAttachmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(messageAttachmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MessageAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMessageAttachment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        messageAttachment.setId(longCount.incrementAndGet());

        // Create the MessageAttachment
        MessageAttachmentDTO messageAttachmentDTO = messageAttachmentMapper.toDto(messageAttachment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMessageAttachmentMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(messageAttachmentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MessageAttachment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMessageAttachment() throws Exception {
        // Initialize the database
        insertedMessageAttachment = messageAttachmentRepository.saveAndFlush(messageAttachment);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the messageAttachment
        restMessageAttachmentMockMvc
            .perform(delete(ENTITY_API_URL_ID, messageAttachment.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return messageAttachmentRepository.count();
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

    protected MessageAttachment getPersistedMessageAttachment(MessageAttachment messageAttachment) {
        return messageAttachmentRepository.findById(messageAttachment.getId()).orElseThrow();
    }

    protected void assertPersistedMessageAttachmentToMatchAllProperties(MessageAttachment expectedMessageAttachment) {
        assertMessageAttachmentAllPropertiesEquals(expectedMessageAttachment, getPersistedMessageAttachment(expectedMessageAttachment));
    }

    protected void assertPersistedMessageAttachmentToMatchUpdatableProperties(MessageAttachment expectedMessageAttachment) {
        assertMessageAttachmentAllUpdatablePropertiesEquals(
            expectedMessageAttachment,
            getPersistedMessageAttachment(expectedMessageAttachment)
        );
    }
}
