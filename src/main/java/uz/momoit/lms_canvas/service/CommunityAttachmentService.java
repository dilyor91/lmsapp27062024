package uz.momoit.lms_canvas.service;

import java.util.List;
import java.util.Optional;
import uz.momoit.lms_canvas.service.dto.CommunityAttachmentDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.CommunityAttachment}.
 */
public interface CommunityAttachmentService {
    /**
     * Save a communityAttachment.
     *
     * @param communityAttachmentDTO the entity to save.
     * @return the persisted entity.
     */
    CommunityAttachmentDTO save(CommunityAttachmentDTO communityAttachmentDTO);

    /**
     * Updates a communityAttachment.
     *
     * @param communityAttachmentDTO the entity to update.
     * @return the persisted entity.
     */
    CommunityAttachmentDTO update(CommunityAttachmentDTO communityAttachmentDTO);

    /**
     * Partially updates a communityAttachment.
     *
     * @param communityAttachmentDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CommunityAttachmentDTO> partialUpdate(CommunityAttachmentDTO communityAttachmentDTO);

    /**
     * Get all the communityAttachments.
     *
     * @return the list of entities.
     */
    List<CommunityAttachmentDTO> findAll();

    /**
     * Get the "id" communityAttachment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CommunityAttachmentDTO> findOne(Long id);

    /**
     * Delete the "id" communityAttachment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
