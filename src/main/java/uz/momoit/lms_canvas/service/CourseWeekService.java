package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.CourseWeekDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.CourseWeek}.
 */
public interface CourseWeekService {
    /**
     * Save a courseWeek.
     *
     * @param courseWeekDTO the entity to save.
     * @return the persisted entity.
     */
    CourseWeekDTO save(CourseWeekDTO courseWeekDTO);

    /**
     * Updates a courseWeek.
     *
     * @param courseWeekDTO the entity to update.
     * @return the persisted entity.
     */
    CourseWeekDTO update(CourseWeekDTO courseWeekDTO);

    /**
     * Partially updates a courseWeek.
     *
     * @param courseWeekDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CourseWeekDTO> partialUpdate(CourseWeekDTO courseWeekDTO);

    /**
     * Get all the courseWeeks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CourseWeekDTO> findAll(Pageable pageable);

    /**
     * Get the "id" courseWeek.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CourseWeekDTO> findOne(Long id);

    /**
     * Delete the "id" courseWeek.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
