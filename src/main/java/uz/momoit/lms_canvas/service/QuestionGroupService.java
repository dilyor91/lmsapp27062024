package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.QuestionGroupDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.QuestionGroup}.
 */
public interface QuestionGroupService {
    /**
     * Save a questionGroup.
     *
     * @param questionGroupDTO the entity to save.
     * @return the persisted entity.
     */
    QuestionGroupDTO save(QuestionGroupDTO questionGroupDTO);

    /**
     * Updates a questionGroup.
     *
     * @param questionGroupDTO the entity to update.
     * @return the persisted entity.
     */
    QuestionGroupDTO update(QuestionGroupDTO questionGroupDTO);

    /**
     * Partially updates a questionGroup.
     *
     * @param questionGroupDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<QuestionGroupDTO> partialUpdate(QuestionGroupDTO questionGroupDTO);

    /**
     * Get all the questionGroups.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<QuestionGroupDTO> findAll(Pageable pageable);

    /**
     * Get the "id" questionGroup.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuestionGroupDTO> findOne(Long id);

    /**
     * Delete the "id" questionGroup.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
