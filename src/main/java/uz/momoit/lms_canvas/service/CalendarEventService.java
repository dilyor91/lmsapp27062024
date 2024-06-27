package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.CalendarEventDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.CalendarEvent}.
 */
public interface CalendarEventService {
    /**
     * Save a calendarEvent.
     *
     * @param calendarEventDTO the entity to save.
     * @return the persisted entity.
     */
    CalendarEventDTO save(CalendarEventDTO calendarEventDTO);

    /**
     * Updates a calendarEvent.
     *
     * @param calendarEventDTO the entity to update.
     * @return the persisted entity.
     */
    CalendarEventDTO update(CalendarEventDTO calendarEventDTO);

    /**
     * Partially updates a calendarEvent.
     *
     * @param calendarEventDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CalendarEventDTO> partialUpdate(CalendarEventDTO calendarEventDTO);

    /**
     * Get all the calendarEvents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CalendarEventDTO> findAll(Pageable pageable);

    /**
     * Get the "id" calendarEvent.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CalendarEventDTO> findOne(Long id);

    /**
     * Delete the "id" calendarEvent.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
