package uz.momoit.lms_canvas.service;

import java.util.List;
import java.util.Optional;
import uz.momoit.lms_canvas.service.dto.StudyTermDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.StudyTerm}.
 */
public interface StudyTermService {
    /**
     * Save a studyTerm.
     *
     * @param studyTermDTO the entity to save.
     * @return the persisted entity.
     */
    StudyTermDTO save(StudyTermDTO studyTermDTO);

    /**
     * Updates a studyTerm.
     *
     * @param studyTermDTO the entity to update.
     * @return the persisted entity.
     */
    StudyTermDTO update(StudyTermDTO studyTermDTO);

    /**
     * Partially updates a studyTerm.
     *
     * @param studyTermDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StudyTermDTO> partialUpdate(StudyTermDTO studyTermDTO);

    /**
     * Get all the studyTerms.
     *
     * @return the list of entities.
     */
    List<StudyTermDTO> findAll();

    /**
     * Get the "id" studyTerm.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudyTermDTO> findOne(Long id);

    /**
     * Delete the "id" studyTerm.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
