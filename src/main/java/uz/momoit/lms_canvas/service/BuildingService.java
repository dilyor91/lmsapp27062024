package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.BuildingDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.Building}.
 */
public interface BuildingService {
    /**
     * Save a building.
     *
     * @param buildingDTO the entity to save.
     * @return the persisted entity.
     */
    BuildingDTO save(BuildingDTO buildingDTO);

    /**
     * Updates a building.
     *
     * @param buildingDTO the entity to update.
     * @return the persisted entity.
     */
    BuildingDTO update(BuildingDTO buildingDTO);

    /**
     * Partially updates a building.
     *
     * @param buildingDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<BuildingDTO> partialUpdate(BuildingDTO buildingDTO);

    /**
     * Get all the buildings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BuildingDTO> findAll(Pageable pageable);

    /**
     * Get the "id" building.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BuildingDTO> findOne(Long id);

    /**
     * Delete the "id" building.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
