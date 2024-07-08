package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.SubmissionAssignmentDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.SubmissionAssignment}.
 */
public interface SubmissionAssignmentService {
    /**
     * Save a submissionAssignment.
     *
     * @param submissionAssignmentDTO the entity to save.
     * @return the persisted entity.
     */
    SubmissionAssignmentDTO save(SubmissionAssignmentDTO submissionAssignmentDTO);

    /**
     * Updates a submissionAssignment.
     *
     * @param submissionAssignmentDTO the entity to update.
     * @return the persisted entity.
     */
    SubmissionAssignmentDTO update(SubmissionAssignmentDTO submissionAssignmentDTO);

    /**
     * Partially updates a submissionAssignment.
     *
     * @param submissionAssignmentDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<SubmissionAssignmentDTO> partialUpdate(SubmissionAssignmentDTO submissionAssignmentDTO);

    /**
     * Get all the submissionAssignments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SubmissionAssignmentDTO> findAll(Pageable pageable);

    /**
     * Get the "id" submissionAssignment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SubmissionAssignmentDTO> findOne(Long id);

    /**
     * Delete the "id" submissionAssignment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
