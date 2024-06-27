package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.QuizQuestionGroupDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.QuizQuestionGroup}.
 */
public interface QuizQuestionGroupService {
    /**
     * Save a quizQuestionGroup.
     *
     * @param quizQuestionGroupDTO the entity to save.
     * @return the persisted entity.
     */
    QuizQuestionGroupDTO save(QuizQuestionGroupDTO quizQuestionGroupDTO);

    /**
     * Updates a quizQuestionGroup.
     *
     * @param quizQuestionGroupDTO the entity to update.
     * @return the persisted entity.
     */
    QuizQuestionGroupDTO update(QuizQuestionGroupDTO quizQuestionGroupDTO);

    /**
     * Partially updates a quizQuestionGroup.
     *
     * @param quizQuestionGroupDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<QuizQuestionGroupDTO> partialUpdate(QuizQuestionGroupDTO quizQuestionGroupDTO);

    /**
     * Get all the quizQuestionGroups.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<QuizQuestionGroupDTO> findAll(Pageable pageable);

    /**
     * Get the "id" quizQuestionGroup.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuizQuestionGroupDTO> findOne(Long id);

    /**
     * Delete the "id" quizQuestionGroup.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
