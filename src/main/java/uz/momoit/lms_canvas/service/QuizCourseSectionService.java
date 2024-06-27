package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.QuizCourseSectionDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.QuizCourseSection}.
 */
public interface QuizCourseSectionService {
    /**
     * Save a quizCourseSection.
     *
     * @param quizCourseSectionDTO the entity to save.
     * @return the persisted entity.
     */
    QuizCourseSectionDTO save(QuizCourseSectionDTO quizCourseSectionDTO);

    /**
     * Updates a quizCourseSection.
     *
     * @param quizCourseSectionDTO the entity to update.
     * @return the persisted entity.
     */
    QuizCourseSectionDTO update(QuizCourseSectionDTO quizCourseSectionDTO);

    /**
     * Partially updates a quizCourseSection.
     *
     * @param quizCourseSectionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<QuizCourseSectionDTO> partialUpdate(QuizCourseSectionDTO quizCourseSectionDTO);

    /**
     * Get all the quizCourseSections.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<QuizCourseSectionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" quizCourseSection.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuizCourseSectionDTO> findOne(Long id);

    /**
     * Delete the "id" quizCourseSection.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
