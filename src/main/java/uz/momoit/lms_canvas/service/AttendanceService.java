package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.AttendanceDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.Attendance}.
 */
public interface AttendanceService {
    /**
     * Save a attendance.
     *
     * @param attendanceDTO the entity to save.
     * @return the persisted entity.
     */
    AttendanceDTO save(AttendanceDTO attendanceDTO);

    /**
     * Updates a attendance.
     *
     * @param attendanceDTO the entity to update.
     * @return the persisted entity.
     */
    AttendanceDTO update(AttendanceDTO attendanceDTO);

    /**
     * Partially updates a attendance.
     *
     * @param attendanceDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AttendanceDTO> partialUpdate(AttendanceDTO attendanceDTO);

    /**
     * Get all the attendances.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AttendanceDTO> findAll(Pageable pageable);

    /**
     * Get the "id" attendance.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AttendanceDTO> findOne(Long id);

    /**
     * Delete the "id" attendance.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
