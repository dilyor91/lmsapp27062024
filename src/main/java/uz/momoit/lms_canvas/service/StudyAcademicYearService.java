package uz.momoit.lms_canvas.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.StudyAcademicYearDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.StudyAcademicYear}.
 */
public interface StudyAcademicYearService {
    /**
     * Save a studyAcademicYear.
     *
     * @param studyAcademicYearDTO the entity to save.
     * @return the persisted entity.
     */
    StudyAcademicYearDTO save(StudyAcademicYearDTO studyAcademicYearDTO);

    /**
     * Updates a studyAcademicYear.
     *
     * @param studyAcademicYearDTO the entity to update.
     * @return the persisted entity.
     */
    StudyAcademicYearDTO update(StudyAcademicYearDTO studyAcademicYearDTO);

    /**
     * Partially updates a studyAcademicYear.
     *
     * @param studyAcademicYearDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StudyAcademicYearDTO> partialUpdate(StudyAcademicYearDTO studyAcademicYearDTO);

    /**
     * Get all the studyAcademicYears.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<StudyAcademicYearDTO> findAll(Pageable pageable);

    /**
     * Get all the StudyAcademicYearDTO where Student is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<StudyAcademicYearDTO> findAllWhereStudentIsNull();

    /**
     * Get the "id" studyAcademicYear.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudyAcademicYearDTO> findOne(Long id);

    /**
     * Delete the "id" studyAcademicYear.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
