package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.StudentAnswerQuestionDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.StudentAnswerQuestion}.
 */
public interface StudentAnswerQuestionService {
    /**
     * Save a studentAnswerQuestion.
     *
     * @param studentAnswerQuestionDTO the entity to save.
     * @return the persisted entity.
     */
    StudentAnswerQuestionDTO save(StudentAnswerQuestionDTO studentAnswerQuestionDTO);

    /**
     * Updates a studentAnswerQuestion.
     *
     * @param studentAnswerQuestionDTO the entity to update.
     * @return the persisted entity.
     */
    StudentAnswerQuestionDTO update(StudentAnswerQuestionDTO studentAnswerQuestionDTO);

    /**
     * Partially updates a studentAnswerQuestion.
     *
     * @param studentAnswerQuestionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StudentAnswerQuestionDTO> partialUpdate(StudentAnswerQuestionDTO studentAnswerQuestionDTO);

    /**
     * Get all the studentAnswerQuestions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<StudentAnswerQuestionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" studentAnswerQuestion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudentAnswerQuestionDTO> findOne(Long id);

    /**
     * Delete the "id" studentAnswerQuestion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
