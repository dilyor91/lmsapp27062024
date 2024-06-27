package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.QuizResultDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.QuizResult}.
 */
public interface QuizResultService {
    /**
     * Save a quizResult.
     *
     * @param quizResultDTO the entity to save.
     * @return the persisted entity.
     */
    QuizResultDTO save(QuizResultDTO quizResultDTO);

    /**
     * Updates a quizResult.
     *
     * @param quizResultDTO the entity to update.
     * @return the persisted entity.
     */
    QuizResultDTO update(QuizResultDTO quizResultDTO);

    /**
     * Partially updates a quizResult.
     *
     * @param quizResultDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<QuizResultDTO> partialUpdate(QuizResultDTO quizResultDTO);

    /**
     * Get all the quizResults.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<QuizResultDTO> findAll(Pageable pageable);

    /**
     * Get the "id" quizResult.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuizResultDTO> findOne(Long id);

    /**
     * Delete the "id" quizResult.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
