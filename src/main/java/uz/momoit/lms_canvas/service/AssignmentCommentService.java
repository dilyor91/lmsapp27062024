package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.AssignmentCommentDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.AssignmentComment}.
 */
public interface AssignmentCommentService {
    /**
     * Save a assignmentComment.
     *
     * @param assignmentCommentDTO the entity to save.
     * @return the persisted entity.
     */
    AssignmentCommentDTO save(AssignmentCommentDTO assignmentCommentDTO);

    /**
     * Updates a assignmentComment.
     *
     * @param assignmentCommentDTO the entity to update.
     * @return the persisted entity.
     */
    AssignmentCommentDTO update(AssignmentCommentDTO assignmentCommentDTO);

    /**
     * Partially updates a assignmentComment.
     *
     * @param assignmentCommentDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AssignmentCommentDTO> partialUpdate(AssignmentCommentDTO assignmentCommentDTO);

    /**
     * Get all the assignmentComments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AssignmentCommentDTO> findAll(Pageable pageable);

    /**
     * Get the "id" assignmentComment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AssignmentCommentDTO> findOne(Long id);

    /**
     * Delete the "id" assignmentComment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
