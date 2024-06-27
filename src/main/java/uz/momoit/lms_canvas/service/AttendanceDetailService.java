package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.AttendanceDetailDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.AttendanceDetail}.
 */
public interface AttendanceDetailService {
    /**
     * Save a attendanceDetail.
     *
     * @param attendanceDetailDTO the entity to save.
     * @return the persisted entity.
     */
    AttendanceDetailDTO save(AttendanceDetailDTO attendanceDetailDTO);

    /**
     * Updates a attendanceDetail.
     *
     * @param attendanceDetailDTO the entity to update.
     * @return the persisted entity.
     */
    AttendanceDetailDTO update(AttendanceDetailDTO attendanceDetailDTO);

    /**
     * Partially updates a attendanceDetail.
     *
     * @param attendanceDetailDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AttendanceDetailDTO> partialUpdate(AttendanceDetailDTO attendanceDetailDTO);

    /**
     * Get all the attendanceDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AttendanceDetailDTO> findAll(Pageable pageable);

    /**
     * Get the "id" attendanceDetail.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AttendanceDetailDTO> findOne(Long id);

    /**
     * Delete the "id" attendanceDetail.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
