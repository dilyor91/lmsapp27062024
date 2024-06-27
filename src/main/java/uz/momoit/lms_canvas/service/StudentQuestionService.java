package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.StudentQuestionDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.StudentQuestion}.
 */
public interface StudentQuestionService {
    /**
     * Save a studentQuestion.
     *
     * @param studentQuestionDTO the entity to save.
     * @return the persisted entity.
     */
    StudentQuestionDTO save(StudentQuestionDTO studentQuestionDTO);

    /**
     * Updates a studentQuestion.
     *
     * @param studentQuestionDTO the entity to update.
     * @return the persisted entity.
     */
    StudentQuestionDTO update(StudentQuestionDTO studentQuestionDTO);

    /**
     * Partially updates a studentQuestion.
     *
     * @param studentQuestionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StudentQuestionDTO> partialUpdate(StudentQuestionDTO studentQuestionDTO);

    /**
     * Get all the studentQuestions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<StudentQuestionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" studentQuestion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudentQuestionDTO> findOne(Long id);

    /**
     * Delete the "id" studentQuestion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
