package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.StudentOptionDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.StudentOption}.
 */
public interface StudentOptionService {
    /**
     * Save a studentOption.
     *
     * @param studentOptionDTO the entity to save.
     * @return the persisted entity.
     */
    StudentOptionDTO save(StudentOptionDTO studentOptionDTO);

    /**
     * Updates a studentOption.
     *
     * @param studentOptionDTO the entity to update.
     * @return the persisted entity.
     */
    StudentOptionDTO update(StudentOptionDTO studentOptionDTO);

    /**
     * Partially updates a studentOption.
     *
     * @param studentOptionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StudentOptionDTO> partialUpdate(StudentOptionDTO studentOptionDTO);

    /**
     * Get all the studentOptions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<StudentOptionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" studentOption.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudentOptionDTO> findOne(Long id);

    /**
     * Delete the "id" studentOption.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
