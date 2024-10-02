package uz.momoit.lms_canvas.service;

import java.util.List;
import java.util.Optional;
import uz.momoit.lms_canvas.service.dto.MessageAttachmentDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.MessageAttachment}.
 */
public interface MessageAttachmentService {
    /**
     * Save a messageAttachment.
     *
     * @param messageAttachmentDTO the entity to save.
     * @return the persisted entity.
     */
    MessageAttachmentDTO save(MessageAttachmentDTO messageAttachmentDTO);

    /**
     * Updates a messageAttachment.
     *
     * @param messageAttachmentDTO the entity to update.
     * @return the persisted entity.
     */
    MessageAttachmentDTO update(MessageAttachmentDTO messageAttachmentDTO);

    /**
     * Partially updates a messageAttachment.
     *
     * @param messageAttachmentDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<MessageAttachmentDTO> partialUpdate(MessageAttachmentDTO messageAttachmentDTO);

    /**
     * Get all the messageAttachments.
     *
     * @return the list of entities.
     */
    List<MessageAttachmentDTO> findAll();

    /**
     * Get the "id" messageAttachment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MessageAttachmentDTO> findOne(Long id);

    /**
     * Delete the "id" messageAttachment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
