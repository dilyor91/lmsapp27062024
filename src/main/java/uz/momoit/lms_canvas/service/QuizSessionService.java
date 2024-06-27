package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.QuizSessionDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.QuizSession}.
 */
public interface QuizSessionService {
    /**
     * Save a quizSession.
     *
     * @param quizSessionDTO the entity to save.
     * @return the persisted entity.
     */
    QuizSessionDTO save(QuizSessionDTO quizSessionDTO);

    /**
     * Updates a quizSession.
     *
     * @param quizSessionDTO the entity to update.
     * @return the persisted entity.
     */
    QuizSessionDTO update(QuizSessionDTO quizSessionDTO);

    /**
     * Partially updates a quizSession.
     *
     * @param quizSessionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<QuizSessionDTO> partialUpdate(QuizSessionDTO quizSessionDTO);

    /**
     * Get all the quizSessions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<QuizSessionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" quizSession.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuizSessionDTO> findOne(Long id);

    /**
     * Delete the "id" quizSession.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
