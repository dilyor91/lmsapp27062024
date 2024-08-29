package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.CalendarTodoDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.CalendarTodo}.
 */
public interface CalendarTodoService {
    /**
     * Save a calendarTodo.
     *
     * @param calendarTodoDTO the entity to save.
     * @return the persisted entity.
     */
    CalendarTodoDTO save(CalendarTodoDTO calendarTodoDTO);

    /**
     * Updates a calendarTodo.
     *
     * @param calendarTodoDTO the entity to update.
     * @return the persisted entity.
     */
    CalendarTodoDTO update(CalendarTodoDTO calendarTodoDTO);

    /**
     * Partially updates a calendarTodo.
     *
     * @param calendarTodoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CalendarTodoDTO> partialUpdate(CalendarTodoDTO calendarTodoDTO);

    /**
     * Get all the calendarTodos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CalendarTodoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" calendarTodo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CalendarTodoDTO> findOne(Long id);

    /**
     * Delete the "id" calendarTodo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
