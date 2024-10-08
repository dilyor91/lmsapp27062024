package uz.momoit.lms_canvas.service;

import java.util.List;
import java.util.Optional;
import uz.momoit.lms_canvas.service.dto.CommunityCourseDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.CommunityCourse}.
 */
public interface CommunityCourseService {
    /**
     * Save a communityCourse.
     *
     * @param communityCourseDTO the entity to save.
     * @return the persisted entity.
     */
    CommunityCourseDTO save(CommunityCourseDTO communityCourseDTO);

    /**
     * Updates a communityCourse.
     *
     * @param communityCourseDTO the entity to update.
     * @return the persisted entity.
     */
    CommunityCourseDTO update(CommunityCourseDTO communityCourseDTO);

    /**
     * Partially updates a communityCourse.
     *
     * @param communityCourseDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CommunityCourseDTO> partialUpdate(CommunityCourseDTO communityCourseDTO);

    /**
     * Get all the communityCourses.
     *
     * @return the list of entities.
     */
    List<CommunityCourseDTO> findAll();

    /**
     * Get the "id" communityCourse.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CommunityCourseDTO> findOne(Long id);

    /**
     * Delete the "id" communityCourse.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
