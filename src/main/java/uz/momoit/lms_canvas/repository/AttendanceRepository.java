package uz.momoit.lms_canvas.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.Attendance;

/**
 * Spring Data JPA repository for the Attendance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    @Query("select attendance from Attendance attendance where attendance.teacher.login = ?#{authentication.name}")
    List<Attendance> findByTeacherIsCurrentUser();
}
