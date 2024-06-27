package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.QuizDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.Quiz}.
 */
public interface QuizService {
    /**
     * Save a quiz.
     *
     * @param quizDTO the entity to save.
     * @return the persisted entity.
     */
    QuizDTO save(QuizDTO quizDTO);

    /**
     * Updates a quiz.
     *
     * @param quizDTO the entity to update.
     * @return the persisted entity.
     */
    QuizDTO update(QuizDTO quizDTO);

    /**
     * Partially updates a quiz.
     *
     * @param quizDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<QuizDTO> partialUpdate(QuizDTO quizDTO);

    /**
     * Get all the quizzes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<QuizDTO> findAll(Pageable pageable);

    /**
     * Get the "id" quiz.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuizDTO> findOne(Long id);

    /**
     * Delete the "id" quiz.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
