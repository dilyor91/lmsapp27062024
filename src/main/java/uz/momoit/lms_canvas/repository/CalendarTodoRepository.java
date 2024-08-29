package uz.momoit.lms_canvas.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.CalendarTodo;

/**
 * Spring Data JPA repository for the CalendarTodo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CalendarTodoRepository extends JpaRepository<CalendarTodo, Long> {
    @Query("select calendarTodo from CalendarTodo calendarTodo where calendarTodo.user.login = ?#{authentication.name}")
    List<CalendarTodo> findByUserIsCurrentUser();
}
