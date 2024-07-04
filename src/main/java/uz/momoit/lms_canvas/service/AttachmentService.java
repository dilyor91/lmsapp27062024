package uz.momoit.lms_canvas.service;

import java.util.List;
import java.util.Optional;
import uz.momoit.lms_canvas.service.dto.AttachmentDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.Attachment}.
 */
public interface AttachmentService {
    /**
     * Save a attachment.
     *
     * @param attachmentDTO the entity to save.
     * @return the persisted entity.
     */
    AttachmentDTO save(AttachmentDTO attachmentDTO);

    /**
     * Updates a attachment.
     *
     * @param attachmentDTO the entity to update.
     * @return the persisted entity.
     */
    AttachmentDTO update(AttachmentDTO attachmentDTO);

    /**
     * Partially updates a attachment.
     *
     * @param attachmentDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AttachmentDTO> partialUpdate(AttachmentDTO attachmentDTO);

    /**
     * Get all the attachments.
     *
     * @return the list of entities.
     */
    List<AttachmentDTO> findAll();

    /**
     * Get all the AttachmentDTO where LessonMaterial is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<AttachmentDTO> findAllWhereLessonMaterialIsNull();

    /**
     * Get the "id" attachment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AttachmentDTO> findOne(Long id);

    /**
     * Delete the "id" attachment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
