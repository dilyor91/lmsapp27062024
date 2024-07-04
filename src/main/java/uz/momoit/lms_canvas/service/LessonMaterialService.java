package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.LessonMaterialDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.LessonMaterial}.
 */
public interface LessonMaterialService {
    /**
     * Save a lessonMaterial.
     *
     * @param lessonMaterialDTO the entity to save.
     * @return the persisted entity.
     */
    LessonMaterialDTO save(LessonMaterialDTO lessonMaterialDTO);

    /**
     * Updates a lessonMaterial.
     *
     * @param lessonMaterialDTO the entity to update.
     * @return the persisted entity.
     */
    LessonMaterialDTO update(LessonMaterialDTO lessonMaterialDTO);

    /**
     * Partially updates a lessonMaterial.
     *
     * @param lessonMaterialDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LessonMaterialDTO> partialUpdate(LessonMaterialDTO lessonMaterialDTO);

    /**
     * Get all the lessonMaterials.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LessonMaterialDTO> findAll(Pageable pageable);

    /**
     * Get the "id" lessonMaterial.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LessonMaterialDTO> findOne(Long id);

    /**
     * Delete the "id" lessonMaterial.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
