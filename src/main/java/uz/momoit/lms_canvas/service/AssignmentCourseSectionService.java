package uz.momoit.lms_canvas.service;

import java.util.List;
import java.util.Optional;
import uz.momoit.lms_canvas.service.dto.AssignmentCourseSectionDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.AssignmentCourseSection}.
 */
public interface AssignmentCourseSectionService {
    /**
     * Save a assignmentCourseSection.
     *
     * @param assignmentCourseSectionDTO the entity to save.
     * @return the persisted entity.
     */
    AssignmentCourseSectionDTO save(AssignmentCourseSectionDTO assignmentCourseSectionDTO);

    /**
     * Updates a assignmentCourseSection.
     *
     * @param assignmentCourseSectionDTO the entity to update.
     * @return the persisted entity.
     */
    AssignmentCourseSectionDTO update(AssignmentCourseSectionDTO assignmentCourseSectionDTO);

    /**
     * Partially updates a assignmentCourseSection.
     *
     * @param assignmentCourseSectionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AssignmentCourseSectionDTO> partialUpdate(AssignmentCourseSectionDTO assignmentCourseSectionDTO);

    /**
     * Get all the assignmentCourseSections.
     *
     * @return the list of entities.
     */
    List<AssignmentCourseSectionDTO> findAll();

    /**
     * Get the "id" assignmentCourseSection.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AssignmentCourseSectionDTO> findOne(Long id);

    /**
     * Delete the "id" assignmentCourseSection.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
