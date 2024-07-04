package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.CourseWeekInfoDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.CourseWeekInfo}.
 */
public interface CourseWeekInfoService {
    /**
     * Save a courseWeekInfo.
     *
     * @param courseWeekInfoDTO the entity to save.
     * @return the persisted entity.
     */
    CourseWeekInfoDTO save(CourseWeekInfoDTO courseWeekInfoDTO);

    /**
     * Updates a courseWeekInfo.
     *
     * @param courseWeekInfoDTO the entity to update.
     * @return the persisted entity.
     */
    CourseWeekInfoDTO update(CourseWeekInfoDTO courseWeekInfoDTO);

    /**
     * Partially updates a courseWeekInfo.
     *
     * @param courseWeekInfoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CourseWeekInfoDTO> partialUpdate(CourseWeekInfoDTO courseWeekInfoDTO);

    /**
     * Get all the courseWeekInfos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CourseWeekInfoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" courseWeekInfo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CourseWeekInfoDTO> findOne(Long id);

    /**
     * Delete the "id" courseWeekInfo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
