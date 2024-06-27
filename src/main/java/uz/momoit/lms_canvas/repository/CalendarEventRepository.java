package uz.momoit.lms_canvas.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.CalendarEvent;

/**
 * Spring Data JPA repository for the CalendarEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
    @Query("select calendarEvent from CalendarEvent calendarEvent where calendarEvent.user.login = ?#{authentication.name}")
    List<CalendarEvent> findByUserIsCurrentUser();
}
