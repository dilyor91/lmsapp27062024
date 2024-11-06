package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.ExamResultDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.ExamResult}.
 */
public interface ExamResultService {
    /**
     * Save a examResult.
     *
     * @param examResultDTO the entity to save.
     * @return the persisted entity.
     */
    ExamResultDTO save(ExamResultDTO examResultDTO);

    /**
     * Updates a examResult.
     *
     * @param examResultDTO the entity to update.
     * @return the persisted entity.
     */
    ExamResultDTO update(ExamResultDTO examResultDTO);

    /**
     * Partially updates a examResult.
     *
     * @param examResultDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ExamResultDTO> partialUpdate(ExamResultDTO examResultDTO);

    /**
     * Get all the examResults.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ExamResultDTO> findAll(Pageable pageable);

    /**
     * Get the "id" examResult.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ExamResultDTO> findOne(Long id);

    /**
     * Delete the "id" examResult.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
