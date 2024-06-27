package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.FacultyDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.Faculty}.
 */
public interface FacultyService {
    /**
     * Save a faculty.
     *
     * @param facultyDTO the entity to save.
     * @return the persisted entity.
     */
    FacultyDTO save(FacultyDTO facultyDTO);

    /**
     * Updates a faculty.
     *
     * @param facultyDTO the entity to update.
     * @return the persisted entity.
     */
    FacultyDTO update(FacultyDTO facultyDTO);

    /**
     * Partially updates a faculty.
     *
     * @param facultyDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FacultyDTO> partialUpdate(FacultyDTO facultyDTO);

    /**
     * Get all the faculties.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FacultyDTO> findAll(Pageable pageable);

    /**
     * Get the "id" faculty.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FacultyDTO> findOne(Long id);

    /**
     * Delete the "id" faculty.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
