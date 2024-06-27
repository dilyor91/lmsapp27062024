package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.LessonDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.Lesson}.
 */
public interface LessonService {
    /**
     * Save a lesson.
     *
     * @param lessonDTO the entity to save.
     * @return the persisted entity.
     */
    LessonDTO save(LessonDTO lessonDTO);

    /**
     * Updates a lesson.
     *
     * @param lessonDTO the entity to update.
     * @return the persisted entity.
     */
    LessonDTO update(LessonDTO lessonDTO);

    /**
     * Partially updates a lesson.
     *
     * @param lessonDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LessonDTO> partialUpdate(LessonDTO lessonDTO);

    /**
     * Get all the lessons.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LessonDTO> findAll(Pageable pageable);

    /**
     * Get the "id" lesson.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LessonDTO> findOne(Long id);

    /**
     * Delete the "id" lesson.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
